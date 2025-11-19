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
  const margin = 20; // Increased margin for better whitespace
  let yPos = margin;

  // Colors
  const primaryColor: [number, number, number] = [59, 130, 246]; // Blue #3b82f6
  const darkGray: [number, number, number] = [51, 51, 51]; // #333333
  const lightGray: [number, number, number] = [107, 114, 128]; // #6b7280
  const accentColor: [number, number, number] = [243, 244, 246]; // #f3f4f6 (Light gray background)

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
    checkNewPage(20);
    yPos += 5;

    // Section Title
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...primaryColor);
    doc.text(title.toUpperCase(), margin, yPos);

    yPos += 2;
    // Underline
    doc.setDrawColor(...primaryColor);
    doc.setLineWidth(0.5);
    doc.line(margin, yPos, pageWidth - margin, yPos);

    yPos += 8;
  };

  // --- HEADER SECTION ---
  // Background for header
  doc.setFillColor(...accentColor);
  doc.rect(0, 0, pageWidth, 60, "F");

  yPos = 25;

  // Name
  doc.setFontSize(24);
  doc.setTextColor(...darkGray);
  doc.setFont("helvetica", "bold");
  doc.text(data.personalInfo.name.toUpperCase(), margin, yPos);
  yPos += 10;

  // Title
  doc.setFontSize(14);
  doc.setTextColor(...primaryColor);
  doc.setFont("helvetica", "normal");
  doc.text(data.personalInfo.title, margin, yPos);
  yPos += 12;

  // Contact Info (Single Line)
  doc.setFontSize(9);
  doc.setTextColor(...darkGray);

  const contactParts = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location
  ].filter(Boolean);

  const contactText = contactParts.join("  •  ");
  doc.text(contactText, margin, yPos);
  yPos += 6;

  // Links (LinkedIn | GitHub)
  const linkY = yPos;
  let currentX = margin;

  doc.setTextColor(...primaryColor);
  doc.setFontSize(9);

  if (data.personalInfo.linkedin) {
    doc.textWithLink("LinkedIn", currentX, linkY, { url: data.personalInfo.linkedin });
    currentX += doc.getTextWidth("LinkedIn");
  }

  if (data.personalInfo.github) {
    if (data.personalInfo.linkedin) {
      doc.setTextColor(...lightGray);
      doc.text("  |  ", currentX, linkY);
      currentX += doc.getTextWidth("  |  ");
      doc.setTextColor(...primaryColor);
    }
    doc.textWithLink("GitHub", currentX, linkY, { url: data.personalInfo.github });
  }

  yPos = 70; // Reset yPos after header background

  // --- PROFESSIONAL SUMMARY ---
  if (data.personalInfo.summary) {
    addSectionHeader("Professional Summary");
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...darkGray);

    const summaryLines = doc.splitTextToSize(data.personalInfo.summary, pageWidth - 2 * margin);
    summaryLines.forEach((line: string) => {
      checkNewPage(5);
      doc.text(line, margin, yPos);
      yPos += 5;
    });
    yPos += 5;
  }

  // --- TECHNICAL EXPERTISE ---
  if (data.detailedTechnicalExpertise) {
    addSectionHeader("Technical Expertise");

    const categories = [
      { name: "Languages & Frameworks", items: data.detailedTechnicalExpertise.languagesAndFrameworks },
      { name: "Architecture", items: data.detailedTechnicalExpertise.architectureAndPatterns },
      { name: "Database", items: data.detailedTechnicalExpertise.databaseAndStorage },
      { name: "UI/UX", items: data.detailedTechnicalExpertise.uiUxAndCustomComponents },
      { name: "Testing", items: data.detailedTechnicalExpertise.testingAndQuality },
      { name: "DevOps", items: data.detailedTechnicalExpertise.toolingAndDevOps },
    ];

    categories.forEach((cat) => {
      if (cat.items && cat.items.length > 0) {
        checkNewPage(7);

        // Category Name (Bold)
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...darkGray);
        doc.text(`${cat.name}:`, margin, yPos);

        // Items
        doc.setFont("helvetica", "normal");
        const titleWidth = doc.getTextWidth(`${cat.name}:`) + 2;
        const itemsText = cat.items.join(", ");

        const itemLines = doc.splitTextToSize(itemsText, pageWidth - margin - (margin + titleWidth));

        itemLines.forEach((line: string, i: number) => {
          if (i > 0) checkNewPage(5);
          doc.text(line, margin + titleWidth, yPos + (i * 5));
        });

        yPos += (itemLines.length * 5) + 2;
      }
    });
    yPos += 5;
  }

  // --- PROFESSIONAL EXPERIENCE ---
  addSectionHeader("Professional Experience");

  // Group experiences
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

    // Company Header
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...darkGray);
    doc.text(group.company, margin, yPos);

    // Location (Right aligned)
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...lightGray);
    doc.setFontSize(10);
    doc.text(group.location, pageWidth - margin, yPos, { align: "right" });

    yPos += 6;

    group.roles.forEach((role) => {
      checkNewPage(15);

      // Role Title
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...primaryColor);
      doc.text(role.title, margin, yPos);

      // Period (Right aligned)
      doc.setFont("helvetica", "italic");
      doc.setTextColor(...lightGray);
      doc.text(role.period, pageWidth - margin, yPos, { align: "right" });

      yPos += 6;

      // Responsibilities
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...darkGray);

      role.responsibilities.forEach((resp) => {
        checkNewPage(6);

        // Bullet point
        doc.text("•", margin + 2, yPos);

        const respLines = doc.splitTextToSize(resp, pageWidth - 2 * margin - 8);
        respLines.forEach((line: string, index: number) => {
          if (index > 0) checkNewPage(5);
          doc.text(line, margin + 6, yPos);
          yPos += 4.5;
        });
        yPos += 1; // Extra spacing between bullets
      });

      // Technologies used in this role
      if (role.skills.length > 0) {
        checkNewPage(6);
        yPos += 1;
        doc.setFontSize(8);
        doc.setTextColor(...lightGray);
        doc.setFont("helvetica", "italic");
        const techText = `Tech Stack: ${role.skills.join(" • ")}`;

        const techLines = doc.splitTextToSize(techText, pageWidth - 2 * margin - 6);
        techLines.forEach((line: string) => {
          doc.text(line, margin + 6, yPos);
          yPos += 4;
        });
      }

      yPos += 6; // Spacing between roles
    });

    yPos += 2; // Spacing between companies
  });

  // --- EDUCATION ---
  if (data.education && data.education.length > 0) {
    addSectionHeader("Education");

    data.education.forEach((edu) => {
      checkNewPage(12);

      // Degree
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...darkGray);
      doc.text(edu.degree, margin, yPos);

      // Year (Right aligned)
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...lightGray);
      doc.text(edu.graduationYear, pageWidth - margin, yPos, { align: "right" });

      yPos += 5;

      // Institution
      doc.setFontSize(10);
      doc.setTextColor(...darkGray);
      doc.text(`${edu.institution}, ${edu.location}`, margin, yPos);

      yPos += 8;
    });
  }

  // --- CERTIFICATIONS ---
  if (data.certificates.length > 0) {
    addSectionHeader("Certifications");

    data.certificates.forEach((cert) => {
      checkNewPage(6);

      doc.setFontSize(9);
      doc.setTextColor(...primaryColor);
      doc.textWithLink(cert.name, margin, yPos, { url: cert.url });

      yPos += 6;
    });
  }

  // Footer (Page Numbers)
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(...lightGray);
    doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, pageHeight - 10, { align: "center" });
  }

  // Save
  doc.save(`${data.personalInfo.name.replace(/\s+/g, "_")}_Resume.pdf`);
}
