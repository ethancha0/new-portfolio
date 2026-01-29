import React from 'react'

const ProjectInfo = ({title, description}: {title: string; description: string}) => {
  return (
    <div className="mt-30">
      <p>{title}</p>
      <p>{description}</p>
    </div>
  )
}

export default ProjectInfo
