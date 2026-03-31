import { Metadata } from "next";
import ArticleClient from "./ArticleClient";

export const metadata: Metadata = {
  title: "Running a Local LLM on an Old Phone | Nyi Nyi Zaw",
  description: "Learn how to turn a retired Huawei nova 7i into a full AI edge server with local inference, automated reporting, and real-time monitoring.",
  openGraph: {
    title: "Running a Local LLM on an Old Phone",
    description: "A deep dive into repurposing retired mobile hardware for private, local AI inference.",
    type: "article",
    publishedTime: "2025-02-27",
    authors: ["Nyi Nyi Zaw"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Local LLM on an Old Phone",
    description: "Turning e-waste into an AI edge server.",
  }
};

export default function LocalLLMArticlePage() {
  return <ArticleClient />;
}
