// ─── JD Matcher Engine ────────────────────────────────────────────────────────
// Client-side only. Tokenises a job description and categorises each found
// keyword against Nyi Nyi Zaw's actual resume data.

export type SkillCategory = "perfect" | "adjacent" | "learnable" | "scope";

export interface SkillEntry {
  category: SkillCategory;
  display:  string;
  reason?:  string; // shown for "adjacent" entries
}

export interface MatchResult {
  perfectMatch: SkillEntry[];
  canDo:        SkillEntry[];
  canLearn:     SkillEntry[];
  outOfScope:   SkillEntry[];
  score:        number; // 0–100
}

// ─── Master skill map ─────────────────────────────────────────────────────────
// Keys are normalised lowercase strings that appear as 1-, 2-, or 3-grams
// in the job description.
const SKILL_MAP: Record<string, SkillEntry> = {

  // ── Perfect Match — Mobile ────────────────────────────────────────────────
  kotlin:               { category: "perfect", display: "Kotlin" },
  android:              { category: "perfect", display: "Android Development" },
  "android sdk":        { category: "perfect", display: "Android SDK" },
  "android development":{ category: "perfect", display: "Android Development" },
  "android studio":     { category: "perfect", display: "Android Studio" },
  mobile:               { category: "perfect", display: "Mobile Development" },
  "mobile development": { category: "perfect", display: "Mobile Development" },
  "mobile app":         { category: "perfect", display: "Mobile App Development" },
  "mobile apps":        { category: "perfect", display: "Mobile App Development" },
  "mobile engineer":    { category: "perfect", display: "Mobile Engineering" },
  "mobile engineering": { category: "perfect", display: "Mobile Engineering" },
  "mobile first":       { category: "perfect", display: "Mobile-First" },
  java:                 { category: "perfect", display: "Java" },
  flutter:              { category: "perfect", display: "Flutter" },
  dart:                 { category: "perfect", display: "Dart" },
  ios:                  { category: "perfect", display: "iOS Development" },
  swift:                { category: "perfect", display: "Swift" },
  swiftui:              { category: "perfect", display: "SwiftUI" },
  uikit:                { category: "perfect", display: "UIKit" },
  xcode:                { category: "perfect", display: "Xcode" },
  "core data":          { category: "perfect", display: "Core Data" },
  coredata:             { category: "perfect", display: "Core Data" },
  "app store":          { category: "perfect", display: "App Store Shipping" },
  "push notification":  { category: "perfect", display: "Push Notifications" },
  "push notifications": { category: "perfect", display: "Push Notifications" },
  apns:                 { category: "perfect", display: "APNs" },
  "react native":       { category: "perfect", display: "React Native" },
  reactnative:          { category: "perfect", display: "React Native" },
  expo:                 { category: "perfect", display: "Expo (React Native)" },
  "jetpack compose":    { category: "perfect", display: "Jetpack Compose" },
  compose:              { category: "perfect", display: "Jetpack Compose" },
  coroutines:           { category: "perfect", display: "Kotlin Coroutines" },
  "kotlin coroutines":  { category: "perfect", display: "Kotlin Coroutines" },
  "kotlin flow":        { category: "perfect", display: "Kotlin Flow" },
  hilt:                 { category: "perfect", display: "Hilt (DI)" },
  dagger:               { category: "perfect", display: "Dagger (DI)" },
  "dependency injection":{ category: "perfect", display: "Dependency Injection" },
  room:                 { category: "perfect", display: "Room Database" },
  "room database":      { category: "perfect", display: "Room Database" },
  workmanager:          { category: "perfect", display: "WorkManager (Jetpack)" },
  bluetooth:            { category: "perfect", display: "Bluetooth / BLE" },
  ble:                  { category: "perfect", display: "BLE" },

  // ── Perfect Match — Languages & Web ────────────────────────────────────────
  typescript:           { category: "perfect", display: "TypeScript" },
  javascript:           { category: "perfect", display: "JavaScript" },
  python:               { category: "perfect", display: "Python" },
  nextjs:               { category: "perfect", display: "Next.js" },
  "next.js":            { category: "perfect", display: "Next.js" },
  "spring boot":        { category: "perfect", display: "Spring Boot" },
  springboot:           { category: "perfect", display: "Spring Boot" },

  // ── Perfect Match — Tools & DevOps ─────────────────────────────────────────
  git:                  { category: "perfect", display: "Git" },
  github:               { category: "perfect", display: "GitHub" },
  gitlab:               { category: "perfect", display: "GitLab" },
  bitbucket:            { category: "perfect", display: "Bitbucket" },
  firebase:             { category: "perfect", display: "Firebase" },
  jenkins:              { category: "perfect", display: "Jenkins" },
  jira:                 { category: "perfect", display: "Jira" },
  figma:                { category: "perfect", display: "Figma" },
  "vs code":            { category: "perfect", display: "VS Code" },
  fastlane:             { category: "perfect", display: "Fastlane" },
  "github actions":     { category: "perfect", display: "GitHub Actions" },

  // ── Perfect Match — Architecture & Process ─────────────────────────────────
  mvvm:                 { category: "perfect", display: "MVVM" },
  mvi:                  { category: "perfect", display: "MVI Architecture" },
  mvp:                  { category: "perfect", display: "MVP Pattern" },
  "clean architecture": { category: "perfect", display: "Clean Architecture" },
  solid:                { category: "perfect", display: "SOLID Principles" },
  "cicd":               { category: "perfect", display: "CI/CD" },
  "ci/cd":              { category: "perfect", display: "CI/CD" },
  "continuous integration": { category: "perfect", display: "Continuous Integration" },
  agile:                { category: "perfect", display: "Agile" },
  scrum:                { category: "perfect", display: "Scrum" },
  kanban:               { category: "perfect", display: "Kanban" },
  "unit testing":       { category: "perfect", display: "Unit Testing" },
  "integration testing":{ category: "perfect", display: "Integration Testing" },
  tdd:                  { category: "perfect", display: "Test-Driven Development" },
  "rest api":           { category: "perfect", display: "REST APIs" },
  "rest apis":          { category: "perfect", display: "REST APIs" },
  restful:              { category: "perfect", display: "RESTful APIs" },
  api:                  { category: "perfect", display: "REST APIs" },
  "code review":        { category: "perfect", display: "Code Review" },
  "performance optimization": { category: "perfect", display: "Performance Optimisation" },
  nfc:                  { category: "perfect", display: "NFC Integration" },

  // ── Can Do — Adjacent ──────────────────────────────────────────────────────
  architect:            { category: "adjacent", display: "Mobile Architect", reason: "Architected mobile systems at scale across iOS, Android, and React Native" },
  "mobile architect":   { category: "adjacent", display: "Mobile Architect", reason: "Designed cross-platform mobile architectures for production apps" },
  "technical strategy": { category: "adjacent", display: "Technical Strategy", reason: "Led mobile strategy as Fractional CTO across 3 countries" },
  strategy:             { category: "adjacent", display: "Technical Strategy", reason: "Fractional CTO experience — end-to-end product & tech strategy" },
  cto:                  { category: "adjacent", display: "CTO / Tech Leadership", reason: "Fractional CTO with full-cycle product ownership experience" },
  "fractional cto":     { category: "adjacent", display: "Fractional CTO", reason: "Operated as Fractional CTO for startups across SE Asia" },
  startup:              { category: "adjacent", display: "Startup Experience", reason: "Built products from 0→1 for startups in Thailand, Singapore, Myanmar" },
  mentor:               { category: "adjacent", display: "Mentoring", reason: "Mentored junior engineers and led team upskilling initiatives" },
  mentoring:            { category: "adjacent", display: "Mentoring", reason: "Mentored junior engineers and led team upskilling initiatives" },
  "native modules":     { category: "adjacent", display: "Native Modules (RN)", reason: "Built custom native bridges for React Native projects" },
  "cross platform":     { category: "adjacent", display: "Cross-Platform Mobile", reason: "Flutter + React Native — core expertise" },
  hiring:               { category: "adjacent", display: "Technical Hiring", reason: "Hired and built mobile teams as Fractional CTO and tech lead" },
  react:                { category: "adjacent", display: "React", reason: "Strong React Native background — React is immediately accessible" },
  "vue.js":             { category: "adjacent", display: "Vue.js", reason: "TypeScript & component-model foundation" },
  vuejs:                { category: "adjacent", display: "Vue.js", reason: "TypeScript & component-model foundation" },
  vue:                  { category: "adjacent", display: "Vue.js", reason: "TypeScript & JavaScript expertise" },
  angular:              { category: "adjacent", display: "Angular", reason: "TypeScript expertise transfers directly" },
  svelte:               { category: "adjacent", display: "Svelte", reason: "Component-based UI experience (Flutter, Compose)" },
  "node.js":            { category: "adjacent", display: "Node.js", reason: "Backend exposure via Spring Boot & Firebase Functions" },
  nodejs:               { category: "adjacent", display: "Node.js", reason: "Backend exposure via Spring Boot & Firebase" },
  backend:              { category: "adjacent", display: "Backend Development", reason: "Firebase, REST APIs, Spring Boot (level 2)" },
  "api development":    { category: "adjacent", display: "API Development", reason: "Extensive REST API + Firebase integration experience" },
  "cross-platform":     { category: "adjacent", display: "Cross-Platform Mobile", reason: "Flutter + React Native — core expertise" },
  kmp:                  { category: "adjacent", display: "Kotlin Multiplatform", reason: "Deep Kotlin expertise — KMP is a natural extension" },
  "kotlin multiplatform":{ category: "adjacent", display: "Kotlin Multiplatform", reason: "Kotlin expert" },
  sql:                  { category: "adjacent", display: "SQL / SQLite", reason: "Room database (SQLite wrapper) in production Android apps" },
  sqlite:               { category: "adjacent", display: "SQLite", reason: "Room persistence library experience" },
  leadership:           { category: "adjacent", display: "Engineering Leadership", reason: "Led mobile teams at PassKit, Fractional CTO across 3 countries" },
  "tech lead":          { category: "adjacent", display: "Tech Lead Role", reason: "Technical leadership in multi-discipline teams" },
  "team lead":          { category: "adjacent", display: "Team Lead", reason: "Led cross-functional mobile engineering teams" },
  "engineering manager":{ category: "adjacent", display: "Engineering Manager", reason: "Fractional CTO + senior tech lead experience" },
  "code quality":       { category: "adjacent", display: "Code Quality Culture", reason: "Clean Architecture, SOLID, established team code review processes" },
  "design system":      { category: "adjacent", display: "Design System", reason: "Mobile component libraries + Figma proficiency" },
  ui:                   { category: "adjacent", display: "UI Development", reason: "Jetpack Compose, SwiftUI, Flutter — production-grade mobile UIs" },
  "user interface":     { category: "adjacent", display: "UI Engineering", reason: "Mobile-first UI expertise across platforms" },
  fintech:              { category: "adjacent", display: "Fintech Apps", reason: "Built PassKit loyalty/payments + crypto wallet integrations" },
  healthcare:           { category: "adjacent", display: "Healthcare Apps", reason: "Built healthcare platform at Thonburi Hospital" },
  authentication:       { category: "adjacent", display: "Authentication Systems", reason: "Auth0, biometrics, NFC-based secure access" },
  security:             { category: "adjacent", display: "App Security", reason: "Secure fintech apps, encrypted storage, Auth implementations" },
  "web development":    { category: "adjacent", display: "Web Development", reason: "Next.js + TypeScript portfolio and project experience" },
  oop:                  { category: "adjacent", display: "OOP", reason: "Core paradigm — Kotlin, Java, Dart daily usage" },
  "functional programming": { category: "adjacent", display: "Functional Programming", reason: "Kotlin lambdas, coroutines, Flow, immutable patterns" },
  microservices:        { category: "adjacent", display: "Microservice Consumption", reason: "Consumed microservices via REST APIs extensively" },
  "multi-module":       { category: "adjacent", display: "Multi-module Architecture", reason: "Multi-module Android project architecture experience" },

  // ── Can Learn ─────────────────────────────────────────────────────────────
  go:                   { category: "learnable", display: "Go / Golang" },
  golang:               { category: "learnable", display: "Go / Golang" },
  rust:                 { category: "learnable", display: "Rust" },
  csharp:               { category: "learnable", display: "C#" },
  dotnet:               { category: "learnable", display: ".NET" },
  "c++":                { category: "learnable", display: "C++" },
  cplusplus:            { category: "learnable", display: "C++" },
  ruby:                 { category: "learnable", display: "Ruby" },
  rails:                { category: "learnable", display: "Ruby on Rails" },
  php:                  { category: "learnable", display: "PHP" },
  laravel:              { category: "learnable", display: "Laravel" },
  aws:                  { category: "learnable", display: "AWS" },
  "amazon web services":{ category: "learnable", display: "AWS" },
  gcp:                  { category: "learnable", display: "Google Cloud Platform" },
  "google cloud":       { category: "learnable", display: "Google Cloud" },
  azure:                { category: "learnable", display: "Microsoft Azure" },
  docker:               { category: "learnable", display: "Docker" },
  kubernetes:           { category: "learnable", display: "Kubernetes" },
  k8s:                  { category: "learnable", display: "Kubernetes" },
  terraform:            { category: "learnable", display: "Terraform" },
  ansible:              { category: "learnable", display: "Ansible" },
  graphql:              { category: "learnable", display: "GraphQL" },
  postgresql:           { category: "learnable", display: "PostgreSQL" },
  postgres:             { category: "learnable", display: "PostgreSQL" },
  mysql:                { category: "learnable", display: "MySQL" },
  mongodb:              { category: "learnable", display: "MongoDB" },
  redis:                { category: "learnable", display: "Redis" },
  cassandra:            { category: "learnable", display: "Cassandra" },
  "machine learning":   { category: "learnable", display: "Machine Learning" },
  "deep learning":      { category: "learnable", display: "Deep Learning" },
  llm:                  { category: "learnable", display: "LLM Integration" },
  ai:                   { category: "learnable", display: "AI/ML Development" },
  blockchain:           { category: "learnable", display: "Blockchain" },
  web3:                 { category: "learnable", display: "Web3" },
  solidity:             { category: "learnable", display: "Solidity" },
  devops:               { category: "learnable", display: "DevOps Engineering" },
  kafka:                { category: "learnable", display: "Apache Kafka" },
  elasticsearch:        { category: "learnable", display: "Elasticsearch" },
  nestjs:               { category: "learnable", display: "NestJS" },
  "data science":       { category: "learnable", display: "Data Science" },
  "data engineering":   { category: "learnable", display: "Data Engineering" },
  "computer vision":    { category: "learnable", display: "Computer Vision" },

  // ── Out of Scope ───────────────────────────────────────────────────────────
  "brain surgery":      { category: "scope", display: "Brain Surgery" },
  surgeon:              { category: "scope", display: "Surgery" },
  medical:              { category: "scope", display: "Medical Practice" },
  nursing:              { category: "scope", display: "Nursing" },
  nurse:                { category: "scope", display: "Nursing" },
  lawyer:               { category: "scope", display: "Legal Practice" },
  attorney:             { category: "scope", display: "Attorney / Law" },
  accountant:           { category: "scope", display: "Accounting" },
  accounting:           { category: "scope", display: "Accounting" },
  copywriting:          { category: "scope", display: "Marketing Copywriting" },
  chef:                 { category: "scope", display: "Culinary Arts" },
  cooking:              { category: "scope", display: "Cooking" },
  "mechanical engineering": { category: "scope", display: "Mechanical Engineering" },
  "civil engineering":  { category: "scope", display: "Civil Engineering" },
  aerospace:            { category: "scope", display: "Aerospace Engineering" },
  "graphic design":     { category: "scope", display: "Graphic Design" },
  carpentry:            { category: "scope", display: "Carpentry" },
  plumbing:             { category: "scope", display: "Plumbing" },
};

