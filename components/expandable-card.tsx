"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import ZotMeetPic from "../public/project-imgs/ZotMeetSS.png"
import stockPic from "../public/project-imgs/stocktrackerSS.png"
import PixelMonPic from "../public/project-imgs/PixelmonSS.png"
import NomPic from "../public/project-imgs/NomPic.png"
import Image from "next/image"
import LogoLoop from "./animations/logo-loop";
import { ZotmeetLogos, ZotmeetSubLogos, SignalistLogos, SignalistSubLogos, NomLogos, NomSubLogos } from "@/lib/constants";

export default function ExpandableCardDemo() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100] p-4 sm:p-6 lg:p-10">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-[95vw] max-w-[1100px] h-[92vh] sm:h-[90vh] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`} className="relative w-full aspect-video bg-black sm:rounded-tr-lg sm:rounded-tl-lg overflow-hidden">
                {active.videosrc ? (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-contain"
                    src={active.videosrc}
                  >
                    <source src={active.videosrc} type="video/mp4" />
                  </video>
                ) : (
                  <Image
                    fill
                    src={active.src}
                    alt={active.title}
                    sizes="(max-width: 768px) 95vw, 1100px"
                    quality={100}
                    className="object-cover object-top"
                  />
                )}
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-medium text-neutral-700 dark:text-neutral-200 text-base"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 text-base"
                    >
                      {active.description}

                    </motion.p>
                  </div>

                  <motion.a
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    href={active.ctaLink}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-[#362a55] text-white"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="min-w-md mx-auto w-full items-start gap-4">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={card.title}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col  hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col  w-full">
              
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <div className="relative w-full aspect-video overflow-hidden border border-slate-200 border-1 rounded-md shadow shadow-2xl">
                  <Image
                    fill
                    src={card.src}
                    alt={card.title}
                    sizes="(max-width: 768px) 100vw, 640px"
                    quality={100}
                    className=" w-full  rounded-lg object-cover object-top"
                  />
                </div>
              </motion.div>
              <div className="flex justify-center items-center flex-col">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left text-base"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center md:text-left text-base"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    description: "In collaboration with ICS Student Council",
    title: "ZotMeet",
    src: ZotMeetPic,
    videosrc: "/project-videos/ZotMeetVideo.mp4",
    ctaText: "Visit",
    ctaLink: "https://zotmeet.com/",
    content: () => {
      return (
        <div className="flex flex-col gap-4">
        <p className="">
        A meeting and study room scheduler for UCI students. 
        </p>

        <LogoLoop 
        logos={ZotmeetLogos}
        gap={10}
        speed={15}
        logoHeight={20}
        scaleOnHover={false}
        showLabels={true}
        labelPlacement="bottom"
        scrollMode="bounce"
        width="100%"

         />
         <LogoLoop 
         logos={ZotmeetSubLogos}
         gap={10}
         speed={15}
         logoHeight={20}
         scaleOnHover={true}
         showLabels={true}
         labelPlacement="bottom"
         scrollMode="bounce"
         width="100%"
         />
         </div>
      );
    },
  },
   {
    description: "Beating the S&P 500",
    title: "Signalist",
    src: stockPic,
    ctaText: "View Github",
    ctaLink: "https://github.com/ethancha0/signalist-stock-tracker",
    content: () => {
      return (
        <div className="flex flex-col gap-4">
        <p>
          A project aimed to consistently beat the S&P 500
        </p>

        <LogoLoop 
        logos={SignalistLogos}
        gap={10}
        speed={15}
        logoHeight={20}
        scaleOnHover={true}
        showLabels={true}
        labelPlacement="bottom"
        scrollMode="bounce"
        width="100%"
        />
        <LogoLoop 
        logos={SignalistSubLogos}
        gap={10}
        speed={15}
        logoHeight={20}
        scaleOnHover={true}
        showLabels={true}
        labelPlacement="bottom"
        scrollMode="bounce"
        width="100%"
        />
        </div>
      );
    },
  },
   {
    description: "For when you're hangry",
    title: "Food Recommendation System",
    src: NomPic,
    ctaText: "Visit",
    ctaLink: "https://nom-food-recommendation.vercel.app/",
    content: () => {
      return (
        <div className="flex flex-col gap-4">
        <p>
          A fun project that reccommends foods and recipes to cook based on 
          your cravings
        </p>
        <LogoLoop 
        logos={NomLogos}
        gap={10}
        speed={15}
        logoHeight={20}
        scaleOnHover={true}
        showLabels={true}
        labelPlacement="bottom"
        scrollMode="bounce"
        bounceFitMode="edges"
        width="100%"
        />
        <LogoLoop 
        logos={NomSubLogos}
        gap={10}
        speed={15}
        logoHeight={20}
        scaleOnHover={true}
        showLabels={true}
        labelPlacement="bottom"
        scrollMode="bounce"
        bounceFitMode="edges"
        width="100%"
        />
        </div>
      );
    },
  },

 
];
