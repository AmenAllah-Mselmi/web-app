"use client";

import Link from "next/link";
import { ShieldCheck, Menu, X, LogIn } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/lib/i18n";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useLanguage();

    return (
        <nav className="sticky top-0 z-50 glass-panel mb-0 mx-4 mt-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0">
                            <span className="flex items-center gap-2 text-xl font-bold text-neon-blue neon-text">
                                <ShieldCheck className="w-8 h-8" />
                                PhishShield AI
                            </span>
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                             <NavLink href="/">Home</NavLink>
                            <NavLink href="/scan">{t.nav.scanner}</NavLink>
                            <NavLink href="/#about">About Us</NavLink>
                            <NavLink href="/#contact">Contact</NavLink>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-4">
                        <LanguageSwitcher />
                        <Link href="/login" className="text-gray-300 hover:text-white transition-colors flex items-center gap-1 text-sm font-medium">
                            <LogIn className="w-4 h-4" />
                            {t.nav.login}
                        </Link>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass-panel mx-2 overflow-hidden"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <MobileNavLink href="/scan">{t.nav.scanner}</MobileNavLink>
                            <MobileNavLink href="/#about">About Us</MobileNavLink>
                            <MobileNavLink href="/#contact">Contact</MobileNavLink>
                            <div className="border-t border-gray-700 pt-4 mt-2">
                                <MobileNavLink href="/login">{t.nav.login}</MobileNavLink>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="text-gray-300 hover:bg-white/10 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
        >
            {children}
        </Link>
    );
}

function MobileNavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
        >
            {children}
        </Link>
    );
}
