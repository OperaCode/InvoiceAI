const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// POST /server/invoice-ai
const generateInvoiceAI = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
    });

    const reply = response.choices?.[0]?.message?.content;
    console.log("Groq Reply:", reply);
    res.json({ reply });
  } catch (error) {
    console.error("Groq API Error:", error.message);
    res
      .status(500)
      .json({ error: "Groq API call failed", details: error.message });
  }
};

// POST /server/refine-invoice
const refineInvoice = async (req, res) => {
  const { invoiceText } = req.body;

  if (!invoiceText) {
    return res.status(400).json({ error: "Invoice text is required" });
  }

  const prompt = `
You are an invoice-generating assistant. Format the following invoice content as a fully styled HTML invoice using basic inline CSS. It should include:
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
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
    });

    const htmlInvoice = response.choices?.[0]?.message?.content;
    res.json({ html: htmlInvoice });
  } catch (error) {
    console.error("❌ Error refining invoice:", error.message);
    res
      .status(500)
      .json({ error: "Failed to refine invoice", details: error.message });
  }
};

module.exports = { generateInvoiceAI, refineInvoice };
