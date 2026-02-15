"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import ChatAssistant from "@/components/ChatAssistant";
import { Loader2, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setIsAuthenticated(!!session);
        };
        checkAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsAuthenticated(!!session);
            // Fermer la sidebar lors de la déconnexion
            if (!session) {
                setIsSidebarOpen(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    // Fermer la sidebar lors du changement de route
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [pathname]);

    // Pages publiques (sans authentification requise)
    const isPublicPage = pathname === "/" || pathname === "/login" || pathname === "/register" || pathname === "/about" || pathname === "/contact" || pathname === "/scan";

    if (isAuthenticated === null) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-neon-blue">
                <Loader2 className="w-10 h-10 animate-spin" />
            </div>
        );
    }

    // Layout pour utilisateurs authentifiés (avec sidebar)
    if (isAuthenticated && !isPublicPage) {
        return (
            <div className="min-h-screen bg-background flex relative overflow-hidden">
                {/* Mobile Header avec bouton menu */}
                <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-black/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 z-40">
                    <button 
                        onClick={() => setIsSidebarOpen(true)} 
                        className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                        aria-label="Ouvrir le menu"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    <span className="font-bold text-lg neon-text text-neon-blue">PhishShield</span>
                    <div className="w-10" /> {/* Élément vide pour équilibrer le layout */}
                </div>

                {/* Sidebar - Desktop (fixe) & Mobile (drawer) */}
                <div className={`
                    fixed inset-y-0 left-0 z-50 w-64 bg-black border-r border-white/10
                    transform transition-transform duration-300 ease-in-out
                    md:relative md:translate-x-0 md:w-64 md:flex-shrink-0
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                `}>
                    {/* Bouton fermer pour mobile */}
                    <div className="md:hidden flex justify-end p-4">
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="p-1 text-white hover:bg-white/10 rounded-lg"
                            aria-label="Fermer le menu"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    <Sidebar onLinkClick={() => setIsSidebarOpen(false)} />
                </div>

                {/* Overlay mobile */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm animate-fadeIn"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Contenu principal */}
                <main className="flex-1 w-full overflow-y-auto h-screen md:pt-0 pt-16">
                    <div className="container mx-auto px-4 py-6 md:py-8">
                        {children}
                    </div>
                    <ChatAssistant />
                </main>
            </div>
        );
    }

    // Layout pour pages publiques (avec navbar)
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
                {children}
            </main>
            <ChatAssistant />
            <Footer />
        </div>
    );
}