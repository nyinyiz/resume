import { describe, expect, it } from "vitest";
import { analyzeJD, detectGibberish } from "../src/features/hire/lib/jdMatcher";

describe("JD matcher", () => {
  it("finds strong mobile matches", () => {
    const result = analyzeJD(
      "Senior Android engineer needed with Kotlin, Jetpack Compose, REST APIs, CI/CD, and Firebase."
    );

    expect(result.perfectMatch.map((item) => item.display)).toEqual(
      expect.arrayContaining([
        "Android Development",
        "Kotlin",
        "Jetpack Compose",
        "REST APIs",
        "CI/CD",
        "Firebase",
      ])
    );
    expect(result.score).toBeGreaterThanOrEqual(90);
  });

  it("classifies adjacent leadership and architecture skills", () => {
    const result = analyzeJD(
      "We need a mobile architect with leadership, technical strategy, hiring, and cross-platform experience."
    );

    expect(result.canDo.map((item) => item.display)).toEqual(
      expect.arrayContaining([
        "Mobile Architect",
        "Engineering Leadership",
        "Technical Strategy",
        "Technical Hiring",
        "Cross-Platform Mobile",
      ])
    );
  });

  it("classifies learnable backend and cloud skills", () => {
    const result = analyzeJD(
      "Backend platform role using Go, Kubernetes, PostgreSQL, Redis, and GraphQL."
    );

    expect(result.canLearn.map((item) => item.display)).toEqual(
      expect.arrayContaining([
        "Go / Golang",
        "Kubernetes",
        "PostgreSQL",
        "Redis",
        "GraphQL",
      ])
    );
  });

  it("penalizes out-of-scope requirements", () => {
    const result = analyzeJD(
      "Hospital role requiring nursing, brain surgery, legal practice, and accounting."
    );

    expect(result.outOfScope.map((item) => item.display)).toEqual(
      expect.arrayContaining(["Nursing", "Brain Surgery", "Accounting"])
    );
    expect(result.score).toBeLessThanOrEqual(20);
  });

  it("rejects obvious test input", () => {
    expect(detectGibberish("asdf")).toBeTruthy();
    expect(detectGibberish("hello test foo bar")).toBeTruthy();
  });
});
