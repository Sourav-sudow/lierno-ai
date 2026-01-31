export async function askAITutor(topic: string, question: string) {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mistralai/mistral-7b-instruct",
      messages: [
        {
          role: "system",
          content: `You are an AI Tutor.
Answer only questions related to ${topic}.
Explain in simple English.`,
        },
        {
          role: "user",
          content: question,
        },
      ],
      max_tokens: 150,
      temperature: 0.7,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`OpenRouter error ${res.status}: ${errText}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "No response from AI.";
}
