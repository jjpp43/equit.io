export const runtime = "nodejs";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { inputText, readingLevel } = await req.json();

    // Prepare the base system and user prompt
    const baseSystemPrompt =
      `You are an assistant that helps summarize and rephrase text for people 
      with dyslexia. Always be clear and friendly. 
      Output ONLY valid JSON with two fields: summary and rephrased. 
      For the rephrased version, add newline characters after the end of a sentence.`;

    let userPrompt = `Here is some text:\n\n"${inputText}"\n\nPlease return a JSON object like this:
                      {
                        "summary": "...",
                        "rephrased": "..."
                      }\n\nSummarize it concisely.`;

    // Add rephrasing instructions only if not "default"
    if (readingLevel !== "default") {
      userPrompt += `\n\nThen, rephrase the original text using a ${readingLevel} tone/reading level.`;
    } else {
      userPrompt += `\n\nDo not rephrase the text. Just return an empty string for the "rephrased" field.`;
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: baseSystemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.5,
    });

    const rawOutput = response.choices[0].message.content;
    const parsed = JSON.parse(rawOutput || "{}");

    return new Response(JSON.stringify(parsed), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("AI Process Error:", error);
    return new Response(JSON.stringify({ error: "Something went wrong." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
