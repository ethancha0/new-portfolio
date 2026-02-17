'use client';

import React from 'react'
import { TextGenerateEffect } from '@/components/ui/text-generate-effect'
import { FaGithub, FaLinkedin } from "react-icons/fa";
import LogoLoop from './animations/logo-loop';
import { HeaderLogos } from '@/lib/constants';

const header = () => {
  return (
    <div className="p-12 border-b-4">

      <TextGenerateEffect
        words="Ethan Chao"
      />


      <TextGenerateEffect 
        words = "Full Stack Developer"
         />
      
      <div>

      </div>

      <div className="">
        <TextGenerateEffect
          words= "Currently Studying Software Engineering at UC Irvine"
          />
      </div>

    {/*
       <LogoLoop 
              logos={HeaderLogos}
              gap={10}
              speed={15}
              logoHeight={20}
              scaleOnHover={true}
              showLabels={false}
              labelPlacement="bottom"
              scrollMode="bounce"
              width="100%"
              fadeOut={false}
               />
      */}

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