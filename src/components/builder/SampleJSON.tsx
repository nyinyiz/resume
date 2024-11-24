"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Upload, Plus, Trash2 } from "lucide-react";
import type { ResumeData, Education } from "@/types";

interface SampleJSONProps {
  value: ResumeData;
  onChange: (data: ResumeData) => void;
}

export default function SampleJSON({ value, onChange }: SampleJSONProps) {
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    section: keyof ResumeData,
    subsection: string,
    newValue: any
  ) => {
    onChange({
      ...value,
      [section]: {
        ...value[section],
        [subsection]: newValue,
      },
    });
  };

  const handleArrayChange = (
    section: keyof ResumeData,
    index: number,
    field: string,
    newValue: any
  ) => {
    const newArray = [...(value[section] as any[])];
    newArray[index] = { ...newArray[index], [field]: newValue };
    onChange({
      ...value,
      [section]: newArray,
    });
  };

  const addItem = (section: keyof ResumeData) => {
    const newArray = [...(value[section] as any[])];
    let newItem;

    switch (section) {
      case 'education':
        newItem = {
          institution: "",
          degree: "",
          field: "",
          location: "",
          graduationYear: "",
          gpa: "",
          relevantCourses: []
        };
        break;
      case 'experience':
        newItem = {
          title: "",
          company: "",
          location: "",
          period: "",
          responsibilities: [],
          skills: []
        };
        break;
      case 'projects':
        newItem = {
          name: "",
          description: ""
        };
        break;
      case 'communityContributions':
        newItem = {
          event: "",
          organization: "",
          topic: ""
        };
        break;
      case 'certificates':
        newItem = {
          name: "",
          url: ""
        };
        break;
      default:
        return;
    }

    onChange({
      ...value,
      [section]: [...newArray, newItem]
    });
  };

  const removeItem = (section: keyof ResumeData, index: number) => {
    const newArray = [...(value[section] as any[])];
    newArray.splice(index, 1);
    onChange({
      ...value,
      [section]: newArray
    });
  };

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(value, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content) as ResumeData;
        onChange(data);
        setError(null);
      } catch (err) {
        setError("Invalid JSON file format");
      }
    };
    reader.onerror = () => {
      setError("Error reading file");
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Resume Editor</h3>
        <div className="flex gap-2">
          <div className="relative">
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Upload JSON
            </Button>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={downloadJSON}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download JSON
          </Button>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      <div className="space-y-8">
        {/* Personal Info Section */}
        <section className="space-y-4">
          <h4 className="font-medium">Personal Information</h4>
          <div className="grid gap-4 md:grid-cols-2">
            {Object.entries(value.personalInfo).map(([key, val]) => (
              <div key={key} className="space-y-2">
                <label className="text-sm font-medium capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </label>
                {key === "summary" ? (
                  <textarea
                    value={val}
                    onChange={(e) =>
                      handleChange("personalInfo", key, e.target.value)
                    }
                    className="w-full min-h-[100px] p-2 border rounded-md"
                  />
                ) : (
                  <input
                    type="text"
                    value={val}
                    onChange={(e) =>
                      handleChange("personalInfo", key, e.target.value)
                    }
                    className="w-full p-2 border rounded-md"
                  />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Education</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => addItem('education')}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Education
            </Button>
          </div>
          {value.education.map((edu, index) => (
            <div key={index} className="relative p-4 border rounded-lg space-y-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeItem('education', index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              <div className="grid gap-4 md:grid-cols-2">
                {Object.entries(edu).map(([key, val]) => (
                  <div key={key} className="space-y-2">
                    <label className="text-sm font-medium capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </label>
                    {Array.isArray(val) ? (
                      <textarea
                        value={val.join(", ")}
                        onChange={(e) =>
                          handleArrayChange(
                            "education",
                            index,
                            key,
                            e.target.value.split(",").map((s) => s.trim())
                          )
                        }
                        className="w-full p-2 border rounded-md"
                        placeholder="Separate items with commas"
                      />
                    ) : (
                      <input
                        type="text"
                        value={val}
                        onChange={(e) =>
                          handleArrayChange(
                            "education",
                            index,
                            key,
                            e.target.value
                          )
                        }
                        className="w-full p-2 border rounded-md"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Experience Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Experience</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => addItem('experience')}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Experience
            </Button>
          </div>
          {value.experience.map((exp, index) => (
            <div key={index} className="relative p-4 border rounded-lg space-y-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeItem('experience', index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              <div className="grid gap-4 md:grid-cols-2">
                {Object.entries(exp).map(([key, val]) => (
                  <div key={key} className="space-y-2">
                    <label className="text-sm font-medium capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </label>
                    {Array.isArray(val) ? (
                      <textarea
                        value={val.join("\n")}
                        onChange={(e) =>
                          handleArrayChange(
                            "experience",
                            index,
                            key,
                            e.target.value.split("\n").map((s) => s.trim())
                          )
                        }
                        className="w-full min-h-[100px] p-2 border rounded-md"
                        placeholder="One item per line"
                      />
                    ) : (
                      <input
                        type="text"
                        value={val}
                        onChange={(e) =>
                          handleArrayChange(
                            "experience",
                            index,
                            key,
                            e.target.value
                          )
                        }
                        className="w-full p-2 border rounded-md"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Projects Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Projects</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => addItem('projects')}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Project
            </Button>
          </div>
          {value.projects.map((project, index) => (
            <div key={index} className="relative p-4 border rounded-lg space-y-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeItem('projects', index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              <div className="grid gap-4 md:grid-cols-2">
                {Object.entries(project).map(([key, val]) => (
                  <div key={key} className="space-y-2">
                    <label className="text-sm font-medium capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </label>
                    <input
                      type="text"
                      value={val}
                      onChange={(e) =>
                        handleArrayChange("projects", index, key, e.target.value)
                      }
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Community Contributions Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Community Contributions</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => addItem('communityContributions')}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Contribution
            </Button>
          </div>
          {value.communityContributions.map((contrib, index) => (
            <div key={index} className="relative p-4 border rounded-lg space-y-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeItem('communityContributions', index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              <div className="grid gap-4 md:grid-cols-2">
                {Object.entries(contrib).map(([key, val]) => (
                  <div key={key} className="space-y-2">
                    <label className="text-sm font-medium capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </label>
                    <input
                      type="text"
                      value={val}
                      onChange={(e) =>
                        handleArrayChange(
                          "communityContributions",
                          index,
                          key,
                          e.target.value
                        )
                      }
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Certificates Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Certificates</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => addItem('certificates')}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Certificate
            </Button>
          </div>
          {value.certificates.map((cert, index) => (
            <div key={index} className="relative p-4 border rounded-lg space-y-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeItem('certificates', index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              <div className="grid gap-4 md:grid-cols-2">
                {Object.entries(cert).map(([key, val]) => (
                  <div key={key} className="space-y-2">
                    <label className="text-sm font-medium capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </label>
                    <input
                      type="text"
                      value={val}
                      onChange={(e) =>
                        handleArrayChange(
                          "certificates",
                          index,
                          key,
                          e.target.value
                        )
                      }
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
} 