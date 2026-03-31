"use client"

import Hero from "@/components/Hero"
import Experience from "@/components/Experience"
import Projects from "@/components/Projects"
import Skills from "@/components/Skills"
import MediumArticles from "@/components/MediumArticles"
import Speaking from "@/components/Speaking"
import Certificates from "@/components/Certificates"
import SlideDeck, { type SlideConfig } from "@/components/slides/SlideDeck"
import { Analytics } from "@vercel/analytics/react"

const slides: SlideConfig[] = [
  { component: <Hero />,           label: "Hero",         scrollable: false },
  { component: <Experience />,     label: "Experience",   scrollable: true  },
  { component: <Projects />,       label: "Projects",     scrollable: true  },
  { component: <Skills />,         label: "Skills",       scrollable: true  },
  { component: <MediumArticles />, label: "Articles",     scrollable: true  },
  { component: <Speaking />,       label: "Speaking",     scrollable: true  },
  { component: <Certificates />,   label: "Certificates", scrollable: true  },
]

export default function Home() {
  return (
    <>
      <SlideDeck slides={slides} />
      <Analytics />
    </>
  )
}
