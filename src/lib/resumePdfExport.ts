import { jsPDF } from "jspdf";

interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    summary: string;
  };
  experience: Array<{
    title: string;
    company: string;
    location: string;
    period: string;
    responsibilities: string[];
    skills: string[];
  }>;
  skills: {
    languages: Array<{ name: string; level: number }>;
    frameworks: Array<{ name: string; level: number }>;
    tools: Array<{ name: string; level: number }>;
    concepts: Array<{ name: string; level: number }>;
  };
  projects: Array<{
    name: string;
    description: string;
    link?: string;
  }>;
  certificates: Array<{
    name: string;
    url: string;
  }>;
}

export async function generateResumePDF(data: ResumeData): Promise<void> {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 20;
  let yPos = margin;

  // Colors
  const primaryColor: [number, number, number] = [59, 130, 246]; // Blue
  const textColor: [number, number, number] = [30, 30, 30];
  const lightGray: [number, number, number] = [100, 100, 100];

  // Helper function to check if we need a new page
  const checkNewPage = (spaceNeeded: number) => {
    if (yPos + spaceNeeded > pageHeight - margin) {
      doc.addPage();
      yPos = margin;
      return true;
    }
    return false;
  };

  // Header Section
  doc.setFontSize(28);
  doc.setTextColor(...textColor);
  doc.setFont("helvetica", "bold");
  doc.text(data.personalInfo.name, margin, yPos);
  yPos += 10;

  doc.setFontSize(14);
  doc.setTextColor(...primaryColor);
  doc.setFont("helvetica", "normal");
  doc.text(data.personalInfo.title, margin, yPos);
  yPos += 12;

  // Contact Information
  doc.setFontSize(10);
  doc.setTextColor(...lightGray);
  doc.setFont("helvetica", "normal");

  const contactLine1 = `${data.personalInfo.email} | ${data.personalInfo.phone}`;
  const contactLine2 = `${data.personalInfo.location}`;

  doc.text(contactLine1, margin, yPos);
  yPos += 5;
  doc.text(contactLine2, margin, yPos);
  yPos += 5;

  // LinkedIn and GitHub
  doc.setTextColor(...primaryColor);
  doc.textWithLink("LinkedIn", margin, yPos, { url: data.personalInfo.linkedin });
  doc.text(" | ", margin + 20, yPos);
  doc.textWithLink("GitHub", margin + 27, yPos, { url: data.personalInfo.github });
  yPos += 10;

  // Divider
  doc.setDrawColor(...lightGray);
  doc.setLineWidth(0.5);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 10;

  // Professional Summary
  doc.setFontSize(12);
  doc.setTextColor(...textColor);
  doc.setFont("helvetica", "bold");
  doc.text("PROFESSIONAL SUMMARY", margin, yPos);
  yPos += 7;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...textColor);
  const summaryLines = doc.splitTextToSize(data.personalInfo.summary, pageWidth - 2 * margin);
  summaryLines.forEach((line: string) => {
    checkNewPage(6);
    doc.text(line, margin, yPos);
    yPos += 5;
  });
  yPos += 5;

  // Professional Experience
  checkNewPage(20);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...textColor);
  doc.text("PROFESSIONAL EXPERIENCE", margin, yPos);
  yPos += 7;

  // Group experiences by company
  const groupedExperiences = data.experience.reduce((acc, exp) => {
    const existing = acc.find(g => g.company === exp.company);
    if (existing) {
      existing.roles.push(exp);
    } else {
      acc.push({ company: exp.company, location: exp.location, roles: [exp] });
    }
    return acc;
  }, [] as Array<{ company: string; location: string; roles: typeof data.experience }>);

  groupedExperiences.forEach((group) => {
    checkNewPage(15);

    // Company name
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...textColor);
    doc.text(group.company, margin, yPos);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(...lightGray);
    doc.setFontSize(9);
    doc.text(group.location, pageWidth - margin, yPos, { align: "right" });
    yPos += 6;

    group.roles.forEach((role) => {
      checkNewPage(10);

      // Job title and period
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...primaryColor);
      doc.text(role.title, margin + 3, yPos);

      doc.setFont("helvetica", "italic");
      doc.setTextColor(...lightGray);
      doc.setFontSize(9);
      doc.text(role.period, pageWidth - margin, yPos, { align: "right" });
      yPos += 6;

      // Responsibilities
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...textColor);

      role.responsibilities.forEach((resp) => {
        checkNewPage(7);
        const bulletPoint = "•";
        doc.text(bulletPoint, margin + 3, yPos);
        const respLines = doc.splitTextToSize(resp, pageWidth - 2 * margin - 10);
        respLines.forEach((line: string, index: number) => {
          if (index > 0) checkNewPage(5);
          doc.text(line, margin + 8, yPos);
          yPos += 4;
        });
      });
      yPos += 2;

      // Skills
      if (role.skills.length > 0) {
        checkNewPage(6);
        doc.setFontSize(8);
        doc.setTextColor(...lightGray);
        const skillsText = "Skills: " + role.skills.join(" • ");
        const skillLines = doc.splitTextToSize(skillsText, pageWidth - 2 * margin - 6);
        skillLines.forEach((line: string) => {
          doc.text(line, margin + 6, yPos);
          yPos += 4;
        });
        yPos += 3;
      }
    });

    yPos += 2;
  });

  // Technical Skills
  checkNewPage(30);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...textColor);
  doc.text("TECHNICAL SKILLS", margin, yPos);
  yPos += 7;

  const skillCategories = [
    { title: "Languages", items: data.skills.languages },
    { title: "Frameworks", items: data.skills.frameworks },
    { title: "Tools", items: data.skills.tools },
    { title: "Concepts", items: data.skills.concepts },
  ];

  skillCategories.forEach((category) => {
    if (category.items.length > 0) {
      checkNewPage(8);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...primaryColor);
      doc.text(category.title + ":", margin, yPos);
      yPos += 5;

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...textColor);
      const skillNames = category.items
        .sort((a, b) => b.level - a.level)
        .map((s) => s.name)
        .join(" • ");
      const skillLines = doc.splitTextToSize(skillNames, pageWidth - 2 * margin - 3);
      skillLines.forEach((line: string) => {
        checkNewPage(5);
        doc.text(line, margin + 3, yPos);
        yPos += 4;
      });
      yPos += 3;
    }
  });

  // Certifications
  if (data.certificates.length > 0) {
    checkNewPage(20);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...textColor);
    doc.text("CERTIFICATIONS", margin, yPos);
    yPos += 7;

    data.certificates.forEach((cert) => {
      checkNewPage(6);
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...textColor);
      doc.text("•", margin, yPos);
      doc.setTextColor(...primaryColor);
      doc.textWithLink(cert.name, margin + 5, yPos, { url: cert.url });
      yPos += 5;
    });
  }

  // Save the PDF
  doc.save(`${data.personalInfo.name.replace(/\s+/g, "_")}_Resume.pdf`);
}
