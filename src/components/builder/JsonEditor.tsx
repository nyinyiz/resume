"use client";

import { useState } from "react";
import type { ResumeData } from "@/types";

interface JsonEditorProps {
  initialData: ResumeData | null;
  onUpdate: (data: ResumeData) => void;
}

export default function JsonEditor({ initialData, onUpdate }: JsonEditorProps) {
  const [jsonString, setJsonString] = useState(
    initialData ? JSON.stringify(initialData, null, 2) : ""
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonString(e.target.value);
    try {
      const parsed = JSON.parse(e.target.value);
      onUpdate(parsed);
    } catch (err) {
      // Invalid JSON, ignore
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        Edit Resume JSON
      </label>
      <textarea
        className="w-full h-[500px] font-mono text-sm p-4 rounded-lg border bg-background resize-none"
        value={jsonString}
        onChange={handleChange}
        placeholder="Paste your resume JSON here..."
      />
    </div>
  );
} 