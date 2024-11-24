import { pdfjs } from 'react-pdf';
import type { ResumeData } from '@/types';

// Initialize worker from CDN with specific version
const PDFJS_WORKER_URL = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
pdfjs.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_URL;

export async function parseResume(file: File): Promise<ResumeData> {
  const fileType = file.type;
  const fileName = file.name.toLowerCase();

  if (fileName.endsWith('.pdf')) {
    return await parsePDF(file);
  } else if (fileName.endsWith('.json')) {
    return await parseJSON(file);
  } else if (fileName.endsWith('.docx')) {
    return await parseDOCX(file);
  }

  throw new Error('Unsupported file format. Please upload a PDF, DOCX, or JSON file.');
}

async function parsePDF(file: File): Promise<ResumeData> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
    
    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + '\n';
    }

    // For now, return a minimal ResumeData structure
    // You can implement more sophisticated parsing later
    return {
      personalInfo: {
        name: '',
        title: '',
        email: '',
        location: '',
        phone: '',
        github: '',
        linkedin: '',
        summary: fullText.substring(0, 500) // First 500 characters as summary
      },
      experience: [],
      projects: [],
      communityContributions: [],
      certificates: []
    };
  } catch (error) {
    console.error('PDF parsing error:', error);
    throw new Error('Failed to parse PDF file. Please make sure it\'s a valid PDF document.');
  }
}

async function parseJSON(file: File): Promise<ResumeData> {
  try {
    const text = await file.text();
    return JSON.parse(text);
  } catch (error) {
    throw new Error('Failed to parse JSON file. Please make sure it\'s a valid JSON document.');
  }
}

async function parseDOCX(file: File): Promise<ResumeData> {
  // Implement DOCX parsing logic here
  throw new Error('DOCX parsing not implemented yet.');
} 