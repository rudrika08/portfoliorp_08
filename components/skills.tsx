import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Skills() {
  const skillCategories = [
    {
      category: "Languages",
      skills: ["Java", "Python", "JavaScript", "C", "SQL"],
    },
    {
      category: "Frameworks",
      skills: ["React.js", "Node.js", "Express.js", "FastAPI", "Streamlit", "Socket.IO"],
    },
    {
      category: "Databases",
      skills: ["MongoDB", "Qdrant (Vector DB)"],
    },
    {
      category: "AI / ML",
      skills: ["LLM Agents", "NLP", "Scikit-learn"],
    },
    {
      category: "DevOps & Tools",
      skills: ["Docker Compose", "Nginx", "Git", "GitHub Actions", "Linux"],
    },
    {
      category: "Core Competencies",
      skills: ["Data Structures & Algorithms", "Data Analysis", "Full-Stack Development", "Machine Learning Basics"],
    },
  ]

  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Skills</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              My expertise and technical proficiencies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {skillCategories.map((category, index) => (
              <div key={index} className="skill-card">
                <Card className="h-full border-t-4 border-t-primary">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">{category.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, i) => (
                        <Badge key={i} variant="secondary" className="text-sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
