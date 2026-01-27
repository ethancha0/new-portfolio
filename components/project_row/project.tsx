import React from 'react'
import ProjectCard from '@/components/project_row/project-card'
import ProjectInfo from '@/components/project_row/project-info'
import ZotMeetPic from '@/public/ZotMeetSS.png'


const project = () => {
  return (
    <div>
      
     <div className="flex justify-center gap-72 mb-12">
          <div>
            <ProjectInfo/>
          </div>


          <div>
            <ProjectCard image={ZotMeetPic} />
          </div>

        </div>


    </div>
  )
}

export default project
