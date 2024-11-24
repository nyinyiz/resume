"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold">
            Resume Builder
          </Link>
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Home
            </Link>
            <Link 
              href="/experience" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Experience
            </Link>
            <Link 
              href="/projects" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Projects
            </Link>
            <Link 
              href="/contact" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Contact
            </Link>
          </div>
        </div>
        <Button asChild variant="default" size="sm" className="gap-2">
          <Link href="/builder">
            <Copy className="h-4 w-4" />
            Use as Template
          </Link>
        </Button>
      </div>
    </nav>
  );
} 