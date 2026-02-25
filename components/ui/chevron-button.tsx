'use client'

import React from 'react'
import { ChevronDown } from 'lucide-react'
import { motion } from "motion/react"

type ChevronButtonProps = {
  redirect: string;
  position?: "absolute" | "inline";
  wrapperClassName?: string;
  buttonClassName?: string;
};

const ChevronButton = ({
  redirect,
  position = "absolute",
  wrapperClassName = "",
  buttonClassName = "",
}: ChevronButtonProps) => {

    const scrollToId = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToProjects = () => scrollToId("projects");
  const scrollToAbout = () => scrollToId("about");



  return (
    <div className={wrapperClassName}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className={
          position === "absolute"
            ? "absolute bottom-8 left-1/2 -translate-x-1/2"
            : "flex justify-center"
        }
      >
        <button
          onClick={redirect == "projectScroll" ? scrollToProjects : scrollToAbout}
          className={[
            "animate-bounce text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400 transition-colors",
            buttonClassName,
          ].join(" ")}
        >
          <ChevronDown className="w-12 h-12" />
        </button>
      </motion.div>
    </div>
  )
}

export default ChevronButton
