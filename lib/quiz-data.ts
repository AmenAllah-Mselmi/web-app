export type Trait = "Impulsiveness" | "Trust" | "Fear" | "Authority" | "Curiosity";

export interface Question {
    id: number;
    trait: Trait;
}

export const questions: Question[] = [
    { id: 1, trait: "Authority" },
    { id: 2, trait: "Authority" },
    { id: 3, trait: "Authority" },
    { id: 4, trait: "Fear" },
    { id: 5, trait: "Fear" },
    { id: 6, trait: "Fear" },
    { id: 7, trait: "Curiosity" },
    { id: 8, trait: "Curiosity" },
    { id: 9, trait: "Curiosity" },
    { id: 10, trait: "Impulsiveness" },
    { id: 11, trait: "Impulsiveness" },
    { id: 12, trait: "Impulsiveness" },
    { id: 13, trait: "Trust" },
    { id: 14, trait: "Trust" },
    { id: 15, trait: "Trust" }
];

export interface AnalysisResult {
    totalScore: number;
    maxTrait: Trait;
    archetype: string;
    description: string;
    simulation: string;
    trainingFocus: string;
}

export function calculateAdvancedPersonality(answers: Record<number, number>, t: any): AnalysisResult {
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

    // Use translations for results
    const resultKey = totalScore > 80 ? maxTrait : (totalScore > 40 ? "average" : "safe");
    const resultData = t.quiz.results[resultKey];

    return {
        totalScore,
        maxTrait,
        archetype: resultData.archetype,
        description: resultData.description,
        simulation: resultData.simulation,
        trainingFocus: resultData.trainingFocus
    };
}
