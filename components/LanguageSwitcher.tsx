"use client";

import { useLanguage } from "@/lib/i18n";
import { Globe } from "lucide-react";
import { useState } from "react";

export default function LanguageSwitcher() {
    const { lang, setLang } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const handleLanguageChange = (l: 'en' | 'ar' | 'tn') => {
        setLang(l);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-md hover:bg-white/5"
            >
                <Globe className="w-5 h-5" />
                <span className="uppercase font-bold text-sm text-neon-blue">{lang}</span>
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-32 glass-panel overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                        <button
                            onClick={() => handleLanguageChange('en')}
                            className="w-full text-left px-4 py-2 hover:bg-white/10 text-sm flex items-center justify-between text-gray-200"
                        >
                            English {lang === 'en' && '✓'}
                        </button>
                        <button
                            onClick={() => handleLanguageChange('ar')}
                            className="w-full text-right px-4 py-2 hover:bg-white/10 text-sm flex items-center justify-between font-arabic text-gray-200 bg-black/20"
                        >
                            <span className="w-full text-right">العربية</span>
                            {lang === 'ar' && '✓'}
                        </button>
                        <button
                            onClick={() => handleLanguageChange('tn')}
                            className="w-full text-left px-4 py-2 hover:bg-white/10 text-sm flex items-center justify-between text-gray-200"
                        >
                            Derja {lang === 'tn' && '✓'}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
