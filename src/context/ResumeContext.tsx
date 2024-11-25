import { createContext, useContext } from 'react';
import { resumeData as defaultResumeData } from '@/data/resume';

export const ResumeContext = createContext(defaultResumeData);

export const useResume = () => {
  return useContext(ResumeContext);
} 