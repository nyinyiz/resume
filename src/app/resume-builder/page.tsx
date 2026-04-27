import type { Metadata } from "next";
import ResumeBuilderPage from "./ResumeBuilderPage";

export const metadata: Metadata = {
  title: "Resume Builder",
  description: "Edit resume content and preview downloadable PDF templates.",
};

export default function ResumeBuilderRoute() {
  return <ResumeBuilderPage />;
}
