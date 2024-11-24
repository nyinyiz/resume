import type { ResumeData } from "@/types";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

type TemplateId = 'modern' | 'classic' | 'minimal';

const TEMPLATES: Record<TemplateId, (doc: jsPDF, data: ResumeData) => void> = {
  modern: generateModernTemplate,
  classic: generateClassicTemplate,
  minimal: generateMinimalTemplate,
};

export async function generatePDF(data: ResumeData, template: TemplateId = 'modern'): Promise<string> {
  const doc = new jsPDF();
  
  // Apply the selected template
  TEMPLATES[template](doc, data);
  
  return doc.output('dataurlstring');
}

function generateModernTemplate(doc: jsPDF, data: ResumeData) {
  const pageWidth = doc.internal.pageSize.width;
  const margin = 20;
  let yPos = margin;

  // Header Section with Profile
  doc.setFontSize(24);
  doc.text(`Hi, I'm ${data.personalInfo.name}`, margin, yPos);
  yPos += 10;

  doc.setFontSize(16);
  doc.setTextColor(100, 100, 100);
  doc.text(data.personalInfo.title, margin, yPos);
  yPos += 15;

  // Summary
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  const summaryLines = doc.splitTextToSize(data.personalInfo.summary, pageWidth - 2 * margin);
  doc.text(summaryLines, margin, yPos);
  yPos += summaryLines.length * 7 + 10;

  // Contact Info in three columns with better spacing
  doc.setFontSize(10);
  
  // Location and Email (First Row)
  doc.setTextColor(100, 100, 100);
  doc.text("Location", margin, yPos);
  doc.setTextColor(0, 0, 0);
  doc.text(data.personalInfo.location, margin, yPos + 5);
  
  doc.setTextColor(100, 100, 100);
  doc.text("Email", margin, yPos + 15);
  doc.setTextColor(0, 0, 0);
  doc.text(data.personalInfo.email, margin, yPos + 20);
  
  // Social Links (Second Row)
  yPos += 35;
  doc.setTextColor(100, 100, 100);
  doc.text("GitHub", margin, yPos);
  doc.setTextColor(0, 0, 255);
  doc.textWithLink(data.personalInfo.github, margin, yPos + 5, { 
    url: data.personalInfo.github 
  });
  
  doc.setTextColor(100, 100, 100);
  doc.text("LinkedIn", margin, yPos + 15);
  doc.setTextColor(0, 0, 255);
  doc.textWithLink(data.personalInfo.linkedin, margin, yPos + 20, { 
    url: data.personalInfo.linkedin 
  });
  
  yPos += 35;

  // Education Section
  doc.setFontSize(18);
  doc.setTextColor(0, 0, 0);
  doc.text("Education", pageWidth / 2, yPos, { align: 'center' });
  yPos += 20;

  data.education.forEach(edu => {
    // Institution and Year
    doc.setFontSize(14);
    doc.text(edu.institution, margin, yPos);
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(edu.graduationYear, pageWidth - margin, yPos, { align: 'right' });
    yPos += 8;

    // Degree and Location
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`${edu.degree} in ${edu.field}`, margin, yPos);
    doc.setTextColor(100, 100, 100);
    doc.text(edu.location, pageWidth - margin, yPos, { align: 'right' });
    yPos += 8;

    // GPA if available
    if (edu.gpa) {
      doc.setFontSize(10);
      doc.text(`GPA: ${edu.gpa}`, margin, yPos);
      yPos += 6;
    }

    // Relevant Courses if available
    if (edu.relevantCourses && edu.relevantCourses.length > 0) {
      doc.setFontSize(10);
      doc.text('Relevant Coursework:', margin, yPos);
      yPos += 6;
      const coursesText = edu.relevantCourses.join(', ');
      const courseLines = doc.splitTextToSize(coursesText, pageWidth - 2 * margin - 10);
      doc.text(courseLines, margin + 5, yPos);
      yPos += courseLines.length * 6;
    }

    yPos += 15;
  });

  // Add a page break if needed
  if (yPos > doc.internal.pageSize.height - 60) {
    doc.addPage();
    yPos = margin;
  }

  // Experience Section
  doc.setFontSize(18);
  doc.setTextColor(0, 0, 0);
  doc.text("Experience", pageWidth / 2, yPos, { align: 'center' });
  yPos += 20;

  data.experience.forEach((exp, index) => {
    // Calculate total height needed for this experience entry
    const responsibilityHeight = exp.responsibilities.reduce((total, resp) => {
      const lines = doc.splitTextToSize(resp, pageWidth - 2 * margin - 10);
      return total + lines.length * 6;
    }, 0);

    // Add height for title, company, location, and skills
    const totalEntryHeight = responsibilityHeight + 50; // 50 pixels for headers and spacing

    // Check if we need a new page before starting this experience entry
    if (yPos + totalEntryHeight > doc.internal.pageSize.height - 40) {
      doc.addPage();
      yPos = margin;
    }

    // Company and Period
    doc.setFontSize(14);
    doc.text(exp.company, margin, yPos);
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(exp.period, pageWidth - margin, yPos, { align: 'right' });
    yPos += 8;

    // Title and Location
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(exp.title, margin, yPos);
    doc.setTextColor(100, 100, 100);
    doc.text(exp.location, pageWidth - margin, yPos, { align: 'right' });
    yPos += 10;

    // Responsibilities
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    exp.responsibilities.forEach(resp => {
      doc.text("•", margin, yPos);
      const respLines = doc.splitTextToSize(resp, pageWidth - 2 * margin - 10);
      doc.text(respLines, margin + 5, yPos);
      yPos += respLines.length * 6;
    });

    // Skills with background
    doc.setFillColor(245, 245, 245);
    const skillsText = exp.skills.join(" • ");
    doc.roundedRect(margin, yPos, pageWidth - 2 * margin, 8, 2, 2, 'F');
    doc.text(skillsText, margin + 5, yPos + 5);
    yPos += 20;
  });

  // Check for new page before Projects
  if (yPos > doc.internal.pageSize.height - 60) {
    doc.addPage();
    yPos = margin;
  }

  // Projects Section
  doc.setFontSize(18);
  doc.setTextColor(0, 0, 0);
  doc.text("Notable Projects", pageWidth / 2, yPos, { align: 'center' });
  yPos += 15;

  // Create project grid (2 columns)
  const projectWidth = (pageWidth - 2 * margin - 10) / 2;
  for (let i = 0; i < data.projects.length; i += 2) {
    const row = data.projects.slice(i, i + 2);
    row.forEach((project, index) => {
      const xPos = margin + index * (projectWidth + 10);
      
      // Project box with background
      doc.setFillColor(245, 245, 245);
      doc.roundedRect(xPos, yPos, projectWidth, 40, 2, 2, 'F');
      
      // Project content
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(project.name, xPos + 5, yPos + 10);
      
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      const descLines = doc.splitTextToSize(project.description, projectWidth - 10);
      doc.text(descLines, xPos + 5, yPos + 20);
    });
    yPos += 50;
  }

  // Check for new page before Skills
  if (yPos > doc.internal.pageSize.height - 60) {
    doc.addPage();
    yPos = margin;
  }

  // Community Contributions
  if (data.communityContributions.length > 0) {
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text("Community Contributions", pageWidth / 2, yPos, { align: 'center' });
    yPos += 15;

    data.communityContributions.forEach(contribution => {
      doc.setFillColor(245, 245, 245);
      doc.roundedRect(margin, yPos, pageWidth - 2 * margin, 30, 2, 2, 'F');
      
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(contribution.event, margin + 5, yPos + 10);
      
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      if (contribution.organization) {
        doc.text(contribution.organization, margin + 5, yPos + 20);
      }
      doc.text(contribution.topic, margin + 5, yPos + (contribution.organization ? 25 : 20));
      
      yPos += 40;
    });
  }

  // Certificates
  if (data.certificates.length > 0) {
    if (yPos > doc.internal.pageSize.height - 60) {
      doc.addPage();
      yPos = margin;
    }

    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text("Certificates", pageWidth / 2, yPos, { align: 'center' });
    yPos += 15;

    data.certificates.forEach(cert => {
      doc.setFillColor(245, 245, 245);
      doc.roundedRect(margin, yPos, pageWidth - 2 * margin, 25, 2, 2, 'F');
      
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(cert.name, margin + 5, yPos + 10);
      
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 255);
      doc.textWithLink(cert.url, margin + 5, yPos + 20, { url: cert.url });
      
      yPos += 35;
    });
  }
}

