import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { query } = await req.json();

    if (!query) {
      return NextResponse.json(
        { error: "Query is required." },
        { status: 400 }
      );
    }

    // Initialize the Gemini API
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Use the Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });    // Configure the generation (directly used in the generateContent call below)
    const genConfig = {
      temperature: 0.7,
      topP: 0.9,
      topK: 40,
      maxOutputTokens: 2048,
    };
    
    // Prepare the prompt with specific instructions for math problem solving
    const prompt = `
    You are a helpful math tutor. Please solve the following math problem step by step:

    ${query}

    1. First, understand what the problem is asking
    2. Show all your work step-by-step using clear mathematical notation
    3. Explain your reasoning at each step
    4. Provide the final answer clearly marked
    `;    // Generate the response with our configuration
    const result = await model.generateContent(prompt, genConfig);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ result: text }, { status: 200 });
  } catch (error) {
    console.error("Error in MathAI API:", error);
    return NextResponse.json(
      { error: "Failed to process your request. Please try again." },
      { status: 500 }
    );
  }
}
