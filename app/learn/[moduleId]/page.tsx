"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { COURSES, Module, recordProgress } from "@/lib/lms";
import { ArrowLeft, BookOpen, CheckCircle, ChevronRight, Play, Trophy, X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ReactConfetti from "react-confetti";

export default function ModulePage() {
    const params = useParams();
    const router = useRouter();
    const [module, setModule] = useState<Module | null>(null);
    const [activeTab, setActiveTab] = useState<'content' | 'quiz'>('content');
    const [currentChapterIndex, setCurrentChapterIndex] = useState(0);

    // Quiz State
    const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        const mod = COURSES.find(c => c.id === params.moduleId);
        if (mod) {
            setModule(mod);
            setQuizAnswers(new Array(mod.quiz.length).fill(-1));
        }
    }, [params.moduleId]);

    const handleNextChapter = () => {
        if (!module) return;
        if (currentChapterIndex < module.chapters.length - 1) {
            setCurrentChapterIndex(prev => prev + 1);
        } else {
            setActiveTab('quiz');
        }
    };

    const handleQuizOptionSelect = (questionIndex: number, optionIndex: number) => {
        if (quizSubmitted) return;
        const newAnswers = [...quizAnswers];
        newAnswers[questionIndex] = optionIndex;
        setQuizAnswers(newAnswers);
    };

    const submitQuiz = async () => {
        if (!module) return;

        // Calculate score
        let correctCount = 0;
        module.quiz.forEach((q, idx) => {
            if (quizAnswers[idx] === q.correctAnswer) correctCount++;
        });

        const finalScore = Math.round((correctCount / module.quiz.length) * 100);
        setScore(finalScore);
        setQuizSubmitted(true);

        if (finalScore >= 70) {
            setShowConfetti(true);
            await recordProgress(module.id, 'completed', finalScore);
        } else {
            await recordProgress(module.id, 'in_progress', finalScore);
        }
    };

    if (!module) return <div className="text-center py-20">Loading module...</div>;

    const currentChapter = module.chapters[currentChapterIndex];

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {showConfetti && <ReactConfetti recycle={false} numberOfPieces={500} />}

            <Link href="/learn" className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors inline-block">
                <ArrowLeft className="w-4 h-4" /> Back to Academy
            </Link>

            <div className="grid lg:grid-cols-4 gap-8">
                {/* Sidebar Navigation */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="glass-panel p-4">
                        <h2 className="font-bold text-white mb-4 text-lg">{module.title}</h2>
                        <div className="space-y-2">
                            {module.chapters.map((chap, idx) => (
                                <button
                                    key={chap.id}
                                    onClick={() => {
                                        setActiveTab('content');
                                        setCurrentChapterIndex(idx);
                                    }}
                                    className={`w-full text-left p-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${activeTab === 'content' && currentChapterIndex === idx
                                            ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30'
                                            : 'hover:bg-white/5 text-gray-400'
                                        }`}
                                >
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border ${activeTab === 'content' && currentChapterIndex === idx ? 'border-neon-blue' : 'border-gray-600'
                                        }`}>
                                        {idx + 1}
                                    </div>
                                    {chap.title}
                                </button>
                            ))}

                            <div className="h-px bg-white/10 my-4" />

                            <button
                                onClick={() => setActiveTab('quiz')}
                                className={`w-full text-left p-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${activeTab === 'quiz'
                                        ? 'bg-neon-purple/20 text-neon-purple border border-neon-purple/30'
                                        : 'hover:bg-white/5 text-gray-400'
                                    }`}
                            >
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border ${activeTab === 'quiz' ? 'border-neon-purple' : 'border-gray-600'
                                    }`}>
                                    ?
                                </div>
                                Final Quiz
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-3 glass-panel p-8 min-h-[600px] relative overflow-hidden">
                    <AnimatePresence mode="wait">
                        {activeTab === 'content' ? (
                            <motion.div
                                key="content"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                                    <h1 className="text-3xl font-bold neon-text">{currentChapter.title}</h1>
                                    <span className="text-sm text-gray-400">Chapter {currentChapterIndex + 1} of {module.chapters.length}</span>
                                </div>

                                <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed whitespace-pre-wrap">
                                    {currentChapter.content}
                                </div>

                                <div className="flex justify-end pt-8 border-t border-white/10 mt-8">
                                    <button
                                        onClick={handleNextChapter}
                                        className="bg-neon-blue text-black font-bold px-6 py-3 rounded-xl hover:bg-white transition-all flex items-center gap-2"
                                    >
                                        {currentChapterIndex < module.chapters.length - 1 ? 'Next Chapter' : 'Take Quiz'}
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="quiz"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="text-center mb-8">
                                    <h2 className="text-3xl font-bold neon-text mb-2">Final Knowledge Check</h2>
                                    <p className="text-gray-400">Score 70% or higher to complete this module.</p>
                                </div>

                                {module.quiz.map((q, qIdx) => (
                                    <div key={q.id} className="bg-black/20 p-6 rounded-xl border border-white/5">
                                        <h3 className="text-lg font-bold text-white mb-4">{qIdx + 1}. {q.question}</h3>
                                        <div className="space-y-3">
                                            {q.options.map((option, optIdx) => {
                                                const isSelected = quizAnswers[qIdx] === optIdx;
                                                const isCorrect = q.correctAnswer === optIdx;
                                                // If submitted, show green for correct, red for wrong selection
                                                let buttonClass = "bg-white/5 hover:bg-white/10 border-gray-700";

                                                if (quizSubmitted) {
                                                    if (isCorrect) buttonClass = "bg-neon-green/20 border-neon-green text-neon-green";
                                                    else if (isSelected && !isCorrect) buttonClass = "bg-red-500/20 border-red-500 text-red-400";
                                                } else {
                                                    if (isSelected) buttonClass = "bg-neon-purple/50 border-neon-purple text-white";
                                                }

                                                return (
                                                    <button
                                                        key={optIdx}
                                                        onClick={() => handleQuizOptionSelect(qIdx, optIdx)}
                                                        disabled={quizSubmitted}
                                                        className={`w-full text-left p-4 rounded-lg border transition-all flex justify-between items-center ${buttonClass}`}
                                                    >
                                                        {option}
                                                        {quizSubmitted && isCorrect && <CheckCircle className="w-5 h-5 text-neon-green" />}
                                                        {quizSubmitted && isSelected && !isCorrect && <X className="w-5 h-5 text-red-500" />}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                        {quizSubmitted && (
                                            <div className="mt-4 p-3 bg-white/5 rounded-lg text-sm text-gray-300">
                                                <span className="font-bold text-neon-blue">Explanation:</span> {q.explanation}
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {!quizSubmitted ? (
                                    <div className="flex justify-center pt-4">
                                        <button
                                            onClick={submitQuiz}
                                            disabled={quizAnswers.includes(-1)}
                                            className="bg-neon-purple text-white font-bold px-8 py-4 rounded-xl hover:bg-neon-purple/80 transition-all flex items-center gap-2 shadow-lg shadow-neon-purple/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Submit Answers <Trophy className="w-5 h-5" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="text-center p-8 bg-black/40 rounded-xl border border-white/10">
                                        <div className="text-4xl font-bold mb-2 text-white">{score}%</div>
                                        <div className={`text-xl font-bold mb-6 ${score >= 70 ? 'text-neon-green' : 'text-red-400'}`}>
                                            {score >= 70 ? 'Module Completed! 🎉' : 'Keep trying! You need 70% to pass.'}
                                        </div>
                                        <div className="flex justify-center gap-4">
                                            <button
                                                onClick={() => {
                                                    setQuizSubmitted(false);
                                                    setQuizAnswers(new Array(module.quiz.length).fill(-1));
                                                    setScore(0);
                                                    setShowConfetti(false);
                                                }}
                                                className="px-6 py-2 border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
                                            >
                                                Retry Quiz
                                            </button>
                                            <Link href="/learn" className="px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors">
                                                Return to Menu
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