// ─── Gibberish / easter-egg detection ─────────────────────────────────────────
const FUNNY_REJECTIONS = [
  "Come on now — I know the job market is wild, but that's not a real job description. Paste the real deal!",
  "That's... not a JD. Unless you're hiring a 'random word generator'? Try again with the real thing.",
  "My matching algorithm is more powerful than 'asdf', but not powerful enough to read minds. Real JD please!",
  "404: Job Description Not Found. I scoured every byte of that input and found zero recruitable intent.",
  "Interesting submission. Unfortunately, I only speak fluent JD. Please retry in job-description language.",
];

const TEST_STRINGS = new Set(["test", "hello", "hi", "asdf", "qwerty", "foo", "bar", "baz", "123", "aaa", "abc"]);

export function detectGibberish(input: string): string | null {
  const trimmed = input.trim();

  if (trimmed.length < 30) {
    return FUNNY_REJECTIONS[0];
  }

  const words = trimmed.split(/\s+/).filter(Boolean);

  if (words.length < 5) {
    return FUNNY_REJECTIONS[1];
  }

  // Too many short / repeated words → probably test input
  const uniqueWords = new Set(words.map(w => w.toLowerCase().replace(/[^a-z]/g, "")));
  if (uniqueWords.size <= 3) {
    return FUNNY_REJECTIONS[2];
  }

  // Obvious test strings
  const firstFew = words.slice(0, 4).map(w => w.toLowerCase().replace(/[^a-z]/g, ""));
  if (firstFew.every(w => TEST_STRINGS.has(w))) {
    return FUNNY_REJECTIONS[3];
  }

  // High ratio of non-letter characters → gibberish
  const letterCount = (trimmed.match(/[a-zA-Z]/g) ?? []).length;
  if (letterCount / trimmed.length < 0.45) {
    return FUNNY_REJECTIONS[4];
  }

  return null;
}

