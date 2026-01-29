import React from 'react'
import { TextGenerateEffect } from '@/components/ui/text-generate-effect'

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

    </div>
  )
}

export default header