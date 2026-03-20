"use client"

import { useEffect, useMemo, useState } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import type { ISourceOptions } from "@tsparticles/engine"

export default function AnimatedBackground() {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      setIsReady(true)
    })
  }, [])

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: "transparent",
      },
      fullScreen: {
        enable: false,
      },
      fpsLimit: 90,
      particles: {
        color: {
          value: ["#e9b4a9", "#f4c8bf", "#ffffff"],
        },
        links: {
          color: "#e9b4a9",
          distance: 150,
          enable: true,
          opacity: 0.28,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "out",
          },
          random: true,
          speed: 1.8,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 700,
          },
          value: 95,
        },
        opacity: {
          value: { min: 0.2, max: 0.6 },
          animation: {
            enable: true,
            speed: 1.1,
            sync: false,
          },
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3.5 },
          animation: {
            enable: true,
            speed: 3,
            sync: false,
          },
        },
      },
      detectRetina: true,
      interactivity: {
        detectsOn: "window",
        events: {
          onHover: {
            enable: true,
            mode: ["grab", "repulse"],
          },
          onClick: {
            enable: true,
            mode: "push",
          },
          resize: {
            enable: true,
          },
        },
        modes: {
          grab: {
            distance: 190,
            links: {
              opacity: 0.5,
            },
          },
          repulse: {
            distance: 100,
            duration: 0.5,
          },
          push: {
            quantity: 4,
          },
        },
      },
    }),
    []
  )

  if (!isReady) {
    return <div className="animated-background js-only" aria-hidden="true" />
  }

  return (
    <div className="animated-background js-only" aria-hidden="true">
      <Particles id="portfolio-particles" options={options} className="h-full w-full" />
    </div>
  )
}
