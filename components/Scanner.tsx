"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { calculateRiskScore, ScanResult } from "@/lib/risk-scoring";

export default function Scanner() {
    const [input, setInput] = useState("");
    const [isScanning, setIsScanning] = useState(false);
    const [result, setResult] = useState<ScanResult | null>(null);

    const handleScan = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input) return;

        setIsScanning(true);
        setResult(null);

        // Simulate network delay for "AI Analysis"
        setTimeout(() => {
            const scanResult = calculateRiskScore(input);
            setResult(scanResult);
            setIsScanning(false);
        }, 1500);
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <form onSubmit={handleScan} className="relative">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Paste URL, SMS text, or Email content here..."
                    className="w-full bg-glass-100 border border-glass-200 rounded-full py-4 pl-6 pr-14 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-blue transition-all shadow-neon"
                />
                <button
                    type="submit"
                    disabled={isScanning}
                    className="absolute right-2 top-2 p-2 bg-neon-blue text-black rounded-full hover:bg-white transition-colors disabled:opacity-50"
                >
                    <Search className={`w-6 h-6 ${isScanning ? "animate-spin" : ""}`} />
                </button>
            </form>

            {result && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 glass-panel p-6"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold">Analysis Result</h3>
                        <span className={`px-4 py-1 rounded-full text-sm font-bold ${result.riskLevel === "Safe" ? "bg-neon-green/20 text-neon-green border border-neon-green" :
                                result.riskLevel === "High Risk" ? "bg-neon-red/20 text-neon-red border border-neon-red shadow-neon-red" :
                                    "bg-orange-500/20 text-orange-400 border border-orange-400"
                            }`}>
                            {result.riskLevel}
                        </span>
                    </div>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="relative w-24 h-24 flex items-center justify-center">
                            <svg className="w-full h-full" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="45" fill="none" stroke="#333" strokeWidth="10" />
                                <circle
                                    cx="50" cy="50" r="45" fill="none"
                                    stroke={result.riskLevel === "Safe" ? "#0aff0a" : result.riskLevel === "High Risk" ? "#ff003c" : "#facc15"}
                                    strokeWidth="10"
                                    strokeDasharray={`${result.score * 2.83} 283`}
                                    strokeDashoffset="0"
                                    transform="rotate(-90 50 50)"
                                    className="transition-all duration-1000 ease-out"
                                />
                            </svg>
                            <span className="absolute text-2xl font-bold">{result.score}%</span>
                        </div>
                        <div>
                            <p className="text-gray-400">Threat Type</p>
                            <p className="font-semibold text-lg">{result.threatType}</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        {result.details.length > 0 ? (
                            result.details.map((detail, idx) => (
                                <div key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                                    <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                                    {detail}
                                </div>
                            ))
                        ) : (
                            <div className="flex items-center gap-2 text-neon-green">
                                <CheckCircle className="w-5 h-5" />
                                No obvious threats detected.
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </div>
    );
}
