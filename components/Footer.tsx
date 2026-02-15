import { useLanguage } from "@/lib/i18n";

export default function Footer() {
    const { t } = useLanguage();
    return (
        <footer className="glass-panel mt-auto mx-4 mb-4 py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
                <p>&copy; 2026 PhishShield AI. {t.footer.rights}</p>
                <p className="text-sm mt-2">{t.footer.desc}</p>
            </div>
        </footer>
    );
}