function generateMinimalTemplate(doc: jsPDF, data: ResumeData) {
  const pageWidth = doc.internal.pageSize.width;
  const margin = 20;
  let yPos = margin;

  // Name and Title
  doc.setFontSize(28);
  doc.text(data.personalInfo.name, margin, yPos);
  yPos += 15;

  doc.setFontSize(14);
  doc.setTextColor(100, 100, 100);
  doc.text(data.personalInfo.title, margin, yPos);
  yPos += 20;

  // Contact Info in two columns
  doc.setFontSize(10);
  const leftContacts = [
    `${data.personalInfo.email}`,
    `${data.personalInfo.phone}`
  ];
  const rightContacts = [
    `${data.personalInfo.location}`,
    `${data.personalInfo.github}`
  ];
  
  leftContacts.forEach((contact, index) => {
    doc.text(contact, margin, yPos + (index * 6));
  });
  rightContacts.forEach((contact, index) => {
    doc.text(contact, pageWidth / 2, yPos + (index * 6));
  });
  yPos += 20;

  // Horizontal line
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 15;

  // Summary
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  const summaryLines = doc.splitTextToSize(data.personalInfo.summary, pageWidth - 2 * margin);
  doc.text(summaryLines, margin, yPos);
  yPos += summaryLines.length * 7 + 15;

  // Education Section
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text("Education", margin, yPos);
  yPos += 10;

  data.education.forEach(edu => {
    // Institution and Graduation Year
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(edu.institution, margin, yPos);
    doc.setTextColor(100, 100, 100);
    doc.text(edu.graduationYear, pageWidth - margin, yPos, { align: 'right' });
    yPos += 6;

    // Degree and Field
    doc.setTextColor(0, 0, 0);
    doc.text(`${edu.degree} in ${edu.field}`, margin, yPos);
    doc.setTextColor(100, 100, 100);
    doc.text(edu.location, pageWidth - margin, yPos, { align: 'right' });
    yPos += 8;

    // GPA and Courses
    if (edu.gpa || (edu.relevantCourses && edu.relevantCourses.length > 0)) {
      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      
      if (edu.gpa) {
        doc.text(`GPA: ${edu.gpa}`, margin + 5, yPos);
        yPos += 6;
      }

      if (edu.relevantCourses && edu.relevantCourses.length > 0) {
        doc.text('Relevant Coursework:', margin + 5, yPos);
        yPos += 6;
        const coursesText = edu.relevantCourses.join(' • ');
        const courseLines = doc.splitTextToSize(coursesText, pageWidth - 2 * margin - 15);
        doc.text(courseLines, margin + 10, yPos);
        yPos += courseLines.length * 6;
      }
    }

    yPos += 15;
  });

  // Add a horizontal line after education
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, yPos - 5, pageWidth - margin, yPos - 5);
  yPos += 15;

  // Experience Section
  doc.setFontSize(14);
  doc.text("Experience", margin, yPos);
  yPos += 10;

  data.experience.forEach((exp, index) => {
    // Check if we need a new page
    if (yPos > doc.internal.pageSize.height - 100) {
      doc.addPage();
      yPos = margin;
    }

    // Title and Period
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(exp.title, margin, yPos);
    doc.setTextColor(100, 100, 100);
    doc.text(exp.period, pageWidth - margin, yPos, { align: 'right' });
    yPos += 6;

    // Company and Location
    doc.setTextColor(0, 0, 0);
    doc.text(exp.company, margin, yPos);
    doc.setTextColor(100, 100, 100);
    doc.text(exp.location, pageWidth - margin, yPos, { align: 'right' });
    yPos += 8;

    // Calculate height needed for responsibilities
    const responsibilityHeight = exp.responsibilities.reduce((total, resp) => {
      const lines = doc.splitTextToSize(resp, pageWidth - 2 * margin - 10);
      return total + lines.length * 6;
    }, 0);

    // Check if we need a new page for responsibilities
    if (yPos + responsibilityHeight > doc.internal.pageSize.height - 40) {
      doc.addPage();
      yPos = margin;
    }

    // Responsibilities
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    exp.responsibilities.forEach(resp => {
      doc.text(`• ${resp}`, margin + 5, yPos);
      yPos += 6;
    });

    // Skills
    if (yPos + 15 > doc.internal.pageSize.height - 20) {
      doc.addPage();
      yPos = margin;
    }

    doc.setTextColor(100, 100, 100);
    const skillsText = exp.skills.join(" · ");
    const skillsLines = doc.splitTextToSize(skillsText, pageWidth - 2 * margin - 10);
    doc.text(skillsLines, margin + 5, yPos);
    yPos += skillsLines.length * 6 + 15;
  });

  // Check for new page
  if (yPos > doc.internal.pageSize.height - 60) {
    doc.addPage();
    yPos = margin;
  }

  // Projects Section
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text("Notable Projects", margin, yPos);
  yPos += 10;

  data.projects.forEach(project => {
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(project.name, margin, yPos);
    yPos += 6;

    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    const descLines = doc.splitTextToSize(project.description, pageWidth - 2 * margin - 10);
    doc.text(descLines, margin + 5, yPos);
    yPos += descLines.length * 6 + 10;
  });

  // Check for new page
  if (yPos > doc.internal.pageSize.height - 60) {
    doc.addPage();
    yPos = margin;
  }

  // Community Contributions
  if (data.communityContributions.length > 0) {
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("Community Contributions", margin, yPos);
    yPos += 10;

    data.communityContributions.forEach(contribution => {
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(contribution.event, margin, yPos);
      yPos += 6;

      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      if (contribution.organization) {
        doc.text(contribution.organization, margin + 5, yPos);
        yPos += 5;
      }
      doc.text(contribution.topic, margin + 5, yPos);
      yPos += 10;
    });
  }

  // Check for new page
  if (yPos > doc.internal.pageSize.height - 60) {
    doc.addPage();
    yPos = margin;
  }

  // Certificates
  if (data.certificates.length > 0) {
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("Certificates", margin, yPos);
    yPos += 10;

    data.certificates.forEach(cert => {
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(cert.name, margin, yPos);
      yPos += 6;

      doc.setFontSize(10);
      doc.setTextColor(0, 0, 255);
      doc.textWithLink(cert.url, margin + 5, yPos, { url: cert.url });
      yPos += 12;
    });
  }

  // Add page numbers
  const pageCount = (doc as any).internal.pages.length - 1;
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Page ${i} of ${pageCount}`,
      doc.internal.pageSize.width / 2,
      doc.internal.pageSize.height - 10,
      { align: 'center' }
    );
  }
}

function generateClassicTemplate(doc: jsPDF, data: ResumeData) {
  const pageWidth = doc.internal.pageSize.width;
  const margin = 25;
  let yPos = margin;

  // Name
  doc.setFontSize(24);
  doc.setTextColor(0, 0, 0);
  doc.text(data.personalInfo.name, pageWidth / 2, yPos, { align: 'center' });
  yPos += 10;

  // Contact Info Line
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  const contactInfo = [
    data.personalInfo.location,
    data.personalInfo.phone,
    data.personalInfo.email
  ];
  doc.text(contactInfo.join(' • '), pageWidth / 2, yPos, { align: 'center' });
  yPos += 15;

  // Section Divider
  function addSectionDivider(title: string) {
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(title.toUpperCase(), margin, yPos);
    yPos += 5;
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 10;
  }

  // Education Section
  addSectionDivider('Education');
  
  data.education.forEach(edu => {
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    // Institution Name and Location
    doc.text(edu.institution, margin, yPos);
    doc.text(edu.location, pageWidth - margin, yPos, { align: 'right' });
    yPos += 5;
    
    // Degree Details
    doc.setTextColor(60, 60, 60);
    doc.text(`${edu.degree} in ${edu.field}`, margin, yPos);
    doc.text(edu.graduationYear, pageWidth - margin, yPos, { align: 'right' });
    yPos += 5;
    
    // GPA if available
    if (edu.gpa) {
      doc.text(`GPA: ${edu.gpa}`, margin, yPos);
      yPos += 5;
    }
    
    // Relevant Courses if available
    if (edu.relevantCourses && edu.relevantCourses.length > 0) {
      doc.text('Relevant coursework: ' + edu.relevantCourses.join(', '), margin, yPos);
      yPos += 15;
    }
  });

  // Experience Section
  addSectionDivider('Experience');

  data.experience.forEach(exp => {
    // Job Title
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text(exp.title, margin, yPos);
    doc.text(exp.location, pageWidth - margin, yPos, { align: 'right' });
    yPos += 5;

    // Company and Dates
    doc.setTextColor(60, 60, 60);
    doc.text(exp.company, margin, yPos);
    doc.text(exp.period, pageWidth - margin, yPos, { align: 'right' });
    yPos += 8;

    // Responsibilities
    doc.setFontSize(10);
    exp.responsibilities.forEach(resp => {
      doc.text('•', margin, yPos);
      const respLines = doc.splitTextToSize(resp, pageWidth - 2 * margin - 8);
      doc.text(respLines, margin + 8, yPos);
      yPos += respLines.length * 5;
    });
    yPos += 8;
  });

  // Projects Section (changed from 'University Projects')
  addSectionDivider('Notable Projects');
  
  data.projects.forEach(project => {
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text(project.name, margin, yPos);
    yPos += 5;
    
    // Project details
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    doc.text('• Description: ' + project.description, margin + 8, yPos);
    yPos += 5;
    doc.text('• Role: Your specific role or contribution to the project.', margin + 8, yPos);
    yPos += 5;
    doc.text('• Technologies Used: Any tools, software, or programming languages utilized.', margin + 8, yPos);
    yPos += 5;
    doc.text('• Outcome: Results achieved or lessons learned from the project.', margin + 8, yPos);
    yPos += 12;
  });

  // Community Contributions Section (changed from 'Activities')
  addSectionDivider('Community Contributions');
  
  data.communityContributions.forEach(contribution => {
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text(contribution.event, margin, yPos);
    yPos += 5;
    
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    doc.text('• Description: ' + contribution.topic, margin + 8, yPos);
    yPos += 5;
    if (contribution.organization) {
      doc.text('• Organization: ' + contribution.organization, margin + 8, yPos);
      yPos += 5;
    }
    yPos += 12;
  });

  // Additional Section
  addSectionDivider('Additional');
  
  // Language Skills
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text('Language Skills:', margin, yPos);
  doc.setTextColor(60, 60, 60);
  doc.text('[List any languages you speak fluently or proficiently.]', margin + 80, yPos);
  yPos += 8;

  // Technical Skills
  doc.setTextColor(0, 0, 0);
  doc.text('Technical Skills:', margin, yPos);
  doc.setTextColor(60, 60, 60);
  const technicalSkills = data.experience[0].skills.join(', ');
  const skillsLines = doc.splitTextToSize(technicalSkills, pageWidth - margin - 80);
  doc.text(skillsLines, margin + 80, yPos);
  yPos += skillsLines.length * 5 + 8;

  // Volunteer Experience
  doc.setTextColor(0, 0, 0);
  doc.text('Volunteer Experience:', margin, yPos);
  doc.setTextColor(60, 60, 60);
  doc.text('[Briefly mention any volunteer work you\'ve done, highlighting skills or experiences gained.]', margin + 80, yPos);
  yPos += 8;

  // Interests/Hobbies
  doc.setTextColor(0, 0, 0);
  doc.text('Interests/Hobbies:', margin, yPos);
  doc.setTextColor(60, 60, 60);
  doc.text('[Include any interests or hobbies that demonstrate relevant skills or qualities.]', margin + 80, yPos);
  yPos += 15;
} 