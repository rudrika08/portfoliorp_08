import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, Calendar, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function Certificates() {
  const certificates = [
    {
      title: "Frontend Developer (React)",
      issuer: "HackerRank",
      date: "Verified Credential",
      skills: ["React", "JavaScript", "CSS"],
      credentialLink: "https://www.hackerrank.com/certificates/29d25180739c",
    },
    {
      title: "Strategy and Game Theory for Management",
      issuer: "IIMA - IIM Ahmedabad (Coursera)",
      date: "Completed Jan 23, 2026",
      skills: ["Game Theory", "Decision Making", "Critical Thinking"],
      credentialLink: "https://www.coursera.org/account/accomplishments/verify/2MEWQP9CI8GH",
    },
    {
      title: "Business Analytics for Decision Making",
      issuer: "University of Colorado Boulder (Coursera)",
      date: "Completed Jan 24, 2026",
      skills: ["Business Analytics", "Optimization", "Data-Driven Decisions"],
      credentialLink: "https://www.coursera.org/account/accomplishments/verify/9YTVEX6G8ARC",
    },
    {
      title: "Go for Gold Contest - Gold Level",
      issuer: "Accenture iAspire",
      date: "Completed Dec 26, 2025",
      skills: ["Problem Solving", "Competitive Performance", "Professional Excellence"],
      credentialLink:
        "https://www.linkedin.com/in/rudrika-panigrahi-6085b5268/overlay/Certifications/570408425/treasury/?profileId=ACoAAEGVnCgBVHbcyHMpjs36i2Lkz8H7ZXtJp4Y",
    },
  ]

  return (
    <section id="certificates" className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Certificates</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Credentials and certifications that validate my technical learning journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((certificate, index) => (
              <Card key={index} className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6 flex h-full flex-col">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
                    <Award className="h-5 w-5 text-primary" />
                  </div>

                  <h3 className="text-lg font-bold leading-snug">{certificate.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{certificate.issuer}</p>

                  <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{certificate.date}</span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {certificate.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="font-normal">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  {certificate.credentialLink && (
                    <Button asChild variant="outline" size="sm" className="mt-6 w-fit">
                      <Link href={certificate.credentialLink} target="_blank" rel="noopener noreferrer">
                        Verify
                        <ExternalLink className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
