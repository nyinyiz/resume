"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { resumeData as initialResumeData } from "@/data/resume";
import Editor from "@monaco-editor/react";
import { Code, Eye, Settings2, FileDown, Download } from "lucide-react";
import ResumeForm from "@/components/ResumeForm";
import Maintenance from "@/components/Maintenance";

// Dynamically import the preview component to avoid SSR issues
const Preview = dynamic(() => import("@/components/Preview"), { ssr: false });

type Tab = "editor" | "preview" | "form";

export default function ClonePage() {
  const [activeTab, setActiveTab] = useState<Tab>("form");
  const [resumeData, setResumeData] = useState(
    JSON.stringify(initialResumeData, null, 2)
  );
  const [parsedData, setParsedData] = useState(initialResumeData);
  const [showMaintenance, setShowMaintenance] = useState(false);

  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      setResumeData(value);
      try {
        const parsed = JSON.parse(value);
        setParsedData(parsed);
      } catch (error) {
        // Handle JSON parse error if needed
      }
    }
  };

  const handleFormChange = (newData: any) => {
    setParsedData(newData);
    setResumeData(JSON.stringify(newData, null, 2));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <motion.h1 
          className="text-3xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Customize Your Portfolio
        </motion.h1>
        
        {/* Tab Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab("form")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === "form"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            <Settings2 size={20} />
            Easy Edit
          </button>
          <button
            onClick={() => setActiveTab("editor")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === "editor"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            <Code size={20} />
            Code Editor
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === "preview"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            <Eye size={20} />
            Preview
          </button>
        </div>

        {/* Form View */}
        {activeTab === "form" && (
          <motion.div
            className="rounded-lg overflow-hidden border border-border"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-muted p-4 border-b border-border">
              <h2 className="text-lg font-semibold">Easy Edit Mode</h2>
              <p className="text-sm text-muted-foreground">
                Edit your portfolio information in a user-friendly format
              </p>
            </div>
            <div className="p-6">
              <ResumeForm data={parsedData} onChange={handleFormChange} />
            </div>
          </motion.div>
        )}

        {/* Editor View */}
        {activeTab === "editor" && (
          <motion.div
            className="h-[800px] rounded-lg overflow-hidden border border-border"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-muted p-4 border-b border-border">
              <h2 className="text-lg font-semibold">Edit Resume Data</h2>
              <p className="text-sm text-muted-foreground">
                Modify the JSON data below to customize your portfolio
              </p>
            </div>
            <Editor
              height="calc(100% - 85px)"
              defaultLanguage="json"
              value={resumeData}
              onChange={handleEditorChange}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                wordWrap: "on",
                lineNumbers: "on",
                scrollBeyondLastLine: false,
              }}
            />
          </motion.div>
        )}

        {/* Full Preview View */}
        {activeTab === "preview" && (
          <motion.div
            className="min-h-screen bg-background"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Preview data={parsedData} />
          </motion.div>
        )}

        {/* Updated Instructions */}
        <motion.div 
          className="mt-8 p-6 rounded-lg bg-muted"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl font-semibold mb-6">Download Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* PDF Download Option */}
            <div className="p-6 border border-border rounded-lg bg-background">
              <div className="flex items-center gap-3 mb-4">
                <FileDown className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-medium">Download as PDF</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Get a PDF version of your portfolio that you can print or share.
              </p>
              <button
                onClick={() => setShowMaintenance(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <FileDown className="w-4 h-4" />
                Download PDF
              </button>
            </div>

            {/* Code Download Option */}
            <div className="p-6 border border-border rounded-lg bg-background">
              <div className="flex items-center gap-3 mb-4">
                <Download className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-medium">Download Code</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Download your portfolio data as a JSON file to use in your own website.
              </p>
              <button
                onClick={() => setShowMaintenance(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download JSON
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Maintenance Modal */}
      <Maintenance
        isOpen={showMaintenance}
        onClose={() => setShowMaintenance(false)}
      />
    </div>
  );
} 