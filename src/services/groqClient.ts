/**
 * Lightweight Groq API helper.
 * Wraps fetch and keeps the API key in Vite env vars so it never lands in the bundle.
 */

type GroqChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

const getGroqConfig = () => {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("Missing VITE_GROQ_API_KEY. Add it to .env.local (not committed).");
  }

  const baseUrl = import.meta.env.VITE_GROQ_API_BASE_URL ?? "https://api.groq.com/openai/v1";

  return { apiKey, baseUrl };
};

export const groqClient = {
  async createChatCompletion(params: {
    model: string;
    messages: GroqChatMessage[];
    temperature?: number;
    maxTokens?: number;
    stream?: boolean;
  }) {
    const { apiKey, baseUrl } = getGroqConfig();

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: params.model,
        messages: params.messages,
        temperature: params.temperature ?? 0.7,
        max_tokens: params.maxTokens,
        stream: params.stream ?? false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Failed to read error body");
      throw new Error(`Groq API error (${response.status}): ${errorText}`);
    }

    return response.json();
  },
};

export type { GroqChatMessage };
