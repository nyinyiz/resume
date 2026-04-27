import { createContext, useContext } from 'react';
import { resumeData as defaultResumeData } from '@/data/resume';
import type { ResumeData } from '@/types';

export const ResumeContext = createContext<ResumeData>(defaultResumeData);

export const useResume = () => {
  return useContext(ResumeContext);
} 
