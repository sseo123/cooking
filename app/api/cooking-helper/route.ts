import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Invalid message format" },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a focused cooking assistant that ONLY helps with two specific things:
1. Converting cooking measurements (e.g., cups to ml, tablespoons to teaspoons, oz to grams)
2. Explaining cooking techniques and recipe steps in simple terms (e.g., what "fold in" means, how to know when something is caramelized, what "al dente" means)

IMPORTANT RULES:
- Keep responses SHORT and PRACTICAL (2-3 sentences maximum)
- If asked about anything else (recipes, ingredients to buy, meal planning, nutrition advice, etc.), politely say: "I'm specialized in measurement conversions and cooking technique explanations. Please ask me about those topics!"
- Be friendly but concise
- Use common units (cups, tablespoons, ml, grams, oz, etc.)
- For technique questions, give clear, actionable explanations

Examples of what you SHOULD answer:
- "How many ml in 2 cups?"
- "What does it mean to blanch vegetables?"
- "How do I know when caramelized onions are done?"
- "Convert 350°F to Celsius"

Examples of what you should DECLINE:
- "What should I cook for dinner?"
- "Is this recipe healthy?"
- "Where can I buy saffron?"
- "Can you write me a recipe?"`,
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    const reply = completion.choices[0]?.message?.content || "I couldn't generate a response. Please try again.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Cooking helper API error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
