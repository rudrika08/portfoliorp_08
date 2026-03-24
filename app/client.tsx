"use client"

import type React from "react"
import { Mona_Sans as FontSans } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AnimatedBackground from "@/components/animated-background"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
      themes={["light", "dark", "black"]}
    >
      <div className={cn("relative flex min-h-screen flex-col overflow-hidden bg-background font-mono antialiased", fontSans.variable)}>
        <noscript>
          <div className="bg-yellow-100 dark:bg-yellow-900 p-4 text-center text-sm">
            For the best experience, please enable JavaScript. Some features may be limited without it.
          </div>
        </noscript>
        <AnimatedBackground />
        <Header />
        <main className="relative z-10 flex-1">{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
