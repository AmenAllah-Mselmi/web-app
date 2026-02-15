"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck, LayoutDashboard, Users, BookOpen, Map, Settings, LogOut, ScanLine } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Sidebar({ onLinkClick }: { onLinkClick?: () => void }) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        if (onLinkClick) onLinkClick();
        await supabase.auth.signOut();
        router.refresh();
        router.push("/login");
    };

    const links = [
        { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
        { href: "/forum", label: "Community", icon: Users },
        { href: "/learn", label: "Academy", icon: BookOpen },
        { href: "/map", label: "Threat Map", icon: Map },
        { href: "/settings", label: "Settings", icon: Settings },
    ];

    return (
        <aside className="h-screen w-64 glass-panel border-r border-white/10 flex flex-col bg-black/90 backdrop-blur-xl">
            <div className="p-6 flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-neon-blue" />
                <span className="text-xl font-bold neon-text">PhishShield</span>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href || pathname.startsWith(link.href + "/");

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={onLinkClick}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${isActive
                                ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30 shadow-[0_0_15px_rgba(0,194,255,0.2)]'
                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <Icon className={`w-5 h-5 ${isActive ? 'text-neon-blue' : 'text-gray-500 group-hover:text-white'}`} />
                            <span className="font-medium">{link.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/10">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg w-full transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Sign Out</span>
                </button>
            </div>
        </aside>
    );
}
