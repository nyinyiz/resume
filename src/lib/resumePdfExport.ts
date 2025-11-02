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
  education?: Array<{
    degree: string;
    institution: string;
    location: string;
    graduationYear: string;
  }>;
  detailedTechnicalExpertise?: {
    languagesAndFrameworks: string[];
    architectureAndPatterns: string[];
    databaseAndStorage: string[];
    uiUxAndCustomComponents: string[];
    testingAndQuality: string[];
    toolingAndDevOps: string[];
    collaborationAndAgile: string[];
  };
  portfolioLinks?: {
    github: string;
    portfolio: string;
    medium: string;
    projects: Array<{
      name: string;
      description: string;
      url: string;
    }>;
  };
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

  // Helper to add section header
  const addSectionHeader = (title: string) => {
    checkNewPage(15);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...textColor);
    doc.text(title, margin, yPos);
    yPos += 2;
    // Add underline
    doc.setDrawColor(...primaryColor);
    doc.setLineWidth(0.5);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 8;
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
  addSectionHeader("PROFESSIONAL SUMMARY");

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

  // Technical Expertise
  if (data.detailedTechnicalExpertise) {
    addSectionHeader("TECHNICAL EXPERTISE");

    const expertiseCategories = [
      { title: "Languages & Frameworks", items: data.detailedTechnicalExpertise.languagesAndFrameworks },
      { title: "Architecture & Patterns", items: data.detailedTechnicalExpertise.architectureAndPatterns },
      { title: "Database & Storage", items: data.detailedTechnicalExpertise.databaseAndStorage },
      { title: "UI/UX & Custom Components", items: data.detailedTechnicalExpertise.uiUxAndCustomComponents },
      { title: "Testing & Quality", items: data.detailedTechnicalExpertise.testingAndQuality },
      { title: "Tooling & DevOps", items: data.detailedTechnicalExpertise.toolingAndDevOps },
      { title: "Collaboration & Agile", items: data.detailedTechnicalExpertise.collaborationAndAgile },
    ];

    expertiseCategories.forEach((category) => {
      if (category.items && category.items.length > 0) {
        checkNewPage(10);
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...primaryColor);
        doc.text(category.title, margin, yPos);
        yPos += 5;

        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(...textColor);

        category.items.forEach((item) => {
          checkNewPage(6);
          doc.text("●", margin + 2, yPos);
          const itemLines = doc.splitTextToSize(item, pageWidth - 2 * margin - 8);
          itemLines.forEach((line: string, index: number) => {
            if (index > 0) checkNewPage(5);
            doc.text(line, margin + 7, yPos);
            yPos += 4.5;
          });
        });
        yPos += 2;
      }
    });

    yPos += 3;
  }

  // Professional Experience
  addSectionHeader("PROFESSIONAL EXPERIENCE");

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
        const bulletPoint = "●";
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
        const skillsText = "Technologies: " + role.skills.join(" • ");
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

  // Education
  if (data.education && data.education.length > 0) {
    addSectionHeader("EDUCATION");

    data.education.forEach((edu) => {
      checkNewPage(10);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...textColor);
      doc.text(edu.degree, margin, yPos);
      yPos += 5;

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...lightGray);
      doc.text(`${edu.institution}, ${edu.location}`, margin, yPos);
      doc.text(edu.graduationYear, pageWidth - margin, yPos, { align: "right" });
      yPos += 8;
    });
  }

  // Certifications
  if (data.certificates.length > 0) {
    addSectionHeader("CERTIFICATIONS");

    data.certificates.forEach((cert) => {
      checkNewPage(6);
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...textColor);
      doc.text("●", margin, yPos);
      doc.setTextColor(...primaryColor);

      // Shorten URLs for display
      const displayUrl = cert.url.includes("shorturl")
        ? cert.url
        : cert.url.replace(/^https?:\/\//, "");

      doc.textWithLink(cert.name, margin + 5, yPos, { url: cert.url });
      yPos += 4;

      doc.setFontSize(8);
      doc.setTextColor(...lightGray);
      doc.text(`(${displayUrl})`, margin + 7, yPos);
      yPos += 6;
    });
    yPos += 3;
  }

  // Portfolio & Projects
  if (data.portfolioLinks) {
    addSectionHeader("PORTFOLIO & PROJECTS");

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...textColor);

    // Links
    doc.text("●", margin, yPos);
    doc.setTextColor(...primaryColor);
    doc.textWithLink("GitHub: " + data.portfolioLinks.github, margin + 5, yPos, {
      url: "https://" + data.portfolioLinks.github
    });
    yPos += 5;

    doc.setTextColor(...textColor);
    doc.text("●", margin, yPos);
    doc.setTextColor(...primaryColor);
    doc.textWithLink("Portfolio: " + data.portfolioLinks.portfolio, margin + 5, yPos, {
      url: "https://" + data.portfolioLinks.portfolio
    });
    yPos += 5;

    doc.setTextColor(...textColor);
    doc.text("●", margin, yPos);
    doc.setTextColor(...primaryColor);
    doc.textWithLink("Medium: " + data.portfolioLinks.medium, margin + 5, yPos, {
      url: "https://" + data.portfolioLinks.medium
    });
    yPos += 7;

    // Projects
    if (data.portfolioLinks.projects && data.portfolioLinks.projects.length > 0) {
      data.portfolioLinks.projects.forEach((project) => {
        checkNewPage(8);
        doc.setTextColor(...textColor);
        doc.text("●", margin, yPos);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...primaryColor);
        doc.text(project.name + ": ", margin + 5, yPos);

        doc.setFont("helvetica", "normal");
        doc.setTextColor(...textColor);
        const projectDesc = project.description + " ";
        doc.text(projectDesc, margin + 5 + doc.getTextWidth(project.name + ": "), yPos);
        yPos += 4;

        doc.setFontSize(8);
        doc.setTextColor(...primaryColor);
        doc.textWithLink("(" + project.url + ")", margin + 7, yPos, {
          url: "https://" + project.url
        });
        doc.setFontSize(9);
        yPos += 6;
      });
    }
  }

  // Save the PDF
  doc.save(`${data.personalInfo.name.replace(/\s+/g, "_")}_Resume.pdf`);
}
