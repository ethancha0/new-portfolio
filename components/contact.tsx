import React from 'react'
import { TextGenerateEffect } from './ui/text-generate-effect'
import { Button } from './ui/button'
import { Mail } from 'lucide-react';

const Contact = () => {
  return (
    <div className="mt-50 mb-50">

        <div className="text-center">
        <TextGenerateEffect
            words="Let's make something happen"
            className="text-4xl"
          />
        <TextGenerateEffect
            words="I mean you've scrolled this far already... "
            className="text-2xl font-normal"
          />

          <Button asChild size="lg" className="mt-10">
            <a href="mailto:ethanchao2005@gmail.com" className="inline-flex items-center gap-2">
              Get in touch
              <Mail />
            </a>
          </Button>
          
        </div>
        
        
        
    </div>
  )
}

export default Contact
