import React from 'react'
import { TextGenerateEffect } from '@/components/ui/text-generate-effect'
import { FaGithub, FaLinkedin } from "react-icons/fa";

const header = () => {
  return (
    <div className="p-12 border-b-4">

      <TextGenerateEffect
        words="Ethan Chao"
      />


      <TextGenerateEffect 
        words = "I'm a Full Stack Developer"
         />
      
      <div>

      </div>

      <div className="">
        <TextGenerateEffect
          words= "Currently studying Software Engineering at UC Irvine"
          />
      </div>

      <div className="flex pt-4 gap-2 ">
       <a href="http://github.com/ethancha0"
          target="_blank" 
          rel="noopener noreferrer">
          <FaGithub size={25}/>
       </a>
       
       <a href="https://www.linkedin.com/in/ethanchaoo/"
          target="_blank"
          rel="noopener noreferrer">
        <FaLinkedin size={25}/> 
      </a>
      </div>
      

    </div>
  )
}

export default header