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
  const { prompt } = req.body;


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


app.post("/server/refine-invoice", async (req, res) => {
  const { invoiceText } = req.body;

  if (!invoiceText) {
    return res.status(400).json({ error: "Invoice text is required" });
  }

  const prompt = `
You are an invoice-generating assistant. Format the following invoice content as a fully styled HTML invoice using basic inline CSS. It should include sections like:
- Company Info
- Client Info
- Invoice Number & Date
- Line Items (Description, Hours, Rate, Total)
- Grand Total

Return valid HTML only.

Content:
${invoiceText}
`;

  try {
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile", // or other available model
    });

    const htmlInvoice = response.choices?.[0]?.message?.content;
    res.json({ html: htmlInvoice });
  } catch (error) {
    console.error("Error refining invoice:", error.message);
    res.status(500).json({
      error: "Failed to refine invoice",
      details: error.message,
    });
  }
});






// Start server
app.listen(PORT, () => {
  console.log(`🚀 Groq proxy server running on http://localhost:${PORT}`);
});
