import { parsePDFFile } from '@/utils/pdfParser';
import { useState } from 'react';

export default function FileUpload() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleFileUpload(file: File) {
    try {
      setIsLoading(true);
      setError(null);
      
      const parsedText = await parsePDFFile(file);
      console.log('Parsed PDF text:', parsedText);
      
      // Here you can implement the logic to convert the text to your resume format
      
    } catch (error) {
      console.error('Error uploading file:', error);
      setError(error instanceof Error ? error.message : 'Failed to parse PDF file');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept=".pdf"
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