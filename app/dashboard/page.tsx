"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Shield, Activity, Users, BookOpen } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";

export default function Dashboard() {
    const { t } = useLanguage();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();
    }, []);

    return (
        <div className="text-white">
            <h1 className="text-3xl font-bold mb-2">{t.dashboard.welcome} {user?.email?.split('@')[0] || 'User'}!</h1>
            <p className="text-gray-400 mb-8">{t.dashboard.security_overview}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard icon={Shield} label={t.dashboard.risk_score} value={t.scan.safe} color="text-neon-green" />
                <StatCard icon={Activity} label={t.dashboard.recent_scans} value="12" color="text-neon-blue" />
                <StatCard icon={Users} label={t.dashboard.community_rep} value="Beginner" color="text-neon-purple" />
                <StatCard icon={BookOpen} label={t.dashboard.academy_xp} value="350" color="text-yellow-400" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass-panel p-6">
                    <h2 className="text-xl font-bold mb-4">{t.dashboard.recent_activity}</h2>
                    <div className="space-y-4">
                        <ActivityItem text={`${t.dashboard.activity_module}: 'Phishing 101'`} time="2h ago" />
                        <ActivityItem text={`${t.dashboard.activity_url}: amazon-login-secure...`} time="5h ago" />
                        <ActivityItem text={`${t.dashboard.activity_forum}: 'SMS Scam Alert'`} time="1d ago" />
                    </div>
                </div>

                <div className="glass-panel p-6">
                    <h2 className="text-xl font-bold mb-4">{t.dashboard.quick_actions}</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <Link href="/scan" className="p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors flex flex-col items-center gap-2 text-center">
                            <Shield className="w-6 h-6 text-neon-blue" />
                            <span>{t.dashboard.new_scan}</span>
                        </Link>
                        <Link href="/learn" className="p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors flex flex-col items-center gap-2 text-center">
                            <BookOpen className="w-6 h-6 text-neon-purple" />
                            <span>{t.dashboard.continue_learning}</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon: Icon, label, value, color }: any) {
    return (
        <div className="glass-panel p-6 flex items-center gap-4">
            <div className={`p-3 rounded-full bg-white/5 ${color}`}>
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <p className="text-sm text-gray-400">{label}</p>
                <p className="text-2xl font-bold">{value}</p>
            </div>
        </div>
    );
}

function ActivityItem({ text, time }: any) {
    return (
        <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2 last:border-0">
            <span>{text}</span>
            <span className="text-gray-500 text-xs">{time}</span>
        </div>
    );
}
