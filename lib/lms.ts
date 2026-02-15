import { supabase } from '@/lib/supabase';

export interface Module {
    id: string;
    title: string;
    description: string;
    duration: string;
    xp: number;
    chapters: Chapter[];
    quiz: QuizQuestion[];
}

export interface Chapter {
    id: string;
    title: string;
    content: string; // Markdown supported
    videoUrl?: string; // Optional embedded video/image
}

export interface QuizQuestion {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number; // Index
    explanation: string;
}

export const COURSES: Module[] = [
    {
        id: "phishing-101",
        title: "Phishing 101: Spot the Bait",
        description: "Learn how to identify malicious emails and websites before they steal your data.",
        duration: "15 min",
        xp: 100,
        chapters: [
            {
                id: "intro",
                title: "What is Phishing?",
                content: `### The Art of Deception\nPhishing is a cybercrime in which a target or targets are contacted by email, telephone or text message by someone posing as a legitimate institution.\n\n**Common Indicators:**\n*   Urgency ("Act now or your account will be closed!")\n*   Generic Greetings ("Dear Customer")\n*   Suspicious Domains (e.g., \`paypa1.com\` instead of \`paypal.com\`)`
            },
            {
                id: "email-analysis",
                title: "Analyzing an Email Header",
                content: `### Don't Trust the Display Name\nAttackers can easily change the "From" name to display "Netflix Support".\n\n**Always check the actual email address.**\n\n1.  Hover over the link (don't click!).\n2.  Look for mismatched URLs.\n3.  Check for spelling errors.`
            }
        ],
        quiz: [
            {
                id: 1,
                question: "Which of these is a sign of a phishing email?",
                options: [
                    "It addresses you by your full name",
                    "It comes from a public domain like @gmail.com claiming to be your bank",
                    "It has no links",
                    "It is written in perfect grammar"
                ],
                correctAnswer: 1,
                explanation: "Legitimate organizations rarely use public domains like @gmail.com for official communication."
            },
            {
                id: 2,
                question: "What should you do if you receive a suspicious email?",
                options: [
                    "Reply and ask if it's real",
                    "Click the link to check",
                    "Report it to IT or delete it",
                    "Forward it to all your friends"
                ],
                correctAnswer: 2,
                explanation: "Reporting it helps protect others. Clicking or replying verifies your email exists to the attacker."
            }
        ]
    },
    {
        id: "quishing-defense",
        title: "Quishing: QR Code Phishing",
        description: "QR codes are everywhere. Learn how attackers hijack them to bypass security filters.",
        duration: "10 min",
        xp: 150,
        chapters: [
            {
                id: "intro",
                title: "The Silent Threat",
                content: `### What is Quishing?\nQuishing (QR Phishing) involves using QR codes to direct victims to malicious websites. Because the URL is encoded in the image, traditional email filters often miss them.`
            },
            {
                id: "defense",
                title: "How to Stay Safe",
                content: `### Inspect Before You Scan\n1.  **Physical Tampering**: Check if a sticker has been placed *over* a legitimate QR code.\n2.  **Preview the URL**: Most modern phone cameras show the URL before opening strictly. Read it!`
            }
        ],
        quiz: [
            {
                id: 1,
                question: "Why is Quishing dangerous?",
                options: [
                    "QR codes can explode your phone",
                    "It bypasses text-based email filters",
                    "It only works on Android",
                    "It requires a special app"
                ],
                correctAnswer: 1,
                explanation: "Security filters designed to scan text often cannot decode and inspect images/QR codes."
            },
            {
                id: 2,
                question: "You see a QR code on a parking meter with a sticker that looks peeled. What do you do?",
                options: [
                    "Scan it quickly",
                    "Pay with cash or use the official app instead",
                    "Peel it off",
                    "Ask a stranger to scan it"
                ],
                correctAnswer: 1,
                explanation: "Physical tampering is a major red flag. Use an alternative payment method."
            }
        ]
    }
];

export async function getUserProgress(userId: string) {
    const { data } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId);
    return data || [];
}

export async function recordProgress(moduleId: string, status: string, score: number = 0) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase
        .from('user_progress')
        .upsert({
            user_id: user.id,
            module_id: moduleId,
            status,
            score,
            completed_at: status === 'completed' ? new Date().toISOString() : null
        }, { onConflict: 'user_id, module_id' });
}
