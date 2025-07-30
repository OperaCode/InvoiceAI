// Import dependencies
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const Groq = require("groq-sdk");

// Configure environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Initialize Groq SDK
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// API Route
app.post("/server/invoice-ai", async (req, res) => {
  // const { prompt } = req.body;

  // if (!prompt) {
  //   return res.status(400).json({ error: "Prompt is required" });
  // }

  const { jobData } = req.body;

  const prompt = `Create an invoice for:
- Client: ${jobData.clientName}
- Job: ${jobData.jobDescription}
- Hours: ${jobData.estimatedHours}
- Rate: $${jobData.ratePerHour}/hr
- Due Date: ${jobData.dueDate}`;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    const reply = response.choices[0]?.message?.content;
    console.log(reply)
    res.json({ reply });
  } catch (error) {
    console.error("❌ Groq API Error:", error.message);
    res.status(500).json({
      error: "Groq API call failed",
      details: error.message,
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Groq proxy server running on http://localhost:${PORT}`);
});
