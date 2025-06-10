import { motion } from "framer-motion";
import { ExternalLink, Clock, Calendar, BookOpen } from "lucide-react";
import Image from "next/image";

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
];

export default function MediumArticles() {
  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
              <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Articles
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-lg">
              Exploring ideas, sharing knowledge, and documenting my journey in software development
            </p>
          </motion.div>
        </div>
        <div className="space-y-6">
          {articles.map((article, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-all border border-gray-100 dark:border-gray-700"
            >
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-10"
                aria-label={`Read article: ${article.title}`}
              />
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    <div className="flex items-center gap-2">
                      {article.title}
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {article.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0 relative z-20">
                  <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 px-3 py-1.5 rounded-full">
                    <div className="w-4 h-4 relative">
                      <Image
                        src="/medium-logo.svg"
                        alt="Medium"
                        fill
                        className="object-contain dark:invert"
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {article.source}
                    </span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
} 