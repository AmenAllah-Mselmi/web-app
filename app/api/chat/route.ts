import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        // Get the last user message
        const userMessage = messages[messages.length - 1].content;

        // Create the model
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // tailored system prompt
        const systemPrompt = `
      You are PhishShield Sentinel, an elite cybersecurity AI assistant tailored for the Tunisian context. 
      Your goal is to help users detect phishing (email, SMS, social media), quishing (QR codes), and social engineering attacks.
      
      Guidelines:
      1. Analyze any text or link provided for signs of scams.
      2. If a user asks about "Tunisie Telecom", "La Poste", or banks, be extra vigilant about common Tunisian scams (e.g., "Mabrouk rba7t").
      3. Explain *why* something is suspicious (e.g., "Urgency", "Mismatched domain").
      4. Keep answers concise, helpful, and reassuring.
      5. Support English, French, Arabic, and Tunisian Dialect (Derja).
      
      User Input: ${userMessage}
    `;

        const result = await model.generateContent(systemPrompt);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ role: "assistant", content: text });
    } catch (error) {
        console.error("Gemini API Error:", error);
        return NextResponse.json(
            { error: "Failed to process request" },
            { status: 500 }
        );
    }
}
