"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPost } from "@/lib/forum";
import { useLanguage } from "@/lib/i18n";
import { ArrowLeft, Send } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function NewPostPage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("General");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            alert("You must be logged in to post.");
            return;
        }

        setLoading(true);
        try {
            await createPost(title, content, category);
            router.push("/forum");
            router.refresh();
        } catch (error) {
            console.error("Error creating post:", error);
            alert("Failed to create post. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <Link href="/forum" className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Forum
            </Link>

            <div className="glass-panel p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-neon-blue/10 blur-[50px] -z-10 rounded-full" />

                <h1 className="text-3xl font-bold mb-6 neon-text">Create New Discussion</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-300 mb-2 font-medium">Title</label>
                        <input
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-black/40 border border-gray-700 rounded-xl py-3 px-4 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all"
                            placeholder="e.g., Suspicious SMS from Unknown Number"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-2 font-medium">Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full bg-black/40 border border-gray-700 rounded-xl py-3 px-4 focus:outline-none focus:border-neon-blue transition-all text-gray-300"
                        >
                            <option value="General">General Discussion</option>
                            <option value="Phishing Report">Phishing Report</option>
                            <option value="Question">Question</option>
                            <option value="Story">Success Story</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-2 font-medium">Content</label>
                        <textarea
                            required
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={6}
                            className="w-full bg-black/40 border border-gray-700 rounded-xl py-3 px-4 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all"
                            placeholder="Describe your issue or share your thoughts..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-neon-blue text-black font-bold rounded-xl hover:bg-white transition-all shadow-neon flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Posting..." : (
                            <>
                                <Send className="w-5 h-5" /> Publish Post
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
