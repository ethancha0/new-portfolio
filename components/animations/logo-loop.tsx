import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export type LogoItem =
  | {
      node: React.ReactNode;
      href?: string;
      title?: string;
      ariaLabel?: string;
    }
  | {
      src: string;
      alt?: string;
      href?: string;
      title?: string;
      srcSet?: string;
      sizes?: string;
      width?: number;
      height?: number;
    };

export interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  scrollMode?: 'loop' | 'bounce';
  bounceAnimateMaxItems?: number;
  bounceOverflowThresholdPx?: number;
  bounceMinWigglePx?: number;
  bounceFitMode?: 'wiggle' | 'edges';
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  showLabels?: boolean;
  labelPlacement?: 'right' | 'bottom';
  renderItem?: (item: LogoItem, key: React.Key) => React.ReactNode;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

const ANIMATION_CONFIG = {
  SMOOTH_TAU: 0.25,
  MIN_COPIES: 2,
  COPY_HEADROOM: 2
} as const;

const toCssLength = (value?: number | string): string | undefined =>
  typeof value === 'number' ? `${value}px` : (value ?? undefined);

const cx = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(' ');

const useResizeObserver = (
  callback: () => void,
  elements: Array<React.RefObject<Element | null>>,
  dependencies: React.DependencyList
) => {
  useEffect(() => {
    if (!window.ResizeObserver) {
      const handleResize = () => callback();
      window.addEventListener('resize', handleResize);
      callback();
      return () => window.removeEventListener('resize', handleResize);
    }

    const observers = elements.map(ref => {
      if (!ref.current) return null;
      const observer = new ResizeObserver(callback);
      observer.observe(ref.current);
      return observer;
    });

    callback();

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, dependencies);
};

const useImageLoader = (
  seqRef: React.RefObject<HTMLUListElement | null>,
  onLoad: () => void,
  dependencies: React.DependencyList
) => {
  useEffect(() => {
    const images = seqRef.current?.querySelectorAll('img') ?? [];

    if (images.length === 0) {
      onLoad();
      return;
    }

    let remainingImages = images.length;
    const handleImageLoad = () => {
      remainingImages -= 1;
      if (remainingImages === 0) {
        onLoad();
      }
    };

    images.forEach(img => {
      const htmlImg = img as HTMLImageElement;
      if (htmlImg.complete) {
        handleImageLoad();
      } else {
        htmlImg.addEventListener('load', handleImageLoad, { once: true });
        htmlImg.addEventListener('error', handleImageLoad, { once: true });
      }
    });

    return () => {
      images.forEach(img => {
        img.removeEventListener('load', handleImageLoad);
        img.removeEventListener('error', handleImageLoad);
      });
    };
  }, dependencies);
};

const useAnimationLoop = (
  trackRef: React.RefObject<HTMLDivElement | null>,
  targetVelocity: number,
  seqWidth: number,
  seqHeight: number,
  containerWidth: number,
  containerHeight: number,
  isHovered: boolean,
  hoverSpeed: number | undefined,
  isVertical: boolean,
  scrollMode: 'loop' | 'bounce',
  itemCount: number,
  bounceAnimateMaxItems: number,
  bounceOverflowThresholdPx: number,
  bounceMinWigglePx: number,
  bounceFitMode: 'wiggle' | 'edges'
) => {
  const rafRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);
  const bounceDirectionRef = useRef(1);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const seqSize = isVertical ? seqHeight : seqWidth;
    const viewportSize = isVertical ? containerHeight : containerWidth;

    const shouldAnimate =
      scrollMode !== 'bounce'
        ? true
        : itemCount <= bounceAnimateMaxItems ||
          (seqSize > 0 && viewportSize > 0 && seqSize - viewportSize > bounceOverflowThresholdPx);

    const bounceBounds = (() => {
      if (scrollMode !== 'bounce') return null;
      if (seqSize <= 0 || viewportSize <= 0) return { min: 0, max: 0 };

      // If the sequence is longer than the viewport, bounce between edges.
      if (seqSize > viewportSize) return { min: 0, max: seqSize - viewportSize };

      const slack = viewportSize - seqSize;

      // If everything fits, either bounce between edges or just wiggle.
      if (bounceFitMode === 'edges') {
        // With translateX(-offset): min=-slack moves content to the right edge, max=0 is left edge.
        return { min: -slack, max: 0 };
      }

      // Wiggle a bit so it feels alive (keeps travel small).
      const travel = Math.max(bounceMinWigglePx, Math.min(48, slack / 2));
      return { min: -travel, max: travel };
    })();

    if (seqSize > 0) {
      if (scrollMode === 'bounce') {
        const minOffset = bounceBounds?.min ?? 0;
        const maxOffset = bounceBounds?.max ?? 0;
        offsetRef.current = Math.min(Math.max(offsetRef.current, minOffset), maxOffset);
        bounceDirectionRef.current = targetVelocity >= 0 ? 1 : -1;
      } else {
        offsetRef.current = ((offsetRef.current % seqSize) + seqSize) % seqSize;
      }
      const transformValue = isVertical
        ? `translate3d(0, ${-offsetRef.current}px, 0)`
        : `translate3d(${-offsetRef.current}px, 0, 0)`;
      track.style.transform = transformValue;
    }

    if (prefersReduced || !shouldAnimate) {
      track.style.transform = isVertical ? 'translate3d(0, 0, 0)' : 'translate3d(0, 0, 0)';
      return () => {
        lastTimestampRef.current = null;
      };
    }

    const animate = (timestamp: number) => {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }

      const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      const target = isHovered && hoverSpeed !== undefined ? hoverSpeed : targetVelocity;

      const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * easingFactor;

      if (seqSize > 0) {
        if (scrollMode === 'bounce') {
          const minOffset = bounceBounds?.min ?? 0;
          const maxOffset = bounceBounds?.max ?? 0;

          if (maxOffset - minOffset <= 0) {
            offsetRef.current = minOffset;
          } else {
            const speedMagnitude = Math.abs(velocityRef.current);
            let nextOffset = offsetRef.current + bounceDirectionRef.current * speedMagnitude * deltaTime;

            if (nextOffset < minOffset) {
              nextOffset = minOffset + (minOffset - nextOffset);
              bounceDirectionRef.current = 1;
            } else if (nextOffset > maxOffset) {
              nextOffset = maxOffset - (nextOffset - maxOffset);
              bounceDirectionRef.current = -1;
            }

            offsetRef.current = Math.min(Math.max(nextOffset, minOffset), maxOffset);
          }
        } else {
          let nextOffset = offsetRef.current + velocityRef.current * deltaTime;
          nextOffset = ((nextOffset % seqSize) + seqSize) % seqSize;
          offsetRef.current = nextOffset;
        }

        const transformValue = isVertical
          ? `translate3d(0, ${-offsetRef.current}px, 0)`
          : `translate3d(${-offsetRef.current}px, 0, 0)`;
        track.style.transform = transformValue;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lastTimestampRef.current = null;
    };
  }, [
    targetVelocity,
    seqWidth,
    seqHeight,
    containerWidth,
    containerHeight,
    isHovered,
    hoverSpeed,
    isVertical,
    scrollMode,
    itemCount,
    bounceAnimateMaxItems,
    bounceOverflowThresholdPx,
    bounceMinWigglePx,
    bounceFitMode
  ]);
};

