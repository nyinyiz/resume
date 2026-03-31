"use client";

import { motion } from "framer-motion";
import { ExternalLink, Clock, Calendar, BookOpen, PenLine, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const MEDIUM_PROFILE_URL = "https://medium.com/@nyinyizaw.dev";

interface Article {
  title: string;
  description: string;
  url: string;
  date: string;
  readTime: string;
  source: string;
}

const articles: Article[] = [
  {
    title: "Running a Local LLM on an Old Phone",
    description: "How I turned a retired Huawei nova 7i into a full AI edge server — local LLM inference, API gateway, and monitoring dashboard — all at zero cost.",
    url: "/articles/local-llm-old-phone",
    date: "Feb 2025",
    readTime: "6 min read",
    source: "Blog"
  },
  {
    title: "Early Stage of My Developer Life",
    description: "အသိတစ်ယောက်က CDM ကလေးတွေစာသင်ပေးရင်းနဲ့ ကလေးတွေကို moti ပေးချင်လို့ code စရေးတုန်းက ကြုံခဲ့ရတဲ့အခက်ခဲတွေ ဘယ်လိုတွေ ဖြတ်ကျော်ခဲ့လဲဆိုတာနဲ့ ဘယ်လို အခက်ခဲတွေကျော်လွှားခဲ့လဲဆိုတာ ပြောပြပေးဖို့ လာပြောရင်းနဲ့ ကျွန်တော့် early developer life အကြောင်းပြန်တွေးမိတာလေးချရေးထားတာ။",
    url: "https://medium.com/@nyinyizaw.dev/early-stage-of-my-developer-life-c87b13875bd5",
    date: "Jun 25, 2024",
    readTime: "2 min read",
    source: "Medium"
  },
  {
    title: "5 Paid Subscriptions That Supercharge My Software Engineering Productivity",
    description: "As a software engineer specializing in Android development, my job is about writing code, solving problems, and always learning. It's…",
    url: "https://medium.com/@nyinyizaw.dev/5-paid-subscriptions-that-supercharge-my-software-engineering-productivity-20d910141831",
    date: "Jan 30, 2024",
    readTime: "3 min read",
    source: "Medium"
  },
  {
    title: "Custodial & Non-Custodial Wallets ဆိုတာဘာလဲ / ဘယ်လိုရွေးရမလဲ",
    description: "အလုပ်မှာ Manager နဲ့ meeting ထိုင်ရင်း သူပြောသွားတဲ့ထဲမှာ Custodial ဆိုတဲ့ keyword ကို mentioned သွားတာသတိထားမိလိုက်တယ်။ အဲ့ဒါနဲ့ လိုက်ရှာဖတ်ရင်းနဲ့မှ နောက်တစ်နေ့ Blockchain ဘက်ကိုင်တဲ့ BE အကိုတစ်ယောက်နဲ့ ဆွေးနွေးဖြစ်တာလေး (ဆွေးနွေးတယ်ဆိုပေမယ့် သူကဖြေ ကိုယ်ကမေးတဲ့သဘောပါပဲ) ကိုယ်ကိုတိုင် မှတ်မိဖို့နဲ့ နားလည်ထားတာကို article တစ်ခုရေးမယ်လို့ ချရေး လိုက်တာ။",
    url: "https://medium.com/@nyinyizaw.dev/custodial-non-custodial-wallets-ဆိုတာဘာလဲ-ဘယ်လိုရွေးရမလဲ-ca6b44206f86",
    date: "Oct 4, 2023",
    readTime: "3 min read",
    source: "Medium"
  },
  {
    title: "Simplifying Authentication in Kotlin with Auth0's WebAuthProvider",
    description: "In today's digital world, security is one of utmost importance, and at the core of security is user authentication. In this article, we will explore how to leverage Auth0's WebAuthProvider in Kotlin to streamline the authentication process.",
    url: "https://medium.com/@nyinyizaw.dev/simplifying-authentication-in-kotlin-with-auth0s-webauthprovider-92ffbc3060ca",
    date: "Sep 27, 2023",
    readTime: "6 min read",
    source: "Medium"
  },
];

export default function MediumArticles() {
  return (
    <section className="w-full flex flex-col relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-left mb-4 w-full"
      >
        <p className="section-label mb-2">
          <BookOpen size={12} />
          Writing
        </p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tighter text-foreground mb-2">
          Articles & Thoughts
        </h2>
        <p className="text-foreground/50 text-sm max-w-2xl">
          Ideas and lessons from 10+ years of building mobile products.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {articles.map((article, index) => {
          const isExternal = article.url.startsWith("http");
          const isShared = index < 4;
          return (
            <motion.div
              key={index}
              {...(isShared
                ? {
                    layoutId: `skill-card-${index}`,
                    layout: true,
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    transition: {
                      layout: { type: "spring", stiffness: 200, damping: 26 },
                      duration: 0.4, delay: index * 0.05,
                    },
                  }
                : {
                    initial: { opacity: 0, y: 16 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.5, delay: 0.3 },
                  })}
              className="h-full"
            >
              <Link
                href={article.url}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="glass-card p-4 md:p-5 flex flex-col h-full group relative overflow-hidden block"
              >
                {/* Hover gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-3 gap-4">
                    <div className="flex-shrink-0">
                      {article.source === "Medium" ? (
                        <div className="flex items-center gap-2 bg-foreground/5 backdrop-blur-md border border-foreground/10 px-3 py-1.5 rounded-full">
                          <div className="w-4 h-4 relative">
                            <Image
                              src="/medium-logo.svg"
                              alt="Medium"
                              fill
                              className="object-contain dark:invert"
                            />
                          </div>
                          <span className="text-xs font-semibold tracking-wide">
                            {article.source}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-3 py-1.5 rounded-full">
                          <PenLine className="w-4 h-4" />
                          <span className="text-xs font-semibold tracking-wide">
                            {article.source}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 flex-shrink-0">
                      {isExternal ? (
                        <ExternalLink className="w-4 h-4" />
                      ) : (
                        <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                      )}
                    </div>
                  </div>

                  <h3 className="text-lg md:text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-xs md:text-sm mb-4 line-clamp-3 flex-grow">
                    {article.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs md:text-sm font-medium text-muted-foreground mt-auto pt-4 border-t border-foreground/5">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-primary/70" />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-primary/70" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-4 w-full"
      >
        <Link
          href={MEDIUM_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-card p-4 md:p-5 flex flex-col sm:flex-row items-center justify-between gap-6 group hover:border-primary/50 transition-all duration-500"
        >
          <div className="flex items-center gap-6">
            <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center group-hover:bg-foreground/10 transition-colors shrink-0">
              <div className="w-5 h-5 relative">
                <Image
                  src="/medium-logo.svg"
                  alt="Medium"
                  fill
                  className="object-contain dark:invert"
                />
              </div>
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-bold mb-1">More on Medium</h3>
              <p className="text-muted-foreground text-sm">
                Discover all my articles and stories
              </p>
            </div>
          </div>
          
          <div className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold flex items-center gap-2 group-hover:gap-3 transition-all duration-300 whitespace-nowrap">
            Visit Profile
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>
      </motion.div>
    </section>
  );
}