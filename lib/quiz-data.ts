export type Trait = "Impulsiveness" | "Trust" | "Fear" | "Authority" | "Curiosity";

export interface Question {
    id: number;
    text: string;
    trait: Trait;
    options: { text: string; score: number }[];
}

export const questions: Question[] = [
    // --- AUTHORITY (3 Questions) ---
    {
        id: 1,
        text: "You receive an email from 'HR Dept' saying your payroll is suspended unless you update info immediately.",
        trait: "Authority",
        options: [
            { text: "Update immediately to avoid issues.", score: 10 },
            { text: "Check the sender's email address closely.", score: 3 },
            { text: "Call HR directly to verify.", score: 0 },
        ],
    },
    {
        id: 2,
        text: "A police officer calls saying you have unpaid fines and must pay now to avoid arrest.",
        trait: "Authority",
        options: [
            { text: "Panic and pay to stay out of jail.", score: 10 },
            { text: "Ask for a badge number and callback number.", score: 4 },
            { text: "Hang up, it's a common scam.", score: 0 },
        ],
    },
    {
        id: 3,
        text: "Your boss emails from a personal address asking you to buy gift cards for a client urgently.",
        trait: "Authority",
        options: [
            { text: "Do it quickly to impress the boss.", score: 10 },
            { text: "Reply asking why they are using a personal email.", score: 5 },
            { text: "Verify via Slack or phone call.", score: 0 },
        ],
    },

    // --- FEAR (3 Questions) ---
    {
        id: 4,
        text: "A browser popup says 'VIRUS DETECTED! Call Microsoft Support immediately.'",
        trait: "Fear",
        options: [
            { text: "Call the number right away!", score: 10 },
            { text: "Download the 'antivirus' they suggest.", score: 8 },
            { text: "Close the browser tab/force quit.", score: 0 },
        ],
    },
    {
        id: 5,
        text: "You get a text: 'Your bank account has been compromised. Click to freeze.'",
        trait: "Fear",
        options: [
            { text: "Click the link immediately to save my money.", score: 10 },
            { text: "Log in via the official bank app instead.", score: 0 },
            { text: "Ignore it.", score: 5 }, // Risky to ignore real threats, but safe from phishing
        ],
    },
    {
        id: 6,
        text: "An email threatens to release embarrassing photos of you unless you pay Bitcoin.",
        trait: "Fear",
        options: [
            { text: "Pay the ransom just in case.", score: 10 },
            { text: "Reply asking for proof.", score: 5 },
            { text: "Mark as spam and ignore (Sextortion scam).", score: 0 },
        ],
    },

    // --- CURIOSITY (3 Questions) ---
    {
        id: 7,
        text: "You find a USB drive labeled 'Executive Salaries 2025' in the parking lot.",
        trait: "Curiosity",
        options: [
            { text: "Plug it in to see the files.", score: 10 },
            { text: "Plug it in but scan for viruses first.", score: 7 },
            { text: "Hand it to IT security/Police.", score: 0 },
        ],
    },
    {
        id: 8,
        text: "A friend sends a vague link: 'OMG is this you?? hahaha'",
        trait: "Curiosity",
        options: [
            { text: "Click it immediately to see.", score: 10 },
            { text: "Ask 'What is this?' first.", score: 3 },
            { text: "Delete it.", score: 0 },
        ],
    },
    {
        id: 9,
        text: "An ad offers 'Leaked Game of Thrones Scripts - Download PDF'.",
        trait: "Curiosity",
        options: [
            { text: "Download it!", score: 10 },
            { text: "Search Google to see if leaks are real.", score: 4 },
            { text: "Ignore, likely malware.", score: 0 },
        ],
    },

    // --- IMPULSIVENESS (3 Questions) ---
    {
        id: 10,
        text: "You see a limited-time offer: '90% OFF iPhone 15 - Next 5 Minutes Only!'",
        trait: "Impulsiveness",
        options: [
            { text: "Buy it now before it's gone!", score: 10 },
            { text: "Check the site reviews quickly.", score: 4 },
            { text: "Too good to be true, ignore.", score: 0 },
        ],
    },
    {
        id: 11,
        text: "You're typing a password and a 'Software Update' popup appears.",
        trait: "Impulsiveness",
        options: [
            { text: "Click 'Update' to get it over with.", score: 10 },
            { text: "Click 'Remind me later'.", score: 5 },
            { text: "Verify the update source manually.", score: 0 },
        ],
    },
    {
        id: 12,
        text: "A QR code on a parking meter says 'Scan to Pay' (sticker looks new).",
        trait: "Impulsiveness",
        options: [
            { text: "Scan and pay quickly.", score: 10 },
            { text: "Check if the sticker is covering the original.", score: 2 },
            { text: "Use the official app or cash.", score: 0 },
        ],
    },

    // --- TRUST (3 Questions) ---
    {
        id: 13,
        text: "A charity emails asking for donations for a recent disaster.",
        trait: "Trust",
        options: [
            { text: "Donate via the link provided.", score: 10 },
            { text: "Go to the official charity website manually.", score: 0 },
            { text: "Assume it's a scam.", score: 2 },
        ],
    },
    {
        id: 14,
        text: "Someone on LinkedIn offers you a high-paying job with no interview.",
        trait: "Trust",
        options: [
            { text: "Accept and send my details!", score: 10 },
            { text: "Engage conversation to learn more.", score: 6 },
            { text: "Report profile as fake.", score: 0 },
        ],
    },
    {
        id: 15,
        text: "A 'Microsoft Tech' calls saying they detected an error on your PC.",
        trait: "Trust",
        options: [
            { text: "Follow their instructions to fix it.", score: 10 },
            { text: "Ask for their employee ID.", score: 6 },
            { text: "Hang up. Microsoft doesn't call you.", score: 0 },
        ],
    }
];

