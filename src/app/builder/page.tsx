"use client";

import { useState } from "react";
import SampleJSON from "@/components/builder/SampleJSON";
import PDFPreview from "@/components/builder/PDFPreview";
import type { ResumeData } from "@/types";
import { sampleResume } from "@/lib/sampleResume";

export default function BuilderPage() {
  const [resumeData, setResumeData] = useState<ResumeData>(sampleResume);

  return (
    <div className="container mx-auto py-8 space-y-8">
      <h2 className="text-2xl font-bold">Resume Builder</h2>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <SampleJSON 
            value={resumeData} 
            onChange={setResumeData} 
          />
        </div>
        <div className="space-y-4">
          <PDFPreview data={resumeData} />
        </div>
      </div>
    </div>
  );
} 