// src/components/slides/SlideDeckContext.tsx
"use client"

import { createContext, useContext } from "react"

export interface SlideDeckContextValue {
  current:   number
  total:     number
  direction: 1 | -1
  next:      () => void   // includes 750ms cooldown
  prev:      () => void   // includes 750ms cooldown
  goTo:      (index: number) => void  // no cooldown (dot clicks)
}

export const SlideDeckContext = createContext<SlideDeckContextValue | null>(null)

export function useSlideDeck(): SlideDeckContextValue {
  const ctx = useContext(SlideDeckContext)
  if (!ctx) throw new Error("useSlideDeck must be used within a SlideDeck")
  return ctx
}
