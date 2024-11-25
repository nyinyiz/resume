"use client";

import { useState } from "react";
import { Plus, Minus, Trash } from "lucide-react";
import Image from "next/image";
import { Upload } from "lucide-react";

interface ResumeFormProps {
  data: any;
  onChange: (data: any) => void;
}

export default function ResumeForm({ data, onChange }: ResumeFormProps) {
  const [activeSection, setActiveSection] = useState<string>("personalInfo");

  const updatePersonalInfo = (field: string, value: string) => {
    const newData = {
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value
      }
    };
    onChange(newData);
  };

  const addExperience = () => {
    const newData = {
      ...data,
      experience: [
        ...data.experience,
        {
          title: "",
          company: "",
          location: "",
          period: "",
          responsibilities: [""],
          skills: [""]
        }
      ]
    };
    onChange(newData);
  };

  const updateExperience = (index: number, field: string, value: any) => {
    const newExperience = [...data.experience];
    newExperience[index] = {
      ...newExperience[index],
      [field]: value
    };
    onChange({ ...data, experience: newExperience });
  };

  const removeExperience = (index: number) => {
    const newExperience = data.experience.filter((_: any, i: number) => i !== index);
    onChange({ ...data, experience: newExperience });
  };

  const addProject = () => {
    const newData = {
      ...data,
      projects: [
        ...data.projects,
        {
          name: "",
          description: ""
        }
      ]
    };
    onChange(newData);
  };

  const updateProject = (index: number, field: string, value: string) => {
    const newProjects = [...data.projects];
    newProjects[index] = {
      ...newProjects[index],
      [field]: value
    };
    onChange({ ...data, projects: newProjects });
  };

  const removeProject = (index: number) => {
    const newProjects = data.projects.filter((_: any, i: number) => i !== index);
    onChange({ ...data, projects: newProjects });
  };

  const addCommunity = () => {
    const newData = {
      ...data,
      communityContributions: [
        ...data.communityContributions,
        {
          event: "",
          organization: "",
          topic: ""
        }
      ]
    };
    onChange(newData);
  };

  const updateCommunity = (index: number, field: string, value: string) => {
    const newCommunity = [...data.communityContributions];
    newCommunity[index] = {
      ...newCommunity[index],
      [field]: value
    };
    onChange({ ...data, communityContributions: newCommunity });
  };

  const removeCommunity = (index: number) => {
    const newCommunity = data.communityContributions.filter((_: any, i: number) => i !== index);
    onChange({ ...data, communityContributions: newCommunity });
  };

  const addCertificate = () => {
    const newData = {
      ...data,
      certificates: [
        ...data.certificates,
        {
          name: "",
          url: ""
        }
      ]
    };
    onChange(newData);
  };

  const updateCertificate = (index: number, field: string, value: string) => {
    const newCertificates = [...data.certificates];
    newCertificates[index] = {
      ...newCertificates[index],
      [field]: value
    };
    onChange({ ...data, certificates: newCertificates });
  };

  const removeCertificate = (index: number) => {
    const newCertificates = data.certificates.filter((_: any, i: number) => i !== index);
    onChange({ ...data, certificates: newCertificates });
  };

  const addSkill = (category: string) => {
    const newData = {
      ...data,
      skills: {
        ...data.skills,
        [category]: [
          ...(data.skills?.[category] || []),
          { name: "", level: 1 }
        ]
      }
    };
    onChange(newData);
  };

  const updateSkill = (category: string, index: number, field: string, value: any) => {
    const newSkills = { ...data.skills };
    newSkills[category][index] = {
      ...newSkills[category][index],
      [field]: field === 'level' ? Number(value) : value
    };
    onChange({ ...data, skills: newSkills });
  };

  const removeSkill = (category: string, index: number) => {
    const newSkills = { ...data.skills };
    newSkills[category] = newSkills[category].filter((_: any, i: number) => i !== index);
    onChange({ ...data, skills: newSkills });
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newData = {
          ...data,
          personalInfo: {
            ...data.personalInfo,
            profileImage: reader.result as string
          }
        };
        onChange(newData);
      };
      reader.readAsDataURL(file);
    }
  };

  const sections = [
    { label: "Personal Info", id: "personalInfo" },
    { label: "Experience", id: "experience" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Community", id: "community" },
    { label: "Certificates", id: "certificates" }
  ];

  return (
    <div className="space-y-8">
      {/* Section Tabs */}
      <div className="flex gap-2 border-b border-border overflow-x-auto">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`px-4 py-2 -mb-px whitespace-nowrap ${
              activeSection === section.id
                ? "border-b-2 border-primary font-medium"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>

      {/* Personal Info Section */}
      {activeSection === "personalInfo" && (
        <div className="space-y-8">
          {/* Profile Image Upload */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative h-32 w-32 overflow-hidden rounded-full bg-muted">
              {data.personalInfo.profileImage?.startsWith('http') ? (
                <img
                  src={data.personalInfo.profileImage}
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
              ) : (
                <Image
                  src={data.personalInfo.profileImage || "/placeholder-avatar.png"}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              )}
              <label 
                htmlFor="profile-upload"
                className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
              >
                <Upload className="w-6 h-6 text-white" />
              </label>
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Click to upload profile picture or enter URL
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={data.personalInfo.name || ""}
                onChange={(e) => updatePersonalInfo("name", e.target.value)}
                className="w-full p-2 rounded-md border border-border bg-background"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={data.personalInfo.title || ""}
                onChange={(e) => updatePersonalInfo("title", e.target.value)}
                className="w-full p-2 rounded-md border border-border bg-background"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={data.personalInfo.email || ""}
                onChange={(e) => updatePersonalInfo("email", e.target.value)}
                className="w-full p-2 rounded-md border border-border bg-background"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                type="text"
                value={data.personalInfo.location || ""}
                onChange={(e) => updatePersonalInfo("location", e.target.value)}
                className="w-full p-2 rounded-md border border-border bg-background"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="tel"
                value={data.personalInfo.phone || ""}
                onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                className="w-full p-2 rounded-md border border-border bg-background"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">GitHub URL</label>
              <input
                type="url"
                value={data.personalInfo.github || ""}
                onChange={(e) => updatePersonalInfo("github", e.target.value)}
                className="w-full p-2 rounded-md border border-border bg-background"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">LinkedIn URL</label>
              <input
                type="url"
                value={data.personalInfo.linkedin || ""}
                onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
                className="w-full p-2 rounded-md border border-border bg-background"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Summary</label>
            <textarea
              value={data.personalInfo.summary || ""}
              onChange={(e) => updatePersonalInfo("summary", e.target.value)}
              rows={4}
              className="w-full p-2 rounded-md border border-border bg-background"
            />
          </div>
        </div>
      )}

      {/* Experience Section */}
      {activeSection === "experience" && (
        <div className="space-y-6">
          {data.experience.map((exp: any, index: number) => (
            <div key={index} className="p-4 border border-border rounded-lg relative">
              <button
                onClick={() => removeExperience(index)}
                className="absolute top-4 right-4 p-1 text-red-500 hover:bg-red-50 rounded"
              >
                <Trash size={16} />
              </button>
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={exp.title}
                      onChange={(e) => updateExperience(index, "title", e.target.value)}
                      className="w-full p-2 rounded-md border border-border bg-background"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Company <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateExperience(index, "company", e.target.value)}
                      className="w-full p-2 rounded-md border border-border bg-background"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) => updateExperience(index, "location", e.target.value)}
                      className="w-full p-2 rounded-md border border-border bg-background"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Period <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={exp.period}
                      onChange={(e) => updateExperience(index, "period", e.target.value)}
                      className="w-full p-2 rounded-md border border-border bg-background"
                      placeholder="e.g., 2022 - Present"
                      required
                    />
                  </div>
                </div>

                {/* Responsibilities */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Responsibilities <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    {exp.responsibilities.map((resp: string, respIndex: number) => (
                      <div key={respIndex} className="flex gap-2">
                        <input
                          type="text"
                          value={resp}
                          onChange={(e) => {
                            const newResp = [...exp.responsibilities];
                            newResp[respIndex] = e.target.value;
                            updateExperience(index, "responsibilities", newResp);
                          }}
                          className="flex-1 p-2 rounded-md border border-border bg-background"
                          placeholder="Add responsibility"
                          required
                        />
                        <button
                          onClick={() => {
                            const newResp = exp.responsibilities.filter((_: any, i: number) => i !== respIndex);
                            updateExperience(index, "responsibilities", newResp);
                          }}
                          className="p-2 text-red-500 hover:bg-red-50 rounded"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const newResp = [...exp.responsibilities, ""];
                        updateExperience(index, "responsibilities", newResp);
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-sm border border-dashed border-border rounded-lg hover:bg-accent w-full"
                    >
                      <Plus size={16} />
                      Add Responsibility
                    </button>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Skills <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    {exp.skills.map((skill: string, skillIndex: number) => (
                      <div key={skillIndex} className="flex gap-2">
                        <input
                          type="text"
                          value={skill}
                          onChange={(e) => {
                            const newSkills = [...exp.skills];
                            newSkills[skillIndex] = e.target.value;
                            updateExperience(index, "skills", newSkills);
                          }}
                          className="flex-1 p-2 rounded-md border border-border bg-background"
                          placeholder="Add skill"
                          required
                        />
                        <button
                          onClick={() => {
                            const newSkills = exp.skills.filter((_: any, i: number) => i !== skillIndex);
                            updateExperience(index, "skills", newSkills);
                          }}
                          className="p-2 text-red-500 hover:bg-red-50 rounded"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const newSkills = [...exp.skills, ""];
                        updateExperience(index, "skills", newSkills);
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-sm border border-dashed border-border rounded-lg hover:bg-accent w-full"
                    >
                      <Plus size={16} />
                      Add Skill
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={addExperience}
            className="flex items-center gap-2 px-4 py-2 text-sm border border-dashed border-border rounded-lg hover:bg-accent"
          >
            <Plus size={16} />
            Add Experience
          </button>
        </div>
      )}

      {/* Skills Section */}
      {activeSection === "skills" && (
        <div className="space-y-8">
          {Object.entries(data.skills || {}).map(([category, items]) => (
            <div key={category} className="space-y-4">
              <h3 className="text-xl font-semibold capitalize">{category}</h3>
              <div className="space-y-4">
                {(items as Array<{name: string; level: number}>).map((skill, index: number) => (
                  <div key={index} className="flex items-center gap-4">
                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) => updateSkill(category, index, "name", e.target.value)}
                      placeholder="Skill name"
                      className="flex-1 p-2 rounded-md border border-border bg-background"
                    />
                    <select
                      value={skill.level}
                      onChange={(e) => updateSkill(category, index, "level", e.target.value)}
                      className="w-24 p-2 rounded-md border border-border bg-background"
                    >
                      {[1, 2, 3, 4, 5].map((level) => (
                        <option key={level} value={level}>
                          {level}/5
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => removeSkill(category, index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addSkill(category)}
                  className="flex items-center gap-2 px-4 py-2 text-sm border border-dashed border-border rounded-lg hover:bg-accent"
                >
                  <Plus size={16} />
                  Add {category.slice(0, -1)}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Projects Section */}
      {activeSection === "projects" && (
        <div className="space-y-6">
          {data.projects.map((project: any, index: number) => (
            <div key={index} className="p-4 border border-border rounded-lg relative">
              <button
                onClick={() => removeProject(index)}
                className="absolute top-4 right-4 p-1 text-red-500 hover:bg-red-50 rounded"
              >
                <Trash size={16} />
              </button>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Project Name</label>
                  <input
                    type="text"
                    value={project.name}
                    onChange={(e) => updateProject(index, "name", e.target.value)}
                    className="w-full p-2 rounded-md border border-border bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    value={project.description}
                    onChange={(e) => updateProject(index, "description", e.target.value)}
                    rows={3}
                    className="w-full p-2 rounded-md border border-border bg-background"
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={addProject}
            className="flex items-center gap-2 px-4 py-2 text-sm border border-dashed border-border rounded-lg hover:bg-accent"
          >
            <Plus size={16} />
            Add Project
          </button>
        </div>
      )}

      {/* Community Section */}
      {activeSection === "community" && (
        <div className="space-y-6">
          {data.communityContributions.map((contribution: any, index: number) => (
            <div key={index} className="p-4 border border-border rounded-lg relative">
              <button
                onClick={() => removeCommunity(index)}
                className="absolute top-4 right-4 p-1 text-red-500 hover:bg-red-50 rounded"
              >
                <Trash size={16} />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Event</label>
                  <input
                    type="text"
                    value={contribution.event}
                    onChange={(e) => updateCommunity(index, "event", e.target.value)}
                    className="w-full p-2 rounded-md border border-border bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Organization</label>
                  <input
                    type="text"
                    value={contribution.organization}
                    onChange={(e) => updateCommunity(index, "organization", e.target.value)}
                    className="w-full p-2 rounded-md border border-border bg-background"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Topic</label>
                  <input
                    type="text"
                    value={contribution.topic}
                    onChange={(e) => updateCommunity(index, "topic", e.target.value)}
                    className="w-full p-2 rounded-md border border-border bg-background"
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={addCommunity}
            className="flex items-center gap-2 px-4 py-2 text-sm border border-dashed border-border rounded-lg hover:bg-accent"
          >
            <Plus size={16} />
            Add Community Contribution
          </button>
        </div>
      )}

      {/* Certificates Section */}
      {activeSection === "certificates" && (
        <div className="space-y-6">
          {data.certificates.map((cert: any, index: number) => (
            <div key={index} className="p-4 border border-border rounded-lg relative">
              <button
                onClick={() => removeCertificate(index)}
                className="absolute top-4 right-4 p-1 text-red-500 hover:bg-red-50 rounded"
              >
                <Trash size={16} />
              </button>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Certificate Name</label>
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) => updateCertificate(index, "name", e.target.value)}
                    className="w-full p-2 rounded-md border border-border bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">URL</label>
                  <input
                    type="url"
                    value={cert.url}
                    onChange={(e) => updateCertificate(index, "url", e.target.value)}
                    className="w-full p-2 rounded-md border border-border bg-background"
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={addCertificate}
            className="flex items-center gap-2 px-4 py-2 text-sm border border-dashed border-border rounded-lg hover:bg-accent"
          >
            <Plus size={16} />
            Add Certificate
          </button>
        </div>
      )}
    </div>
  );
} 