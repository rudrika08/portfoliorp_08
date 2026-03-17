"use client"

import { Circle, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 black:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 black:rotate-0 black:scale-0" />
          <Circle className="absolute h-[1.2rem] w-[1.2rem] scale-0 transition-all black:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light{theme === "light" ? " \u2713" : ""}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark{theme === "dark" ? " \u2713" : ""}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("black")}>
          Black{theme === "black" ? " \u2713" : ""}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
