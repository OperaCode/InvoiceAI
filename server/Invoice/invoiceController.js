const Groq = require("groq-sdk");
const dotenv = require("dotenv");
dotenv.config();


// configure and authorise groq AI
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// POST request to generate invoice from prompt
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
    
    // Debug
    console.log("Groq Reply:", reply);


    res.status(200).json({ message: reply });
  } catch (error) {
    console.error("Groq API Error:", error.message);
    res
      .status(500)
      .json({ error: "Groq API call failed", details: error.message });
  }
};

// POST request to generate final edited invoice
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
    res.status(200).json({ success: true, html: htmlInvoice });

  } catch (error) {
    console.error("❌ Error refining invoice:", error.message);
    res
      .status(500)
      .json({ error: "Failed to refine invoice", details: error.message });
  }
};

// send final invoice by email 
// const sendInvoiceEmail = async (req, res) => {
//   const { to, html } = req.body;
//   console.log(html)
// console.log(req.body)
//   if (!to || !html) {
//     return res.status(400).json({ error: "Recipient and HTML required" });
//   }

//   try {
//     const response = await fetch("https://api.resend.com/emails", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         from: "onboarding@resend.dev",
//         to,
//         subject: "📄 Your AI Invoice",
//         html,
//       }),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       console.error("Resend error:", data);
//       return res.status(500).json({ error: "Failed to send email" });
//     }

//     res.status(200).json({ success: true, message: "Email sent!" });
//   } catch (err) {
//     console.error("Email error:", err.message);
//     res.status(500).json({ error: "Failed to send email", details: err.message });
//   }
// };


module.exports = { generateInvoiceAI, refineInvoice};
