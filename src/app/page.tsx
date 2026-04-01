"use client"

import { useEffect, useState } from "react"
import Hero from "@/components/Hero"
import Experience from "@/components/Experience"
import Projects from "@/components/Projects"
import Skills from "@/components/Skills"
import MediumArticles from "@/components/MediumArticles"
import TalksAndCredentials from "@/components/TalksAndCredentials"
import SecretCTA from "@/components/SecretCTA"
import HomeLoader from "@/components/HomeLoader"
import SlideDeck, { type SlideConfig } from "@/components/slides/SlideDeck"
import { Analytics } from "@vercel/analytics/react"

const slides: SlideConfig[] = [
  { component: <Hero />,                   label: "Hero",       scrollable: false },
  { component: <Experience />,             label: "Experience", scrollable: true  },
  { component: <Projects />,               label: "Projects",   scrollable: true  },
  { component: <Skills />,                 label: "Skills",     scrollable: true  },
  { component: <MediumArticles />,         label: "Articles",   scrollable: true  },
  { component: <TalksAndCredentials />,    label: "More",       scrollable: true  },
  { component: <SecretCTA />,              label: "Psst",       scrollable: false },
]

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsLoading(false)
    }, 1350)

    return () => window.clearTimeout(timeoutId)
  }, [])

  return (
    <>
      <HomeLoader visible={isLoading} />
      {!isLoading && <SlideDeck slides={slides} />}
      <Analytics />
    </>
  )
}
