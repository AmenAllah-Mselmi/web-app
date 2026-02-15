"use client";

import { motion } from "framer-motion";
import { Mail, MessageSquare, MapPin, Send } from "lucide-react";
import { useState } from "react";

export default function ContactSection() {
    const [formState, setFormState] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");
        // Simulate API call
        setTimeout(() => {
            setStatus("sent");
            setFormState({ name: "", email: "", message: "" });
        }, 1500);
    };

    return (
        <section id="contact" className="py-24 px-4 relative">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Have a security concern or want to partner with us? We're here to help.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <ContactCard
                            icon={<Mail className="w-6 h-6 text-neon-blue" />}
                            title="Email Us"
                            content="security@phishshield.tn"
                            sub="24/7 Response time"
                        />
                        <ContactCard
                            icon={<MessageSquare className="w-6 h-6 text-neon-purple" />}
                            title="Live Chat"
                            content="Available in App"
                            sub="Mon-Fri, 9am - 6pm"
                        />
                        <ContactCard
                            icon={<MapPin className="w-6 h-6 text-neon-green" />}
                            title="Visit HQ"
                            content="CyberPark, Tunis"
                            sub="Tunisia"
                        />
                    </div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="glass-panel p-8"
                    >
                        {status === "sent" ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-12">
                                <div className="w-16 h-16 bg-neon-green/20 rounded-full flex items-center justify-center mb-4 text-neon-green">
                                    <Send className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                                <p className="text-gray-400">Our team will get back to you shortly.</p>
                                <button
                                    onClick={() => setStatus("idle")}
                                    className="mt-6 text-neon-blue hover:text-white underline"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 focus:border-neon-blue focus:outline-none transition-colors"
                                        value={formState.name}
                                        onChange={e => setFormState({ ...formState, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 focus:border-neon-blue focus:outline-none transition-colors"
                                        value={formState.email}
                                        onChange={e => setFormState({ ...formState, email: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                                    <textarea
                                        required
                                        rows={4}
                                        className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 focus:border-neon-blue focus:outline-none transition-colors"
                                        value={formState.message}
                                        onChange={e => setFormState({ ...formState, message: e.target.value })}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={status === "sending"}
                                    className="w-full py-4 bg-neon-blue text-black font-bold rounded-xl hover:bg-white transition-all shadow-neon flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {status === "sending" ? "Sending..." : "Send Message"}
                                    {!status && <Send className="w-5 h-5" />}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function ContactCard({ icon, title, content, sub }: any) {
    return (
        <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
            <div className="p-3 bg-gray-800 rounded-lg group-hover:bg-white/10 transition-colors">
                {icon}
            </div>
            <div>
                <h3 className="font-bold text-lg text-white">{title}</h3>
                <p className="text-neon-blue font-medium">{content}</p>
                <p className="text-sm text-gray-500">{sub}</p>
            </div>
        </div>
    );
}
