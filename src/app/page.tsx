"use client"

import Hero from "@/components/Hero"
import Experience from "@/components/Experience"
import Projects from "@/components/Projects"
import Skills from "@/components/Skills"
import MediumArticles from "@/components/MediumArticles"
import TalksAndCredentials from "@/components/TalksAndCredentials"
import SecretCTA from "@/components/SecretCTA"
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
  return (
    <>
      <SlideDeck slides={slides} />
      <Analytics />
    </>
  )
}
