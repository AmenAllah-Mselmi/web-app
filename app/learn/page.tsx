"use client";

import { useEffect, useState } from "react";
import { Play, CheckCircle, Lock, Trophy } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { COURSES, getUserProgress, Module } from "@/lib/lms";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { motion } from "framer-motion";

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
        return progress.find(p => p.module_id === moduleId)?.status || "locked";
    };

    // Unlock logic: First module is unlocked by default. Others unlock if previous is completed.
    // For this demo, just unlock all if not strict. But let's verify.
    const isUnlocked = (index: number) => {
        if (index === 0) return true;
        const prevModuleId = COURSES[index - 1].id;
        const prevStatus = getModuleStatus(prevModuleId);
        return prevStatus === "completed";
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                <div>
                    <h1 className="text-4xl font-bold neon-text mb-2">{t.learn.title}</h1>
                    <p className="text-gray-400 max-w-xl">{t.learn.subtitle}</p>
                </div>

                <div className="bg-neon-purple/10 border border-neon-purple/30 px-6 py-4 rounded-xl flex items-center gap-4">
                    <Trophy className="w-8 h-8 text-neon-purple animate-pulse" />
                    <div>
                        <div className="text-sm text-gray-400">Total XP Earned</div>
                        <div className="text-2xl font-bold text-white">
                            {progress.filter(p => p.status === 'completed').length * 100} XP
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {COURSES.map((module, index) => {
                    const status = getModuleStatus(module.id);
                    const unlocked = isUnlocked(index);
                    const completed = status === 'completed';

                    return (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            key={module.id}
                            className={`glass-panel p-6 relative overflow-hidden group border ${completed ? 'border-neon-green/30' : 'border-white/5'}`}
                        >
                            {/* Background Glow */}
                            <div className={`absolute top-0 right-0 w-32 h-32 blur-[50px] -z-10 rounded-full transition-colors ${completed ? 'bg-neon-green/10' : 'bg-neon-blue/5'}`} />

                            <div className="flex justify-between items-start mb-6">
                                <div className={`p-3 rounded-lg ${completed ? 'bg-neon-green/20 text-neon-green' : unlocked ? 'bg-neon-blue/20 text-neon-blue' : 'bg-gray-800 text-gray-500'}`}>
                                    {completed ? <CheckCircle className="w-6 h-6" /> : unlocked ? <Play className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
                                </div>
                                <span className="text-xs font-bold bg-white/5 px-2 py-1 rounded text-gray-400 uppercase tracking-wider">
                                    {module.duration}
                                </span>
                            </div>

                            <h3 className={`text-xl font-bold mb-2 group-hover:text-neon-blue transition-colors ${!unlocked && 'text-gray-500'}`}>
                                {module.title}
                            </h3>
                            <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                                {module.description}
                            </p>

                            {unlocked ? (
                                <Link
                                    href={`/learn/${module.id}`}
                                    className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 font-bold transition-all ${completed ? 'bg-neon-green/20 text-neon-green hover:bg-neon-green/30' : 'bg-neon-blue text-black hover:bg-white shadow-neon'}`}
                                >
                                    {completed ? "Review Module" : "Start Learning"}
                                </Link>
                            ) : (
                                <button disabled className="w-full py-3 bg-gray-800 text-gray-500 rounded-lg cursor-not-allowed font-medium border border-gray-700">
                                    Locked
                                </button>
                            )}
                        </motion.div>
                    );
                })}

                {/* Coming Soon Module */}
                <div className="glass-panel p-6 border border-white/5 opacity-50 flex flex-col justify-center items-center text-center">
                    <div className="p-3 rounded-lg bg-gray-800 text-gray-500 mb-4">
                        <Lock className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-500 mb-2">Social Engineering</h3>
                    <p className="text-gray-600 text-sm">Coming soon in the next update.</p>
                </div>
            </div>
        </div>
    );
}