export const LogoLoop = React.memo<LogoLoopProps>(
  ({
    logos,
    speed = 120,
    direction = 'left',
    scrollMode = 'loop',
    bounceAnimateMaxItems = 2,
    bounceOverflowThresholdPx = 12,
    bounceMinWigglePx = 0,
    bounceFitMode = 'wiggle',
    width = '100%',
    logoHeight = 28,
    gap = 32,
    pauseOnHover,
    hoverSpeed,
    fadeOut = false,
    fadeOutColor,
    scaleOnHover = false,
    showLabels = false,
    labelPlacement = 'right',
    renderItem,
    ariaLabel = 'Partner logos',
    className,
    style
  }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const seqRef = useRef<HTMLUListElement>(null);

    const [seqWidth, setSeqWidth] = useState<number>(0);
    const [seqHeight, setSeqHeight] = useState<number>(0);
    const [copyCount, setCopyCount] = useState<number>(ANIMATION_CONFIG.MIN_COPIES);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [containerWidth, setContainerWidth] = useState<number>(0);
    const [containerHeight, setContainerHeight] = useState<number>(0);

    const effectiveHoverSpeed = useMemo(() => {
      if (hoverSpeed !== undefined) return hoverSpeed;
      if (pauseOnHover === true) return 0;
      if (pauseOnHover === false) return undefined;
      return 0;
    }, [hoverSpeed, pauseOnHover]);

    const isVertical = direction === 'up' || direction === 'down';

    const targetVelocity = useMemo(() => {
      const magnitude = Math.abs(speed);
      let directionMultiplier: number;
      if (isVertical) {
        directionMultiplier = direction === 'up' ? 1 : -1;
      } else {
        directionMultiplier = direction === 'left' ? 1 : -1;
      }
      const speedMultiplier = speed < 0 ? -1 : 1;
      return magnitude * directionMultiplier * speedMultiplier;
    }, [speed, direction, isVertical]);

    const updateDimensions = useCallback(() => {
      const nextContainerWidth = containerRef.current?.clientWidth ?? 0;
      const sequenceRect = seqRef.current?.getBoundingClientRect?.();
      const sequenceWidth = sequenceRect?.width ?? 0;
      const sequenceHeight = sequenceRect?.height ?? 0;

      setContainerWidth(Math.ceil(nextContainerWidth));

      if (isVertical) {
        const parentHeight = containerRef.current?.parentElement?.clientHeight ?? 0;
        if (containerRef.current && parentHeight > 0) {
          const targetHeight = Math.ceil(parentHeight);
          if (containerRef.current.style.height !== `${targetHeight}px`)
            containerRef.current.style.height = `${targetHeight}px`;
        }
        const viewport = containerRef.current?.clientHeight ?? parentHeight ?? 0;
        setContainerHeight(Math.ceil(viewport));
        if (sequenceHeight > 0) {
          setSeqHeight(Math.ceil(sequenceHeight));
          if (scrollMode === 'bounce') {
            setCopyCount(1);
          } else {
            const copiesNeeded = Math.ceil(viewport / sequenceHeight) + ANIMATION_CONFIG.COPY_HEADROOM;
            setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
          }
        }
      } else if (sequenceWidth > 0) {
        setSeqWidth(Math.ceil(sequenceWidth));
        if (scrollMode === 'bounce') {
          setCopyCount(1);
        } else {
          const copiesNeeded = Math.ceil(nextContainerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM;
          setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
        }
      }
    }, [isVertical, scrollMode]);

    useResizeObserver(updateDimensions, [containerRef, seqRef], [logos, gap, logoHeight, isVertical, scrollMode]);

    useImageLoader(seqRef, updateDimensions, [logos, gap, logoHeight, isVertical, scrollMode]);

    useAnimationLoop(
      trackRef,
      targetVelocity,
      seqWidth,
      seqHeight,
      containerWidth,
      containerHeight,
      isHovered,
      effectiveHoverSpeed,
      isVertical,
      scrollMode,
      logos.length,
      bounceAnimateMaxItems,
      bounceOverflowThresholdPx,
      bounceMinWigglePx,
      bounceFitMode
    );

    const cssVariables = useMemo(
      () =>
        ({
          '--logoloop-gap': `${gap}px`,
          '--logoloop-logoHeight': `${logoHeight}px`,
          ...(fadeOutColor && { '--logoloop-fadeColor': fadeOutColor })
        }) as React.CSSProperties,
      [gap, logoHeight, fadeOutColor]
    );

    const rootClasses = useMemo(
      () =>
        cx(
          'relative group',
          isVertical ? 'overflow-hidden h-full inline-block' : 'overflow-x-hidden',
          '[--logoloop-gap:32px]',
          '[--logoloop-logoHeight:28px]',
          '[--logoloop-fadeColorAuto:#ffffff]',
          'dark:[--logoloop-fadeColorAuto:#0b0b0b]',
          scaleOnHover && 'py-[calc(var(--logoloop-logoHeight)*0.1)]',
          className
        ),
      [isVertical, scaleOnHover, className]
    );

    const handleMouseEnter = useCallback(() => {
      if (effectiveHoverSpeed !== undefined) setIsHovered(true);
    }, [effectiveHoverSpeed]);
    const handleMouseLeave = useCallback(() => {
      if (effectiveHoverSpeed !== undefined) setIsHovered(false);
    }, [effectiveHoverSpeed]);

    const renderLogoItem = useCallback(
      (item: LogoItem, key: React.Key) => {
        if (renderItem) {
          return (
            <li
              className={cx(
                'flex-none text-[length:var(--logoloop-logoHeight)] leading-[1]',
                isVertical ? 'mb-[var(--logoloop-gap)]' : 'mr-[var(--logoloop-gap)]',
                scaleOnHover && 'overflow-visible group/item'
              )}
              key={key}
              role="listitem"
            >
              {renderItem(item, key)}
            </li>
          );
        }

        const isNodeItem = 'node' in item;

        const content = isNodeItem ? (
          <span
            className={cx(
              'inline-flex items-center',
              'motion-reduce:transition-none',
              scaleOnHover &&
                'transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-120'
            )}
            aria-hidden={!!(item as any).href && !(item as any).ariaLabel}
          >
            {(item as any).node}
          </span>
        ) : (
          <img
            className={cx(
              'h-[var(--logoloop-logoHeight)] w-auto block object-contain',
              '[-webkit-user-drag:none] pointer-events-none',
              '[image-rendering:-webkit-optimize-contrast]',
              'motion-reduce:transition-none',
              scaleOnHover &&
                'transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-120'
            )}
            src={(item as any).src}
            srcSet={(item as any).srcSet}
            sizes={(item as any).sizes}
            width={(item as any).width}
            height={(item as any).height}
            alt={(item as any).alt ?? ''}
            title={(item as any).title}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        );

        const itemAriaLabel = isNodeItem
          ? ((item as any).ariaLabel ?? (item as any).title)
          : ((item as any).alt ?? (item as any).title);

        const label =
          ((item as any).title as string | undefined) ??
          ((item as any).alt as string | undefined) ??
          ((item as any).ariaLabel as string | undefined);

        const framedContentLayoutClasses = cx(
          'inline-flex',
          labelPlacement === 'bottom' ? 'flex-col items-center' : 'flex-row items-center'
        );

        const labelClasses = cx(
          'font-medium leading-none text-black/70 dark:text-white/70',
          labelPlacement === 'bottom'
            ? 'mt-1 text-[10px] text-center max-w-[10rem] truncate'
            : 'ml-2 text-xs whitespace-nowrap'
        );

        const framedContent = (
          <span className={framedContentLayoutClasses}>
            {content}
            {showLabels && label ? (
              <span className={labelClasses}>{label}</span>
            ) : null}
          </span>
        );

        const inner = (item as any).href ? (
          <a
            className={cx(
              'inline-flex items-center no-underline',
              'rounded-lg border border-black/25 dark:border-white/25',
              'bg-white/60 dark:bg-white/5',
              'px-3 py-2',
              'transition-opacity duration-200 ease-linear',
              'hover:opacity-80',
              'focus-visible:outline focus-visible:outline-current focus-visible:outline-offset-2'
            )}
            href={(item as any).href}
            aria-label={itemAriaLabel || 'logo link'}
            target="_blank"
            rel="noreferrer noopener"
          >
            {framedContent}
          </a>
        ) : (
          <span
            className={cx(
              'inline-flex items-center justify-center',
              'border-black/25 dark:border-white/25',
              'rounded-lg border',
              'bg-white/60 dark:bg-white/5',
              'px-3 py-2'
            )}
          >
            {framedContent}
          </span>
        );

        return (
          <li
            className={cx(
              'flex-none text-[length:var(--logoloop-logoHeight)] leading-[1]',
              isVertical ? 'mb-[var(--logoloop-gap)]' : 'mr-[var(--logoloop-gap)]',
              scaleOnHover && 'overflow-visible group/item'
            )}
            key={key}
            role="listitem"
          >
            {inner}
          </li>
        );
      },
      [isVertical, scaleOnHover, renderItem, showLabels, labelPlacement]
    );

    const logoLists = useMemo(
      () =>
        Array.from({ length: copyCount }, (_, copyIndex) => (
          <ul
            className={cx('flex items-center', isVertical && 'flex-col')}
            key={`copy-${copyIndex}`}
            role="list"
            aria-hidden={copyIndex > 0}
            ref={copyIndex === 0 ? seqRef : undefined}
          >
            {logos.map((item, itemIndex) => renderLogoItem(item, `${copyIndex}-${itemIndex}`))}
          </ul>
        )),
      [copyCount, logos, renderLogoItem, isVertical]
    );

    const containerStyle = useMemo(
      (): React.CSSProperties => ({
        width: isVertical
          ? toCssLength(width) === '100%'
            ? undefined
            : toCssLength(width)
          : (toCssLength(width) ?? '100%'),
        ...cssVariables,
        ...style
      }),
      [width, cssVariables, style, isVertical]
    );

    const shouldCenterTrack = useMemo(() => {
      if (scrollMode !== 'bounce') return false;
      if (copyCount !== 1) return false;
      const viewport = isVertical ? containerHeight : containerWidth;
      const seqSize = isVertical ? seqHeight : seqWidth;
      if (!(viewport > 0 && seqSize > 0)) return false;

      const overflow = seqSize - viewport;
      const shouldAnimateBounce =
        logos.length <= bounceAnimateMaxItems || overflow > bounceOverflowThresholdPx;

      // Center whenever we are effectively not animating and the content fits (or "almost fits").
      return !shouldAnimateBounce && overflow <= bounceOverflowThresholdPx;
    }, [
      scrollMode,
      copyCount,
      isVertical,
      containerHeight,
      containerWidth,
      seqHeight,
      seqWidth,
      logos.length,
      bounceAnimateMaxItems,
      bounceOverflowThresholdPx
    ]);

    return (
      <div ref={containerRef} className={rootClasses} style={containerStyle} role="region" aria-label={ariaLabel}>
        {fadeOut && (
          <>
            {isVertical ? (
              <>
                <div
                  aria-hidden
                  className={cx(
                    'pointer-events-none absolute inset-x-0 top-0 z-10',
                    'h-[clamp(24px,8%,120px)]',
                    'bg-[linear-gradient(to_bottom,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]'
                  )}
                />
                <div
                  aria-hidden
                  className={cx(
                    'pointer-events-none absolute inset-x-0 bottom-0 z-10',
                    'h-[clamp(24px,8%,120px)]',
                    'bg-[linear-gradient(to_top,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]'
                  )}
                />
              </>
            ) : (
              <>
                <div
                  aria-hidden
                  className={cx(
                    'pointer-events-none absolute inset-y-0 left-0 z-10',
                    'w-[clamp(24px,8%,120px)]',
                    'bg-[linear-gradient(to_right,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]'
                  )}
                />
                <div
                  aria-hidden
                  className={cx(
                    'pointer-events-none absolute inset-y-0 right-0 z-10',
                    'w-[clamp(24px,8%,120px)]',
                    'bg-[linear-gradient(to_left,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]'
                  )}
                />
              </>
            )}
          </>
        )}

        <div
          className={cx(
            'flex will-change-transform select-none relative z-0',
            'motion-reduce:transform-none',
            isVertical ? 'flex-col h-max w-full' : 'flex-row',
            shouldCenterTrack ? 'w-full justify-center' : 'w-max'
          )}
          ref={trackRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {logoLists}
        </div>
      </div>
    );
  }
);

LogoLoop.displayName = 'LogoLoop';

export default LogoLoop;
