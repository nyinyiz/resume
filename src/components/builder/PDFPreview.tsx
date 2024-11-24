"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, Check, X, Maximize2 } from "lucide-react";
import type { ResumeData } from "@/types";
import { generatePDF } from "@/lib/pdfGenerator";
import { cn } from "@/lib/utils";

interface PDFPreviewProps {
  data: ResumeData;
}

const TEMPLATES = [
  { 
    id: 'modern', 
    name: 'Modern',
    description: 'Clean and contemporary design with modern styling'
  },
  { 
    id: 'minimal', 
    name: 'Minimal',
    description: 'Simple and elegant with focus on content'
  },
  { 
    id: 'classic', 
    name: 'Classic',
    description: 'Traditional resume layout with professional look'
  },
] as const;

type TemplateId = typeof TEMPLATES[number]['id'];

export default function PDFPreview({ data }: PDFPreviewProps) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [template, setTemplate] = useState<TemplateId>('modern');
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    generatePDF(data, template).then((url: string) => {
      setPdfUrl(url);
    });
  }, [data, template]);

  const handleDownload = () => {
    if (pdfUrl) {
      const a = document.createElement("a");
      a.href = pdfUrl;
      a.download = `resume-${template}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">PDF Preview</h3>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFullScreen(true)}
              className="flex items-center gap-2"
            >
              <Maximize2 className="w-4 h-4" />
              Full Screen
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              disabled={!pdfUrl}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => setTemplate(t.id)}
              className={cn(
                "relative p-4 border rounded-lg text-left transition-all",
                template === t.id 
                  ? "border-primary bg-primary/5" 
                  : "hover:border-primary/50"
              )}
            >
              {template === t.id && (
                <div className="absolute top-2 right-2 text-primary">
                  <Check className="w-4 h-4" />
                </div>
              )}
              <h4 className="font-medium">{t.name}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {t.description}
              </p>
            </button>
          ))}
        </div>

        <div className="h-[800px] bg-white rounded-lg shadow-lg overflow-hidden">
          {pdfUrl ? (
            <iframe
              src={pdfUrl}
              className="w-full h-full"
              title="Resume PDF Preview"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              Loading preview...
            </div>
          )}
        </div>
      </div>

      {/* Full Screen Modal */}
      {isFullScreen && (
        <div className="fixed inset-0 bg-background z-50 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold">Resume Preview</h3>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                disabled={!pdfUrl}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFullScreen(false)}
                className="flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Close
              </Button>
            </div>
          </div>
          <div className="flex-1 p-4 bg-muted">
            {pdfUrl ? (
              <iframe
                src={pdfUrl}
                className="w-full h-full bg-white rounded-lg shadow-lg"
                title="Resume PDF Preview Full Screen"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                Loading preview...
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
} 