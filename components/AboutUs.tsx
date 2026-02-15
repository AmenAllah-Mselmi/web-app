"use client";

import { motion } from "framer-motion";
import { Shield, Target, Users } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function AboutUs() {
    const { t } = useLanguage();

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
                            {t.about.title}
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-6">
                            {t.about.p1}
                        </p>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            {t.about.p2}
                        </p>
                    </motion.div>

                    <div className="grid gap-6">
                        <ValueCard
                            icon={<Shield className="w-8 h-8 text-neon-purple" />}
                            title={t.about.v1_title}
                            desc={t.about.v1_desc}
                        />
                        <ValueCard
                            icon={<Users className="w-8 h-8 text-neon-green" />}
                            title={t.about.v2_title}
                            desc={t.about.v2_desc}
                        />
                        <ValueCard
                            icon={<Target className="w-8 h-8 text-neon-red" />}
                            title={t.about.v3_title}
                            desc={t.about.v3_desc}
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
