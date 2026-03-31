import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";
import MainWrapper from "@/components/MainWrapper";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit"
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans"
});

export const metadata = {
  metadataBase: new URL('https://nyinyizaw.dev'),
  title: {
    default: 'Nyi Nyi Zaw — Lead Mobile Engineer',
    template: '%s | Nyi Nyi Zaw',
  },
  description: 'Lead Mobile Engineer with 10+ years of experience building high-performance Android and iOS apps across fintech, healthcare, and EdTech.',
  keywords: ['mobile engineer', 'android', 'ios', 'kotlin', 'flutter', 'react native', 'bangkok', 'thailand'],
  authors: [{ name: 'Nyi Nyi Zaw' }],
  creator: 'Nyi Nyi Zaw',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nyinyizaw.dev',
    siteName: 'Nyi Nyi Zaw',
    title: 'Nyi Nyi Zaw — Lead Mobile Engineer',
    description: 'Lead Mobile Engineer with 10+ years building high-performance Android and iOS apps across fintech, healthcare, and EdTech.',
    images: [
      {
        url: '/my_profile.jpg',
        width: 800,
        height: 800,
        alt: 'Nyi Nyi Zaw — Lead Mobile Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nyi Nyi Zaw — Lead Mobile Engineer',
    description: 'Lead Mobile Engineer with 10+ years building high-performance mobile apps.',
    images: ['/my_profile.jpg'],
    creator: '@nyinyizaw',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${outfit.variable} ${plusJakartaSans.variable}`}>
      <body className={`${plusJakartaSans.className} antialiased bg-background text-foreground selection:bg-primary/30 selection:text-primary`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col overflow-hidden">
            <AnimatedBackground />

            <Navbar />
            <MainWrapper>{children}</MainWrapper>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
} 