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
      title: "AI/ML Engineer",
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
              <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl/relaxed">
                Full-Stack Developer & AI/ML Engineer pursuing B.Tech in Computer Science at KIIT University.
              </p>
            </div>

            <div className="mx-auto max-w-3xl space-y-6">
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                I build scalable web applications and intelligent AI systems at the intersection of modern engineering and machine learning. My expertise spans the full stack — from responsive React frontends to robust Node.js and FastAPI backends, with MongoDB for data persistence.
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Beyond traditional full-stack development, I push boundaries with advanced AI technologies: LLM Agents, Retrieval-Augmented Generation (RAG), Natural Language Processing, and Vector Databases. My focus is on shipping production-ready systems that solve real-world problems.
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Currently exploring the intersection of intelligent systems and practical products — where cutting-edge AI meets user-centric design.
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
