import { Card, CardContent } from "@/components/ui/card"
import { Code2, Brain, Server, Users } from "lucide-react"

export default function About() {
  const features = [
    {
      icon: <Code2 className="h-10 w-10 text-primary" />,
      title: "Full Stack Development",
      description: "Expertise in React.js, Node.js, Express.js, FastAPI, and MongoDB",
    },
    {
      icon: <Brain className="h-10 w-10 text-primary" />,
      title: "AI/ML Enthusiast",
      description: "Experience with LLM Agents, NLP, Scikit-learn, and Vector Databases",
    },
    {
      icon: <Server className="h-10 w-10 text-primary" />,
      title: "DevOps & Tools",
      description: "Proficient with Docker Compose, Nginx, Git, GitHub Actions, and Linux",
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Team Collaboration",
      description: "Strong foundation in collaborative software development and problem solving",
    },
  ]

  return (
    <div className="w-full bg-muted/30">
      <section id="about" className="py-20 w-full">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="space-y-12">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Me</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Computer Science undergraduate at KIIT University with experience building full-stack web applications
                and AI-based systems.
              </p>
            </div>

            <div className="mx-auto max-w-3xl text-center">
              <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
                Strong foundation in data structures, problem solving, and collaborative software development.
                Experienced in designing scalable systems with modern technologies including React, Node.js, FastAPI,
                and MongoDB. Passionate about AI/ML with hands-on experience in LLM Agents, NLP, and vector databases
                for building intelligent applications.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              {features.map((feature, index) => (
                <div key={index} className="animate-in">
                  <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50">
                    <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                      <div className="p-2 rounded-full bg-primary/10">{feature.icon}</div>
                      <h3 className="text-xl font-bold">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
