import type { Metadata } from "next";
import HireMePage from "./HireMePage";

export const metadata: Metadata = {
  title: "Work With Me",
  description:
    "Hire Nyi Nyi Zaw — Lead Mobile Engineer. Download the AI skill config or paste a job description to see how well I fit your role.",
};

export default function HireRoute() {
  return <HireMePage />;
}
