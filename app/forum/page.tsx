"use client";

import { useEffect, useState } from "react";
import { MessageSquare, ThumbsUp, ShieldCheck, Plus, User, Loader2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { getPosts, Post } from "@/lib/forum";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import GroupChat from "@/components/GroupChat";
import { isSupabaseConfigured } from "@/lib/supabase";

export default function ForumPage() {
    const { t } = useLanguage();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [configError, setConfigError] = useState(false);

    useEffect(() => {
        if (!isSupabaseConfigured) {
            setConfigError(true);
            setLoading(false);
            return;
        }

        getPosts().then(data => {
            setPosts(data);
            setLoading(false);
        }).catch(err => {
            console.error(err);
            setLoading(false);
        });
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold neon-text mb-2">{t.forum.title}</h1>
                        <p className="text-gray-400">{t.forum.subtitle}</p>
                    </div>
                    <Link href="/forum/new" className="bg-neon-blue text-black font-bold px-4 py-2 rounded-lg hover:bg-white transition-colors flex items-center gap-2">
                        <Plus className="w-5 h-5" />
                        {t.forum.newPost}
                    </Link>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-10 h-10 text-neon-blue animate-spin" />
                    </div>
                ) : configError ? (
                    <div className="text-center py-20 text-red-400 bg-red-900/10 rounded-xl border border-red-500/20 shadow-lg">
                        <ShieldCheck className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <h3 className="text-xl font-bold mb-2">Database Connection Failed</h3>
                        <p>Missing Supabase configuration. Please check your .env.local file.</p>
                    </div>
                ) : posts.length === 0 ? (
                    <div className="text-center py-20 text-gray-400">
                        No discussions yet. Be the first to start one!
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {posts.map((post) => (
                            <Link href={`/forum/${post.id}`} key={post.id} className="block glass-panel p-6 hover:bg-glass-200 transition-all cursor-pointer group border border-white/5 hover:border-neon-blue/30">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-full bg-gray-700">
                                            <User className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-white">{post.profiles?.username || "Anonymous"}</span>
                                                {post.profiles?.vulnerability_score && post.profiles.vulnerability_score < 30 && (
                                                    <span className="bg-neon-purple/20 text-neon-purple text-xs px-2 py-0.5 rounded border border-neon-purple">
                                                        Expert
                                                    </span>
                                                )}
                                            </div>
                                            <span className="text-xs text-gray-500">
                                                {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                                            </span>
                                        </div>
                                    </div>
                                    {post.is_verified && (
                                        <div className="flex items-center gap-1 text-neon-green text-sm font-bold bg-neon-green/10 px-2 py-1 rounded">
                                            <ShieldCheck className="w-4 h-4" />
                                            Verified Threat
                                        </div>
                                    )}
                                </div>

                                <h3 className="text-xl font-bold mb-2 group-hover:text-neon-blue transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-gray-300 mb-4 line-clamp-2">{post.content}</p>

                                <div className="flex items-center justify-between mt-4 border-t border-white/5 pt-4">
                                    <div className="flex gap-2">
                                        <span className="text-xs bg-white/5 px-2 py-1 rounded text-gray-400">#{post.category}</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-gray-400">
                                        <div className="flex items-center gap-1 hover:text-white transition-colors">
                                            <ThumbsUp className="w-4 h-4" /> {post.likes}
                                        </div>
                                        <div className="flex items-center gap-1 hover:text-white transition-colors">
                                            <MessageSquare className="w-4 h-4" /> Comment
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <div className="hidden lg:block">
                <div className="sticky top-24">
                    <GroupChat />
                </div>
            </div>
        </div>
    );
}
