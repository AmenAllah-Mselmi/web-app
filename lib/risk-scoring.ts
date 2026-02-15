export type RiskLevel = "Safe" | "Suspicious" | "High Risk";

export interface ScanResult {
    score: number;
    riskLevel: RiskLevel;
    details: string[];
    threatType?: string;
}

const SUSPICIOUS_DOMAINS = ["xyz", "top", "gq", "tk", "ml"];
const URGENCY_KEYWORDS = ["urgent", "verify", "update", "limit", "suspended", "login", "secure", "account"];
const BRAND_KEYWORDS = ["paypal", "apple", "google", "facebook", "netflix", "amazon", "bank"];

export function calculateRiskScore(input: string): ScanResult {
    let score = 0;
    const details: string[] = [];
    const lowerInput = input.toLowerCase();

    // 1. Check Protocol
    if (lowerInput.startsWith("http://")) {
        score += 20;
        details.push("Insecure protocol (HTTP) used.");
    }

    // 2. Check TLD
    if (SUSPICIOUS_DOMAINS.some(tld => lowerInput.endsWith("." + tld) || lowerInput.includes("." + tld + "/"))) {
        score += 30;
        details.push("Suspicious Top-Level Domain detected.");
    }

    // 3. Check Urgency Keywords
    const foundUrgency = URGENCY_KEYWORDS.filter(k => lowerInput.includes(k));
    if (foundUrgency.length > 0) {
        score += 15 * foundUrgency.length;
        details.push(`Contains urgency/action-oriented keywords: ${foundUrgency.join(", ")}`);
    }

    // 4. Check Brand Impersonation (Simple check)
    const foundBrands = BRAND_KEYWORDS.filter(k => lowerInput.includes(k));
    if (foundBrands.length > 0) {
        // If it contains a brand but is NOT that brand's official domain (simplified logic)
        // E.g. "google-secure.com" vs "google.com"
        // This is a naive check for the hackathon/demo
        score += 20;
        details.push(`Potential brand impersonation of: ${foundBrands.join(", ")}`);
    }

    // 5. Length/Entropy heuristic (long URLs are often suspicious)
    if (input.length > 50) {
        score += 10;
        details.push("URL is unusually long.");
    }

    // Cap score
    score = Math.min(score, 100);

    let riskLevel: RiskLevel = "Safe";
    if (score > 75) riskLevel = "High Risk";
    else if (score > 40) riskLevel = "Suspicious";

    return {
        score,
        riskLevel,
        details,
        threatType: score > 40 ? "Potential Phishing/Social Engineering" : "None Detected"
    };
}
