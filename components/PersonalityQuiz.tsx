"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { questions, calculateAdvancedPersonality } from "@/lib/quiz-data";
import { ChevronRight, RefreshCcw, ShieldAlert, BookOpen, Skull } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function PersonalityTest() {
    const { t } = useLanguage();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [showResult, setShowResult] = useState(false);

    const handleAnswer = (score: number) => {
        setAnswers({ ...answers, [questions[currentQuestion].id]: score });
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResult(true);
        }
    };

    const restart = () => {
        setCurrentQuestion(0);
        setAnswers({});
        setShowResult(false);
    };

    const result = showResult ? calculateAdvancedPersonality(answers, t) : null;
    const currentQData = t.quiz.questions[currentQuestion];

    return (
        <div className="w-full max-w-3xl mx-auto glass-panel p-8 min-h-[500px] flex flex-col justify-center relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-neon-purple/10 blur-[80px] -z-10 rounded-full" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-blue/10 blur-[80px] -z-10 rounded-full" />

            <AnimatePresence mode="wait">
                {!showResult ? (
                    <motion.div
                        key="question"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-neon-blue text-sm font-bold tracking-widest uppercase">
                                    {t.quiz.question} {currentQuestion + 1} / {questions.length}
                                </span>
                                <span className="text-gray-500 text-xs uppercase tracking-wider">{questions[currentQuestion].trait} {t.quiz.check}</span>
                            </div>
                            <div className="w-full bg-gray-800 h-1 rounded-full mb-6">
                                <div
                                    className="h-full bg-neon-blue transition-all duration-300"
                                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                                />
                            </div>
                            <h2 className="text-2xl font-bold mt-2 leading-relaxed">{currentQData.text}</h2>
                        </div>
                        <div className="space-y-4">
                            {currentQData.options.map((option: any, idx: number) => (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswer(option.score)}
                                    className="w-full text-left p-5 rounded-xl border border-glass-200 bg-black/20 hover:bg-neon-blue/10 hover:border-neon-blue transition-all group relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-neon-blue/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                                    <span className="group-hover:text-neon-blue transition-colors relative z-10 font-medium">{option.text}</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center"
                    >
                        <h2 className="text-gray-400 text-sm tracking-[0.2em] mb-4 uppercase">{t.quiz.analysis_complete}</h2>

                        <div className="inline-block p-4 rounded-full bg-white/5 mb-4 border border-white/10 shadow-neon">
                            <Skull className="w-12 h-12 text-neon-red" />
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold mb-4 neon-text text-white">
                            {result?.archetype}
                        </h1>

                        <p className="text-xl text-gray-300 mb-8 max-w-xl mx-auto leading-relaxed">
                            {result?.description}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 text-left">
                            <div className="glass-panel p-6 border-l-4 border-neon-red bg-red-900/10">
                                <div className="flex items-center gap-2 mb-2 text-neon-red font-bold uppercase text-xs tracking-wider">
                                    <ShieldAlert className="w-4 h-4" /> {t.quiz.recommended_sim}
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{result?.simulation}</h3>
                                <p className="text-sm text-gray-400">
                                    {t.quiz.simulation_desc}
                                </p>
                            </div>

                            <div className="glass-panel p-6 border-l-4 border-neon-green bg-green-900/10">
                                <div className="flex items-center gap-2 mb-2 text-neon-green font-bold uppercase text-xs tracking-wider">
                                    <BookOpen className="w-4 h-4" /> {t.quiz.training_focus}
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{result?.trainingFocus}</h3>
                                <p className="text-sm text-gray-400">
                                    Assigning module: <span className="underline decoration-neon-green/50 cursor-pointer hover:text-white">{t.quiz.start_learning} &rarr;</span>
                                </p>
                            </div>
                        </div>

                        <div className="p-6 bg-glass-200 rounded-xl mb-8">
                            <div className="flex justify-between text-sm font-bold text-gray-400 mb-2">
                                <span>{t.quiz.vulnerability_score}</span>
                                <span>{Math.round((result!.totalScore / 150) * 100)}% {t.quiz.risk}</span>
                            </div>
                            <div className="w-full bg-gray-800 h-4 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-neon-green via-yellow-400 to-neon-red"
                                    style={{ width: `${(result!.totalScore / 150) * 100}%` }}
                                />
                            </div>
                        </div>

                        <button
                            onClick={restart}
                            className="px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors flex items-center gap-2 mx-auto"
                        >
                            <RefreshCcw className="w-5 h-5" /> {t.quiz.retake}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
