'use client';

import React from 'react';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect'
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "motion/react"
import {ChevronDown} from "lucide-react"
import { Button } from './ui/button';

const header = () => {

  const scrollToId = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToProjects = () => scrollToId("projects");
  const scrollToAbout = () => scrollToId("about");



  return (
    <div className="p-45 mt-20 border-b-4 min-h-screen space-y-4">

      <TextGenerateEffect
        words="Ethan Chao"
        className="text-7xl"
      />


      <TextGenerateEffect 
        words = "Full Stack Developer"
        className="text-gray-700 text-2xl"
         />
      
      <div>

      </div>

      <div className="mt-2">
        <TextGenerateEffect
          words= "Currently Studying Software Engineering at UC Irvine"
          className="font-normal"
          />
      </div>




      <div className="flex pt-4 gap-2 mt-4 ">
       <a href="http://github.com/ethancha0"
          target="_blank" 
          rel="noopener noreferrer">
          <FaGithub size={30}/>
       </a>

       <a href="https://www.linkedin.com/in/ethanchaoo/"
          target="_blank"
          rel="noopener noreferrer">
        <FaLinkedin size={30}/> 
      </a>
      </div>

    <div className="mt-6 gap-4 flex">
      <Button size="lg" onClick={scrollToProjects}>
        View Projects
      </Button>
  
      <Button variant="secondary" size="lg" className="border border-black" onClick={scrollToAbout}>
        About me
      </Button>



      <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1, duration: 1 }}
  className="absolute bottom-8 left-1/2 -translate-x-1/2"
>
  <button
    onClick={scrollToProjects}
    className="animate-bounce text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
  >
    <ChevronDown className="w-8 h-8" />
  </button>
</motion.div>

   
    

    </div>
  </div>
  );
}

export default header