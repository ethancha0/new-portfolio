import React from 'react'
import ChevronButton from './ui/chevron-button'

const About = () => {
  return (
    <div className="flex gap-110 ">

        <div>
            <div className="max-w-4xl">
            <h2 className="text-3xl font-semibold">About Me</h2>
          </div>

        <p className="mt-4 text-gray-700">
            I'm currently studying Software Engineering at UC Irvine <br/>with a passion for building 
            full-stack applications <br/> <br/>

            My work ranges from collaborative tools like ZotMeet to solving<br/> problems with JobFinder.
            I'm also a proud committee member of <br/>UC Irvine's Infomation & Computer Science Student Council <br/><br/>

            When I'm not programming, you can find me collaboarting with <br/>student organizations like 
            Tomo no Kai and FUSION on campus.<br/> I also enjoy playing electric guitar, basketball, bouldering, and growing bonsai 
        </p>

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
