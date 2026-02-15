"use client";

import { useEffect, useState } from "react";
import { Play, CheckCircle, Lock, Trophy, Award, BookOpen, ArrowRight, Shield, Smartphone } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { COURSES, getUserProgress, Module } from "@/lib/lms";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { motion } from "framer-motion";

const MODULE_ICONS: Record<string, any> = {
    "phishing-101": Shield,
    "quishing-defense": Smartphone,
    "default": BookOpen
};

interface UserProgress {
    module_id: string;
    status: string;
}

export default function LearnPage() {
    const { t } = useLanguage();
    const [progress, setProgress] = useState<UserProgress[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProgress = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const data = await getUserProgress(user.id);
                setProgress(data as UserProgress[]); // Cast for simplicity
            }
            setLoading(false);
        };
        fetchProgress();
    }, []);

    const getModuleStatus = (moduleId: string) => {
        return progress.find((p: UserProgress) => p.module_id === moduleId)?.status || "locked";
    };

    // Unlock logic: First module is unlocked by default. Others unlock if previous is completed.
    const isUnlocked = (index: number) => {
        if (index === 0) return true;
        const prevModuleId = COURSES[index - 1].id;
        const prevStatus = getModuleStatus(prevModuleId);
        return prevStatus === "completed";
    };

    // Combine COURSES with user progress
    const modules = COURSES.map(module => ({
        ...module,
        status: getModuleStatus(module.id),
        isUnlocked: isUnlocked(COURSES.indexOf(module)),
        xp: 100, // Example XP per module
        Icon: MODULE_ICONS[module.id] || MODULE_ICONS.default
    }));

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="text-center mb-16 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-neon-purple/20 blur-[100px] -z-10 rounded-full" />
                <h1 className="text-5xl font-bold mb-4 neon-text">{t.learn.title}</h1>
                <p className="text-gray-400 text-xl">{t.learn.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="glass-panel p-8 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-neon-purple/10 flex items-center justify-center mb-4 border border-neon-purple/20">
                        <Award className="w-8 h-8 text-neon-purple" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">
                        {progress.filter((p: UserProgress) => p.status === 'completed').length * 100}
                    </div>
                    <div className="text-gray-400 font-medium">{t.learn.total_xp}</div>
                </div>

                <div className="glass-panel p-8 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-neon-blue/10 flex items-center justify-center mb-4 border border-neon-blue/20">
                        <BookOpen className="w-8 h-8 text-neon-blue" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">
                        {progress.filter((p: UserProgress) => p.status === 'completed').length}/{COURSES.length}
                    </div>
                    <div className="text-gray-400 font-medium">{t.learn.status.completed}</div>
                </div>

                <div className="glass-panel p-8 flex flex-col items-center text-center cursor-not-allowed group">
                    <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-4 border border-gray-700 group-hover:bg-gray-700 transition-colors">
                        <Trophy className="w-8 h-8 text-gray-500" />
                    </div>
                    <div className="text-lg font-bold text-gray-500 mb-1">{t.learn.claim_cert}</div>
                    <div className="text-xs text-gray-600">{t.learn.locked}</div>
                </div>
            </div>

            <div className="space-y-8">
                {modules.map((module) => (
                    <Link
                        href={module.status === 'locked' ? '#' : `/learn/${module.id}`}
                        key={module.id}
                        className="group block"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: COURSES.indexOf(module) * 0.1 }}
                            className={`glass-panel p-8 border hover:border-neon-blue/50 transition-all ${module.status === 'locked' ? 'opacity-50 grayscale' : ''}`}
                        >
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                <div className="w-full md:w-48 h-32 rounded-xl bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-neon-blue/5 group-hover:bg-neon-blue/10 transition-colors" />
                                    <module.Icon className={`w-12 h-12 ${module.status === 'locked' ? 'text-gray-600' : 'text-neon-blue'}`} />
                                </div>

                                <div className="flex-grow">
                                    <div className="flex flex-wrap items-center gap-3 mb-3">
                                        <h3 className="text-2xl font-bold text-white">{t.learn.modules[module.id as keyof typeof t.learn.modules] || module.title}</h3>
                                        {module.status === 'completed' ? (
                                            <span className="bg-neon-green/20 text-neon-green text-xs px-2 py-0.5 rounded border border-neon-green/30 flex items-center gap-1">
                                                <CheckCircle className="w-3 h-3" /> {t.learn.status.completed}
                                            </span>
                                        ) : module.status === 'in_progress' ? (
                                            <span className="bg-neon-blue/20 text-neon-blue text-xs px-2 py-0.5 rounded border border-neon-blue/30 flex items-center gap-1">
                                                <Play className="w-3 h-3 fill-current" /> {t.learn.status.in_progress}
                                            </span>
                                        ) : (
                                            <span className="bg-gray-800 text-gray-500 text-xs px-2 py-0.5 rounded border border-gray-700 flex items-center gap-1">
                                                <Lock className="w-3 h-3" /> {t.learn.status.locked}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-gray-400 mb-6">{module.status === 'locked' ? t.learn.coming_soon : module.description}</p>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <span className="text-neon-blue font-bold">+{module.xp} XP</span>
                                            <span>•</span>
                                            <span>{module.duration}</span>
                                        </div>
                                        {module.status !== 'locked' && (
                                            <button className="flex items-center gap-2 text-neon-blue font-bold hover:text-white transition-colors group">
                                                {module.status === 'completed' ? t.learn.review_module : t.learn.start_learning}
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
