import React from 'react'
import ChevronButton from './ui/chevron-button'
import Image from 'next/image'
import HeadShot from '@/public/headshot.jpeg'

const About = () => {
  return (
    <div className="flex gap-110 ">

        <div className="">
            <div className="max-w-4xl">
            <h2 className="text-3xl font-semibold">About Me</h2>
          </div>

        <div className="flex gap-50 justify-center items-center">
          
          <p className="mt-4 text-gray-700">
              I'm currently studying Software Engineering at UC Irvine <br/>with a passion for building 
              full-stack applications <br/> <br/>

              My work ranges from collaborative tools like ZotMeet to solving<br/> problems with JobFinder.
              I'm also a proud committee member of <br/>UC Irvine's Infomation & Computer Science Student Council <br/><br/>

              When I'm not programming, I'm playing electric guitar, basketball,<br/> bouldering, or growing bonsai 

            
          </p>
          <Image src={HeadShot} alt="ethan" className="w-50 h-75 rounded-2xl shadow-2xl"></Image>
        </div>

         <ChevronButton
          redirect={"contactScroll"}
          position="inline"
          wrapperClassName="py-16"
          buttonClassName="p-6 rounded-full"
        />

        </div>
       

    {/*
        <div>
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-semibold">Skills & Technologies</h2>
            </div>

            <p>techoaisd</p>

        </div>
        
        */}



    </div>
  )
}

export default About
