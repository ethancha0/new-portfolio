import Project from "@/components/project_row/project"
import Header from "@/components/header"
import About from "@/components/about";
import Contact from "@/components/contact";





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

        <section id="contact" className="scroll-mt-[25vh] flex justify-center">
          <Contact/>
        </section>
    


    </div>
  );
}
