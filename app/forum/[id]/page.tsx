"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getPost, getComments, addComment, Post, Comment } from "@/lib/forum";
import { ArrowLeft, MessageSquare, Send, ThumbsUp, User } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export default function PostPage() {
    const params = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const id = params.id as string;
        if (id) {
            Promise.all([getPost(id), getComments(id)])
                .then(([postData, commentsData]) => {
                    setPost(postData);
                    setComments(commentsData);
                    setLoading(false);
                })
                .catch(err => console.error(err));
        }
    }, [params]);

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim() || !post) return;

        setSubmitting(true);
        try {
            const comment = await addComment(post.id.toString(), newComment);
            // Refresh comments manually or append to state (appending here for speed)
            // Ideally we'd re-fetch to get the profile included, but for now let's just reload via window or re-fetch
            const updatedComments = await getComments(post.id.toString());
            setComments(updatedComments);
            setNewComment("");
        } catch (error) {
            console.error(error);
            alert("Failed to submit comment");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="text-center py-20 text-neon-blue">Loading discussion...</div>;
    if (!post) return <div className="text-center py-20">Post not found</div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <Link href="/forum" className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Forum
            </Link>

            <article className="glass-panel p-8 mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-neon-purple/5 blur-[50px] -z-10 rounded-full" />

                <h1 className="text-3xl font-bold mb-4 neon-text">{post.title}</h1>

                <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-6">
                    <div className="p-2 rounded-full bg-gray-700">
                        <User className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                        <div className="text-white font-bold">{post.profiles?.username || "Anonymous"}</div>
                        <div className="text-xs text-gray-500">
                            {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })} in <span className="text-neon-blue">{post.category}</span>
                        </div>
                    </div>
                </div>

                <div className="prose prose-invert max-w-none mb-8 text-gray-300 leading-relaxed">
                    {post.content}
                </div>

                <div className="flex items-center gap-4 text-gray-400">
                    <button className="flex items-center gap-2 hover:text-white bg-white/5 px-4 py-2 rounded-full transition-colors">
                        <ThumbsUp className="w-4 h-4" /> {post.likes} Likes
                    </button>
                    <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" /> {comments.length} Comments
                    </div>
                </div>
            </article>

            {/* Comments Section */}
            <div className="space-y-6">
                <h3 className="text-xl font-bold mb-4">Discussion</h3>

                {/* Comment Form */}
                <form onSubmit={handleCommentSubmit} className="glass-panel p-4 flex gap-4 items-start">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add to the discussion..."
                        className="flex-grow bg-black/40 border border-gray-700 rounded-xl p-3 focus:outline-none focus:border-neon-blue resize-none h-24"
                    />
                    <button
                        type="submit"
                        disabled={submitting || !newComment.trim()}
                        className="bg-neon-blue text-black p-3 rounded-xl hover:bg-white transition-colors disabled:opacity-50"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </form>

                {/* Comments List */}
                <div className="space-y-4">
                    {comments.map((comment) => (
                        <div key={comment.id} className="glass-panel p-4 border border-white/5">
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-bold text-sm text-neon-blue">{comment.profiles?.username || "User"}</span>
                                <span className="text-xs text-gray-500">
                                    {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                                </span>
                            </div>
                            <p className="text-gray-300">{comment.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
