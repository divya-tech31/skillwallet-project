import { Link } from "react-router-dom";
import { PageTransition, CraftButton } from "@/components/Craft";
import { BookOpen, Search, Brain, Layers } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: Search, title: "Smart Search", desc: "Search arXiv papers with intelligent filtering" },
  { icon: Layers, title: "Workspaces", desc: "Organize papers into focused research contexts" },
  { icon: Brain, title: "AI Analysis", desc: "Ask questions, get summaries and comparisons" },
];

export default function LandingPage() {
  return (
    <PageTransition>
      <div className="min-h-[calc(100vh-57px)] flex flex-col">
        {/* Hero */}
        <section className="flex-1 flex items-center justify-center px-6 py-20">
          <div className="max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Powered by Agentic AI
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-5xl sm:text-6xl font-bold text-foreground mb-6 leading-[1.1]"
            >
              Research, organized
              <br />
              and <span className="text-primary">understood</span>.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto font-reading"
            >
              Discover papers, build workspaces, and let AI agents analyze your research.
              From search to synthesis — all in one quiet, structured environment.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex gap-3 justify-center"
            >
              <Link to="/register">
                <CraftButton variant="primary" className="px-6 py-3 text-base">
                  Start Researching
                </CraftButton>
              </Link>
              <Link to="/login">
                <CraftButton variant="secondary" className="px-6 py-3 text-base">
                  Sign In
                </CraftButton>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="px-6 pb-20">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                className="bg-card shadow-craft rounded-2xl p-2"
              >
                <div className="bg-muted/30 rounded-lg p-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
