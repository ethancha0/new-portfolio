'use client';

import React from 'react';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect'
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Button } from './ui/button';
import ChevronButton from './ui/chevron-button';

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




    <ChevronButton redirect={"projectScroll"}/>


   
    

    </div>
  </div>
  );
}

export default header