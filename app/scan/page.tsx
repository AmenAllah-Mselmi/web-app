import Scanner from "@/components/Scanner";

export default function ScanPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 neon-text">
                AI Threat Scanner
            </h1>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl">
                Analyze URLs, text messages, and emails instantly. Our AI engine detects behavioral patterns, brand impersonation, and zero-day phishing attacks.
            </p>

            <Scanner />
        </div>
    );
}
