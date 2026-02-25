'use client'

import React from 'react'
import { ChevronDown } from 'lucide-react'
import { motion } from "motion/react"

type ChevronButtonProps = {
  redirect: string;
};

const ChevronButton = ({ redirect }: ChevronButtonProps) => {

    const scrollToId = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToProjects = () => scrollToId("projects");
  const scrollToAbout = () => scrollToId("about");



  return (
    <div>
      
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
            <button
                onClick={redirect == "projectScroll" ? (scrollToProjects): (scrollToAbout)}
                className="animate-bounce text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
            >
                <ChevronDown className="w-8 h-8" />
            </button>
        </motion.div>


    </div>
  )
}

export default ChevronButton
