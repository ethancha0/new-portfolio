import Image from "next/image";
import MagicBento from "@/components/MagicBento"
import Project from "@/components/project_row/project"
import Header from "@/components/header"


export default function Home() {
  return (
    <div className="">
        
        <div>
          <Header/>
        </div>



        <div className="">
          <Project/>
        </div>
        


    </div>
  );
}
