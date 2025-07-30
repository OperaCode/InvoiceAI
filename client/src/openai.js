import axios from "axios";

export const parsePrompt = async (prompt) => {
  try {
    const res = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "Extract invoice details from prompts into JSON. Format: {to, description, amount, currency, dueDate}",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0, // more deterministic results
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
      }
    );

    const message = res?.data?.choices?.[0]?.message?.content;
    return JSON.parse(message);
  } catch (error) {
    console.error("❌ OpenAI API Error:", error.response?.status, error.response?.data || error.message);

    if (error.response?.status === 429) {
      alert("⚠️ Rate limit exceeded. Please wait and try again.");
    }

    return null;
  }
};