// ─── Core matching function ────────────────────────────────────────────────────
export function analyzeJD(rawJD: string): MatchResult {
  // Normalise special tokens before general cleaning
  const normalised = rawJD
    .toLowerCase()
    .replace(/\bc\+\+\b/g, "cplusplus")
    .replace(/\bc#\b/g, "csharp")
    .replace(/\bci\/cd\b/g, "ci/cd")
    .replace(/next\.js/g, "nextjs")
    .replace(/node\.js/g, "nodejs")
    .replace(/vue\.js/g, "vuejs")
    .replace(/\.net\b/g, "dotnet")
    .replace(/[^\w\s/#+\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const words = normalised.split(" ").filter(w => w.length > 1);

  // Build 1-, 2-, and 3-gram candidates
  const candidates: string[] = [...words];
  for (let i = 0; i < words.length - 1; i++) {
    candidates.push(`${words[i]} ${words[i + 1]}`);
  }
  for (let i = 0; i < words.length - 2; i++) {
    candidates.push(`${words[i]} ${words[i + 1]} ${words[i + 2]}`);
  }

  const seen = new Set<string>();
  const perfectMatch: SkillEntry[] = [];
  const canDo:        SkillEntry[] = [];
  const canLearn:     SkillEntry[] = [];
  const outOfScope:   SkillEntry[] = [];

  for (const candidate of candidates) {
    const entry = SKILL_MAP[candidate];
    if (!entry) continue;

    // Deduplicate by display name
    if (seen.has(entry.display)) continue;
    seen.add(entry.display);

    switch (entry.category) {
      case "perfect":  perfectMatch.push(entry); break;
      case "adjacent": canDo.push(entry);        break;
      case "learnable":canLearn.push(entry);     break;
      case "scope":    outOfScope.push(entry);   break;
    }
  }

  // Score: 3 perfect hits → ~60, 4 → ~80, 5+ → ~90–100
  // Adjacent adds up to +15 bonus; out-of-scope penalises hard
  const rawScore =
    perfectMatch.length * 20 +
    Math.min(canDo.length * 5, 15) -
    outOfScope.length * 20;
  const floor = perfectMatch.length > 0 ? 30 : canDo.length > 0 ? 18 : 5;
  const score = perfectMatch.length === 0 && canDo.length === 0 && canLearn.length === 0
    ? 0
    : Math.max(floor, Math.min(100, Math.round(rawScore)));

  return { perfectMatch, canDo, canLearn, outOfScope, score };
}
