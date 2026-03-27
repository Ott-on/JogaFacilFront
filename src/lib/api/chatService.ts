const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

/**
 * Send a message to the FastAPI/Gemini backend and return the AI response text.
 */
export async function sendMessage(message: string): Promise<string> {
  const res = await fetch(`${API_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) {
    throw new Error(`Chat API error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  // Backend should return { response: string }
  return (data.response as string) ?? data.message ?? JSON.stringify(data);
}
