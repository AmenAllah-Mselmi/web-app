"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, User, UserPlus, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

export default function RegisterPage() {
    const { t, dir } = useLanguage();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // 1. Sign Up User (Attempting auto-confirm via metadata)
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    username,
                    email_confirm: false // Hint to Supabase (only works if enabled in dashboard)
                },
            },
        });

        if (authError) {
            if (authError.message.includes("rate limit")) {
                setError("Too many attempts. Please check your email inbox or wait a few minutes.");
            } else {
                setError(authError.message);
            }
            setLoading(false);
            return;
        }

        if (authData.session) {
            // Auto-login successful (Email confirmation disabled)
            router.push("/dashboard");
        } else if (authData.user) {
            // User created but no session (Email confirmation likely enabled)
            setError("Account created! If auto-login failed, please check your email or sign in.");
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh] px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md glass-panel p-8 relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-32 h-32 bg-neon-green/20 blur-[50px] -z-10 rounded-full" />

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold neon-text mb-2">{t.auth.join}</h1>
                    <p className="text-gray-400">{t.auth.signup_desc}</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg flex items-center gap-2 text-red-200 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {error}
                    </div>
                )}

                <form onSubmit={handleRegister} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 ml-1">{t.auth.username}</label>
                        <div className="relative">
                            <User className={`absolute top-3.5 w-5 h-5 text-gray-400 ${dir === 'rtl' ? 'right-3' : 'left-3'}`} />
                            <input
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className={`w-full bg-black/40 border border-gray-700 rounded-xl py-3 px-10 focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-all`}
                                placeholder={t.auth.username_placeholder}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 ml-1">{t.auth.email}</label>
                        <div className="relative">
                            <Mail className={`absolute top-3.5 w-5 h-5 text-gray-400 ${dir === 'rtl' ? 'right-3' : 'left-3'}`} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full bg-black/40 border border-gray-700 rounded-xl py-3 px-10 focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-all`}
                                placeholder={t.auth.email_placeholder}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 ml-1">{t.auth.password}</label>
                        <div className="relative">
                            <Lock className={`absolute top-3.5 w-5 h-5 text-gray-400 ${dir === 'rtl' ? 'right-3' : 'left-3'}`} />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full bg-black/40 border border-gray-700 rounded-xl py-3 px-10 focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-all`}
                                placeholder={t.auth.password_placeholder}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-neon-green text-black font-bold py-3 rounded-xl hover:bg-white transition-all shadow-neon-green flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <>
                                <UserPlus className="w-5 h-5" />
                                {t.auth.register_btn}
                            </>
                        )}
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-400 text-sm">
                    {t.auth.have_account}{" "}
                    <Link href="/login" className="text-neon-green hover:text-white transition-colors font-semibold">
                        {t.auth.signin_link}
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
