import PersonalityTest from "@/components/PersonalityQuiz";

export default function QuizPage() {
    return (
        <div className="py-12 px-4">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold neon-text mb-4">Behavioral Vulnerability Scanner</h1>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Phishing attacks exploit human psychology, not just software bugs.
                    Take this 2-minute test to discover your unique psychological vulnerabilities.
                </p>
            </div>
            <PersonalityTest />
        </div>
    );
}
