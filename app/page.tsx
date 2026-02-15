"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShieldCheck, Lock, Activity, Globe, Zap, Users, BrainCircuit, ShieldAlert, Globe2, ArrowRight, ScanFace } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n";
import AboutUs from "@/components/AboutUs";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full min-h-[80vh] flex flex-col md:flex-row items-center justify-between relative overflow-visible mb-20">

        {/* Animated Background Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-neon-purple/20 rounded-full blur-[120px] -z-10 animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-neon-blue/20 rounded-full blur-[120px] -z-10 animate-pulse delay-1000" />

        <motion.div
          className="md:w-1/2 text-left z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="inline-block px-4 py-1 rounded-full border border-neon-green/30 bg-neon-green/10 text-neon-green text-sm font-bold mb-6 backdrop-blur-md">
            ● {t.hero.title}
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Advanced <span className="neon-text text-neon-blue">AI Defense</span><br />
            Against Phishing
          </motion.h1>

          <motion.p variants={itemVariants} className="text-xl text-gray-400 mb-8 max-w-lg">
            {t.hero.subtitle}
          </motion.p>

          <motion.div variants={itemVariants} className="flex gap-4">
            <Link href="/scan" className="px-8 py-4 bg-neon-blue text-black font-bold rounded-lg hover:bg-white transition-all shadow-neon flex items-center gap-2 group">
              <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {t.hero.cta_scan}
            </Link>
            <Link href="/quiz" className="px-8 py-4 border border-white/20 hover:border-neon-purple hover:bg-neon-purple/10 rounded-lg transition-all font-bold flex items-center gap-2">
              <Activity className="w-5 h-5 text-neon-purple" />
              {t.hero.cta_quiz}
            </Link>
          </motion.div>

          <div className="mt-12 flex gap-8">
            <StatItem value="10k+" label={t.hero.stats_users} color="text-neon-green" />
            <StatItem value="99.9%" label={t.hero.stats_threats} color="text-neon-purple" />
          </div>
        </motion.div>

        {/* 3D-like Floating Element */}
        <motion.div
          className="md:w-1/2 flex justify-center mt-10 md:mt-0 relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
            {/* Central Shield */}
            <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-full blur-xl animate-pulse" />
            <div className="absolute inset-4 glass-panel flex items-center justify-center border-2 border-neon-blue/50 floating z-20">
              <ShieldCheck className="w-32 h-32 md:w-48 md:h-48 text-neon-blue drop-shadow-[0_0_15px_rgba(0,243,255,0.5)]" />
            </div>

            {/* Orbiting Icons */}
            <div className="absolute top-0 right-10 p-4 glass-panel rounded-xl animate-bounce z-30 border-neon-green/30">
              <Lock className="w-8 h-8 text-neon-green" />
            </div>
            <div className="absolute bottom-10 left-0 p-4 glass-panel rounded-xl animate-bounce delay-700 z-30 border-neon-red/30">
              <Activity className="w-8 h-8 text-neon-red" />
            </div>
            <div className="absolute bottom-40 right-[-20px] p-4 glass-panel rounded-xl animate-bounce delay-300 z-30 border-neon-purple/30">
              <Globe className="w-8 h-8 text-neon-purple" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* 🛡️ FEATURES SECTION */}
      <section className="py-24 px-4 relative w-full">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.features.title}</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              {t.features.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BrainCircuit className="w-12 h-12 text-neon-purple" />}
              title={t.features.f1_title}
              description={t.features.f1_desc}
            />
            <FeatureCard
              icon={<Globe2 className="w-12 h-12 text-neon-green" />}
              title={t.features.f2_title}
              description={t.features.f2_desc}
            />
            <FeatureCard
              icon={<ShieldAlert className="w-12 h-12 text-neon-red" />}
              title={t.features.f3_title}
              description={t.features.f3_desc}
            />
          </div>
        </div>
      </section>

      <AboutUs />
      <ContactSection />

      {/* 🚀 CTA BANNER */}
      <section className="py-20 px-4 w-full">
        <div className="max-w-5xl mx-auto glass-panel p-12 relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-neon-blue/20 blur-[80px] -z-10 rounded-full" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-purple/20 blur-[80px] -z-10 rounded-full" />

          <h2 className="text-4xl font-bold mb-6">{t.cta_banner.title}</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {t.cta_banner.subtitle}
          </p>
          <Link href="/register" className="inline-block px-10 py-5 bg-gradient-to-r from-neon-blue to-neon-purple text-white font-bold text-xl rounded-full hover:shadow-[0_0_30px_rgba(188,19,254,0.5)] transition-all transform hover:-translate-y-1">
            {t.cta_banner.btn}
          </Link>
        </div>
      </section>
    </div>
  );
}

function StatItem({ value, label, color }: { value: string, label: string, color: string }) {
  return (
    <div className="text-center">
      <div className={`text-4xl font-bold mb-1 ${color} neon-text`}>{value}</div>
      <div className="text-gray-500 text-sm tracking-wider uppercase">{label}</div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="group glass-panel p-10 hover:bg-glass-200 transition-all duration-300 border border-white/5 hover:border-white/20">
      <div className="mb-6 p-4 bg-white/5 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)]">{icon}</div>
      <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors">{title}</h3>
      <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{description}</p>
    </div>
  );
}
