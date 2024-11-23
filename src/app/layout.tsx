import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Nyi Nyi Zaw - Senior Android Engineer',
  description: 'Android Engineer with 7+ years of experience specializing in Kotlin, Flutter, and mobile development.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="px-4 sm:px-8 lg:px-16">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
} 