import React from 'react'

const ProjectInfo = ({title, description}: {title: string; description:string}) => {
  return (
    <div className="mt-30">
      <p className="text-xl font-serif">{title}</p>
      <p className="">{description}</p>
    </div>
  )
}

export default ProjectInfo
