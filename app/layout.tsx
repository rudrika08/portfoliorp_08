import type React from "react"
import type { Metadata } from "next"
import { Suspense } from "react"
import { Analytics } from "@/components/analytics"
import NoScriptStyles from "@/components/noscript-styles"
import ClientLayout from "./client"
import "./globals.css"

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
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/profile.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: ["/favicon.ico"],
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
        url: "/profile.png",
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
    images: ["/profile.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <NoScriptStyles />
      </head>
      <body>
        <Suspense>
          <ClientLayout>{children}</ClientLayout>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}