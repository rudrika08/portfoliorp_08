import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, GitPullRequest, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function OpenSource() {
  const contributions = [
    {
      title: "FED KIIT",
      description:
        "Contributing to FED KIIT's official website and technical initiatives. Developed C25 Campus Map, integrated automated certificate distribution, and QR-based attendance tracking systems.",
      tags: ["React", "Node.js", "Web Development", "Campus Tools"],
      link: "https://github.com/fed-tech",
      website: "https://www.fedkiit.com/",
    },
  ]

  return (
    <div id="open-source">
      <div className="space-y-12">
        <div className="space-y-4 text-center">
          <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl">Open Source Contributions</h3>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed">
            Projects I've contributed to in the open source community
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          {contributions.map((contribution, index) => (
            <div key={index}>
              <Card className="h-full flex flex-col">
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="mb-4">
                    <GitPullRequest className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{contribution.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">{contribution.description}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {contribution.tags.map((tag, i) => (
                      <span key={i} className="text-xs bg-primary/10 px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild className="flex-1">
                      <Link href={contribution.link} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" /> GitHub
                      </Link>
                    </Button>
                    {contribution.website && (
                      <Button variant="outline" size="sm" asChild className="flex-1">
                        <Link href={contribution.website} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" /> Website
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