export interface AnalysisResult {
    totalScore: number;
    maxTrait: Trait;
    archetype: string;
    description: string;
    simulation: string;
    trainingFocus: string;
}

export function calculateAdvancedPersonality(answers: Record<number, number>): AnalysisResult {
    let totalScore = 0;
    const traitScores: Record<Trait, number> = {
        "Authority": 0, "Fear": 0, "Curiosity": 0, "Impulsiveness": 0, "Trust": 0
    };

    for (const [qId, score] of Object.entries(answers)) {
        const question = questions.find(q => q.id === parseInt(qId));
        if (question) {
            traitScores[question.trait] += score;
            totalScore += score;
        }
    }

    // Find dominant trait
    let maxTrait: Trait = "Impulsiveness";
    let maxScore = -1;
    for (const [trait, score] of Object.entries(traitScores)) {
        if (score > maxScore) {
            maxScore = score;
            maxTrait = trait as Trait;
        }
    }

    // Define Archetypes
    let archetype = "The Cyber Sentinel";
    let description = "You are highly vigilant and verify sources naturally. Keep it up!";
    let simulation = "Advanced Spear Phishing (CEO Fraud)";
    let trainingFocus = "Deepfakes & AI Voice Cloning";

    if (totalScore > 80) {
        if (maxTrait === "Authority") {
            archetype = "The Obedient Executive";
            description = "You have a high respect for hierarchy, making you vulnerable to CEO Fraud and fake government/police demands.";
            simulation = "Fake CEO 'Urgent Wire Transfer' Request";
            trainingFocus = "Verifying Authority Channels";
        } else if (maxTrait === "Fear") {
            archetype = "The Anxious Defender";
            description = "Scammers can easily panic you into making mistakes with 'Account Suspended' or 'Virus Detected' alerts.";
            simulation = "Ransomware Countdown Timer Simulation";
            trainingFocus = "Emotional Regulation in Cybersecurity";
        } else if (maxTrait === "Curiosity") {
            archetype = "The Curious Clicker";
            description = "Your desire to know makes you click on 'Leaked Docs' or 'Mystery Links' without checking the source.";
            simulation = "Malicious 'Salary Spreadsheet' USB Drop";
            trainingFocus = "Safe Browsing & File Handling";
        } else if (maxTrait === "Impulsiveness") {
            archetype = "The Speed Racer";
            description = "You act before you think. Urgency-based scams (Limited Time Offers) are your kryptonite.";
            simulation = "Fake '90% Off' Flash Sale Landing Page";
            trainingFocus = "Slow Down: The 10-Second Rule";
        } else if (maxTrait === "Trust") {
            archetype = "The Benevolent Believer";
            description = "You assume the best in people. Scammers exploit your kindness with charity fraud and fake job offers.";
            simulation = "Fake GoFundMe/Charity Campaign";
            trainingFocus = "Zero Trust Mindset";
        }
    } else if (totalScore > 40) {
        archetype = "The Occasional Skeptic";
        description = "You catch most scams but can be tricked when distracted or tired.";
        simulation = "Subtle 'Password Expiry' Notification";
        trainingFocus = "Identifying Contextual Phishing";
    }

    return { totalScore, maxTrait, archetype, description, simulation, trainingFocus };
}
