"use client";

import { useState } from "react";
import type { ResumeData } from "@/types";

interface FileUploadProps {
  onDataParsed: (data: ResumeData) => void;
}

export default function FileUpload({ onDataParsed }: FileUploadProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = async (file: File) => {
    try {
      setIsLoading(true);
      setError(null);

      const fileReader = new FileReader();
      fileReader.onload = async (e) => {
        try {
          const content = e.target?.result as string;
          const data = JSON.parse(content) as ResumeData;
          onDataParsed(data);
        } catch (err) {
          setError("Invalid JSON format");
        } finally {
          setIsLoading(false);
        }
      };

      fileReader.onerror = () => {
        setError("Error reading file");
        setIsLoading(false);
      };

      fileReader.readAsText(file);
    } catch (error) {
      setError("Failed to process file");
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept=".json"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            handleFileUpload(file);
          }
        }}
        className="block w-full text-sm text-slate-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-violet-700
          hover:file:bg-violet-100"
      />
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
} 