import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@/components/analytics"
import ClientLayout from "./client"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Rudrika Panigrahi | Full-Stack Developer & AI/ML Enthusiast",
  description:
    "Portfolio of Rudrika Panigrahi, a B.Tech Computer Science student and Full-Stack Developer specializing in React.js, Node.js, FastAPI, and AI/ML.",
  keywords: [
    "Rudrika Panigrahi",
    "Full Stack Developer",
    "AI ML Enthusiast",
    "React",
    "Node.js",
    "Python",
    "KIIT University",
  ],
  authors: [{ name: "Rudrika Panigrahi" }],
  creator: "Rudrika Panigrahi",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rudrikapanigrahi.com",
    title: "Rudrika Panigrahi | Full-Stack Developer & AI/ML Enthusiast",
    description:
      "Portfolio of Rudrika Panigrahi, a B.Tech Computer Science student and Full-Stack Developer specializing in React.js, Node.js, FastAPI, and AI/ML.",
    siteName: "Rudrika Panigrahi Portfolio",
    images: [
      {
        url: "/favicon.png",
        width: 512,
        height: 512,
        alt: "Rudrika Panigrahi Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rudrika Panigrahi | Full-Stack Developer & AI/ML Enthusiast",
    description:
      "Portfolio of Rudrika Panigrahi, a B.Tech Computer Science student and Full-Stack Developer specializing in React.js, Node.js, FastAPI, and AI/ML.",
    creator: "@rudrika_p",
    images: ["/favicon.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Suspense>
        <ClientLayout>{children}</ClientLayout>
      </Suspense>
      <Analytics />
    </>
  )
}


import './globals.css'
