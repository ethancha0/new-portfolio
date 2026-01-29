import React from 'react'
import { TextGenerateEffect } from '@/components/ui/text-generate-effect'

const header = () => {
  return (
    <div className="p-12 border-b-4">

      <TextGenerateEffect
        words="Ethan Chao"
      />


      <TextGenerateEffect 
        words = "I'm a Full Stack Developer studying Software Engineering @ University of California, Irvine"
         />
    </div>
  )
}

export default header