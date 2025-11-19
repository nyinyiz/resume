# Nyi Nyi Zaw - Portfolio

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=white)

A modern, responsive portfolio built with performance and design in mind.

[**🚀 Live Demo**](https://nyinyizaw.vercel.app/)

## ✨ Features

*   **🎨 Modern UI**: Clean, responsive design with dark/light mode.
*   **📄 PDF Resume**: Auto-generated professional PDF resume.
*   **⚡ High Performance**: Built on Next.js App Router.
*   **📱 Responsive**: Optimized for all devices.

## 🛠 Tech Stack

| Category | Technologies |
|----------|--------------|
| **Core** | Next.js 14, TypeScript, React 18 |
| **Styling** | Tailwind CSS, Framer Motion, Lucide Icons |
| **Utils** | jsPDF, html2canvas, zod |
| **DevOps** | Vercel, ESLint, Prettier |

## 🏗 Architecture

```mermaid
graph TD
    User[User] -->|Visits| App[Next.js App]
    App -->|Renders| Pages[Pages & Components]
    App -->|Manages| State[Context & Hooks]
    
    subgraph Features
        Pages -->|Displays| Hero[Hero Section]
        Pages -->|Displays| Exp[Experience]
        Pages -->|Displays| Projects[Projects]
    end
    
    subgraph Utilities
        Hero -->|Generates| PDF[PDF Export]
        PDF -->|Uses| jsPDF[jsPDF Library]
    end
```

## 📂 Project Structure

```
src/
├── app/              # App Router pages & layout
├── components/       # Reusable UI components
├── data/             # Static content (Resume data)
├── lib/              # Utilities (PDF generation, animations)
└── context/          # React Context (Resume state)
```

## 🚀 Getting Started

```bash
# 1. Clone
git clone https://github.com/nyinyiz/resume.git

# 2. Install
npm install

# 3. Run
npm run dev
```

## 📞 Contact

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/nyinyiz)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/nyinyiz)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:nyinyizaw.dev@gmail.com)
