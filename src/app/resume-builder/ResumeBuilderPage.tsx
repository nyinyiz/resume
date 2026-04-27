"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { resumeData } from "@/data/resume";
import ResumeForm from "@/features/resume-builder/components/ResumeForm";
import PDFPreview from "@/features/resume-builder/components/PDFPreview";
import type { ResumeData } from "@/types";

export default function ResumeBuilderPage() {
  const [data, setData] = useState<ResumeData>(() => structuredClone(resumeData));

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8">
      <Link
        href="/"
        className="group inline-flex items-center gap-1.5 text-xs font-medium text-foreground/45 transition-colors hover:text-foreground/75"
      >
        <ArrowLeft size={12} className="transition-transform group-hover:-translate-x-0.5" />
        Back to portfolio
      </Link>

      <header className="max-w-3xl space-y-2">
        <p className="section-label">Resume Builder</p>
        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-5xl">
          Edit once, preview instantly.
        </h1>
        <p className="text-sm leading-relaxed text-foreground/55">
          Update resume content in the form, then preview or download a PDF template.
        </p>
      </header>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,0.95fr)_minmax(520px,1.05fr)]">
        <section className="rounded-2xl border border-foreground/[0.08] bg-background/70 p-5 shadow-sm">
          <ResumeForm data={data} onChange={setData} />
        </section>

        <section className="rounded-2xl border border-foreground/[0.08] bg-background/70 p-5 shadow-sm">
          <PDFPreview data={data} />
        </section>
      </div>
    </div>
  );
}
