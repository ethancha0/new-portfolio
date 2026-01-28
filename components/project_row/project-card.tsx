import React from 'react'
import Image, { type StaticImageData } from 'next/image'

type ProjectCardProps = {
  image: StaticImageData | string
  alt?: string
}

const ProjectCard = ({ image, alt = 'Project screenshot' }: ProjectCardProps) => {
  return (
    <div className="max-w-xl h-72 shrink-0 w-80 border rounded-2xl shadow-xl shadow-xl/30 border-gray-500 bg-yellow-500 p-2">
      <div className="relative w-full h-full min-h-45 rounded-lg overflow-hidden">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover"
        />
      </div>
    </div>
  )
}

export default ProjectCard
