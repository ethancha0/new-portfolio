import Project from "@/components/project_row/project"
import Header from "@/components/header"
import About from "@/components/ui/about";
import ChevronButton from "@/components/ui/chevron-button";




export default function Home() {
  return (
    <div className="">
        
        <div>
          <Header/>
        </div>
        

        <section id="projects" className="scroll-mt-24">
          <Project/>
        </section>

        <section id="about" className="mt-24 scroll-mt-[25vh] flex justify-center">
          <About/>
        </section>
    


    </div>
  );
}
