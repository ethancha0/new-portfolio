import React from 'react'
import ProjectCard from '@/components/project_row/project-card'
import ProjectInfo from '@/components/project_row/project-info'
import ZotMeetPic from '@/public/ZotMeetSS.png'
import AnimatedProject from "@/components/expandable-card"
import ChevronButton from '../ui/chevron-button'
import { SparkleIcon, Sparkles } from 'lucide-react'



const project = () => {
  return (
    <div className="w-full">
      
      <div className="relative w-full mb-12">
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
        <div className="flex justify-center">
          <div className="flex flex-col">
            <h1 className="text-7xl p-35 pb-10 font-bold text-gray-800">Projects</h1>
            <div className="flex justify-center items-center gap-2">
               <Sparkles className="h-5 w-5"/> 
              <p className="text-gray-600 text-xl">Just a few things I've been working on </p>
            </div>
           
            
          </div>
     
          
          <AnimatedProject/>
        </div>
        

        <ChevronButton
          redirect={"aboutScroll"}
          position="inline"
          wrapperClassName="py-16"
          buttonClassName="p-6 rounded-full"
        />

       
           

      </div>


    </div>
  )
}

export default project
