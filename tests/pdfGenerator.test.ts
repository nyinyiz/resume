import { describe, expect, it } from "vitest";
import { generatePDF } from "../src/features/resume-builder/lib/pdfGenerator";
import { sampleResume } from "../src/features/resume-builder/lib/sampleResume";
import type { ResumeData } from "../src/types";

// Smoke tests: confirm the jsPDF v4 upgrade still renders each template to a
// valid PDF data URL without throwing (autoTable dependency was removed).
const data = sampleResume as unknown as ResumeData;

describe("generatePDF (jsPDF v4)", () => {
  it.each(["modern", "classic", "minimal"] as const)(
    "renders the %s template to a PDF data URL",
    async (template) => {
      const url = await generatePDF(data, template);
      expect(url.startsWith("data:application/pdf")).toBe(true);
      // Non-trivial payload — a blank/failed doc would be tiny.
      expect(url.length).toBeGreaterThan(2000);
    }
  );
});
