import { useEffect, useState, useRef } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { Send, User } from "lucide-react";

// ... interfaces ...
interface ChatMessage {
    id: number;
    content: string;
    user_id: string;
    created_at: string;
    is_expert: boolean;
    profiles?: {
        username: string;
    };
}

export default function GroupChat() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isSupabaseConfigured) {
            setLoading(false);
            return;
        }

        fetchMessages();

        const channel = supabase
            .channel('public:chat_messages')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_messages' }, (payload) => {
                fetchMessages();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const fetchMessages = async () => {
        const { data, error } = await supabase
            .from('chat_messages')
            .select(`
                *,
                profiles (username)
            `)
            .order('created_at', { ascending: false })
            .limit(50);

        if (error) console.error(error);
        else setMessages((data || []).reverse()); // Reverse to show oldest first at top
        setLoading(false);
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return alert("You must be logged in to chat.");

        const { error } = await supabase
            .from('chat_messages')
            .insert({
                user_id: user.id,
                content: newMessage,
                room_id: 'general'
            });

        if (error) {
            console.error(error);
            alert("Failed to send message");
        } else {
            setNewMessage("");
        }
    };

    return (
        <div className="flex flex-col h-[600px] glass-panel border border-neon-blue/30 overflow-hidden">
            <div className="p-4 bg-neon-blue/10 border-b border-white/10">
                <h3 className="font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
                    Live Community Chat
                </h3>
            </div>

            <div className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-700">
                {!isSupabaseConfigured ? (
                    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                        <div className="w-2 h-2 bg-red-500 rounded-full mb-2" />
                        <p className="text-sm">Chat Offline</p>
                        <p className="text-xs text-gray-600">Configuration missing</p>
                    </div>
                ) : loading ? (
                    <div className="text-center text-gray-500 mt-10">Loading chat...</div>
                ) : (
                    messages.map((msg) => (
                        <div key={msg.id} className="flex flex-col">
                            <div className="flex items-baseline gap-2">
                                <span className={`font-bold text-sm ${msg.is_expert ? 'text-neon-purple' : 'text-neon-blue'}`}>
                                    {msg.profiles?.username || "User"}
                                </span>
                                <span className="text-xs text-gray-600">
                                    {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                            <p className="text-gray-300 text-sm bg-white/5 p-2 rounded-lg rounded-tl-none inline-block self-start">
                                {msg.content}
                            </p>
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-3 bg-black/40 border-t border-white/10 flex gap-2">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-grow bg-transparent border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-neon-blue"
                />
                <button
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="p-2 bg-neon-blue text-black rounded-lg hover:bg-white transition-colors disabled:opacity-50"
                >
                    <Send className="w-4 h-4" />
                </button>
            </form>
        </div>
    );
}
