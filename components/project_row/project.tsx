import React from 'react'
import ProjectCard from '@/components/project_row/project-card'
import ProjectInfo from '@/components/project_row/project-info'
import ZotMeetPic from '@/public/ZotMeetSS.png'
import AnimatedProject from "@/components/expandable-card"
import ChevronButton from '../ui/chevron-button'


const project = () => {
  return (
    <div>
      
      <div className="flex justify-center gap-72 mb-12">
        {/*

      
              <div className="flex flex-col gap-38">
                <ProjectInfo
                  title="ZotMeet"
                  description="Meeting & Study Room Scheduler for UCI Students"
                /> 
                <ProjectInfo
                  title="Signalist"
                  description="Stock Tracker & AI-Powered Market Analysis"
                />
                <ProjectInfo
                  title="Nom"
                  description="Food Recommendation System"
                />
               
               
              </div>
  */} 
            <div>
              <AnimatedProject/>
            </div>

            <ChevronButton redirect={"projectScroll"}/>
           

      </div>


    </div>
  )
}

export default project
