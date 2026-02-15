"use client";

import { motion } from "framer-motion";
import { Shield, Target, Users } from "lucide-react";

export default function AboutUs() {
    return (
        <section id="about" className="py-24 px-4 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="absolute top-[-20%] left-[-20%] w-64 h-64 bg-neon-blue/20 rounded-full blur-[80px]" />
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Protecting Tunisia's <span className="neon-text text-neon-blue">Digital Frontier</span>
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-6">
                            PhishShield was born from a simple observation: traditional antivirus software isn't enough to stop social engineering. In a world where hackers hack people, not just computers, we need a defense that understands human psychology.
                        </p>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Our mission is to create a herd immunity against cyber threats in Tunisia. By combining AI-driven detection with community-verified reporting, we turn every user into a sensor for the entire network.
                        </p>
                    </motion.div>

                    <div className="grid gap-6">
                        <ValueCard
                            icon={<Shield className="w-8 h-8 text-neon-purple" />}
                            title="Proactive Defense"
                            desc="We stop threats before they happen by analyzing patterns, not just file signatures."
                        />
                        <ValueCard
                            icon={<Users className="w-8 h-8 text-neon-green" />}
                            title="Community Power"
                            desc="A threat detected by one is blocked for all. Our community is our strongest firewall."
                        />
                        <ValueCard
                            icon={<Target className="w-8 h-8 text-neon-red" />}
                            title="Precision AI"
                            desc="Our models are trained on local Tunisian dialects and context to spot localized scams."
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

function ValueCard({ icon, title, desc }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-6 flex gap-4 items-start hover:border-neon-blue/30 transition-colors"
        >
            <div className="p-3 bg-white/5 rounded-lg shrink-0">
                {icon}
            </div>
            <div>
                <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
                <p className="text-gray-400">{desc}</p>
            </div>
        </motion.div>
    );
}
