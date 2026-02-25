import Project from "@/components/project_row/project"
import Header from "@/components/header"




export default function Home() {
  return (
    <div className="">
        
        <div>
          <Header/>
        </div>
        

        <section id="projects" className="scroll-mt-24">
          <Project/>
        </section>

        <section id="about" className="scroll-mt-24 py-16">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-semibold">About Me</h2>
          </div>
        </section>
    


    </div>
  );
}
