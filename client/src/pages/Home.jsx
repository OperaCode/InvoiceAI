import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { marked } from "marked";
import InvoiceEditor from "../components/InvoiceEditor";
import InvoicePreview from "../components/InvoicePreview";
import { sendInvoiceEmail } from "../util/email";

const BASE_URL = import.meta.env.VITE_URL;

const Home = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [working, setWorking] = useState(false);
  const [sending, setSending] = useState(false);
const [jobData, setJobData] = useState({
  clientName: "",
  clientEmail: "",
  jobDescription: "",
  estimatedHours: "",
  ratePerHour: "",
  dueDate: "",
});

  const [prompt, setPrompt] = useState("");
  const [invoice, setInvoice] = useState("");
  const [editedInvoice, setEditedInvoice] = useState("");
  const [finalInvoice, setFinalInvoice] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");

  // Generate invoice from prompt
  const handleGenerateInvoice = async () => {
    if (!prompt.trim()) return toast.error("Prompt is required!");

    setLoading(true);
    setShowPreview(false);

    try {
      const res = await axios.post(`${BASE_URL}/server/invoice-ai`, {
        prompt,
      });
      setInvoice(res.data.message);
      setEditedInvoice(res.data.message);
      setFinalInvoice(res.data.message);
    } catch (err) {
      console.error("Failed to generate invoice", err);
      toast.error("Error generating invoice.");
    } finally {
      setLoading(false);
    }
  };

  // Refine invoice
  const handleRefineInvoice = async () => {
    if (!editedInvoice.trim())
      return toast.error("Please edit the invoice first.");

    setWorking(true);
    setShowPreview(false);

    try {
      const res = await axios.post(`${BASE_URL}/server/refine-invoice`, {
        invoiceText: editedInvoice,
      });
      console.log(res)
      setFinalInvoice(res.data.html);
      setShowPreview(true);
    } catch (err) {
      console.error("Failed to refine invoice", err);
      toast.error("Failed to generate final invoice.");
    } finally {
      setWorking(false);
    }
  };

  // Send invoice email using EmailJS
 const handleSendEmail = async () => {
  try {
    // Ensure required fields are filled
    if (!jobData.clientEmail || !jobData.clientName) {
      toast.error("Please enter client name and email.");
      return;
    }

    const hoursWorked = parseFloat(jobData.estimatedHours);
    const ratePerHour = parseFloat(jobData.ratePerHour);
    const subtotal = hoursWorked * ratePerHour;
    const tax = subtotal * 0.075; // 7.5% tax
    const total = subtotal + tax;

    await sendInvoiceEmail({
      to_email: jobData.clientEmail,
      to_name: jobData.clientName,
      invoice_id: `INV-${Date.now().toString().slice(-6)}`,
      invoice_date: new Date().toLocaleDateString(),
      due_date: jobData.dueDate || "N/A",
      job_description: jobData.jobDescription || "N/A",
      rate_per_hour: ratePerHour.toFixed(2),
      hours_worked: hoursWorked.toFixed(1),
      job_total: total.toFixed(2),
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
    });

    toast.success("Invoice email sent successfully!");
  } catch (error) {
    toast.error("Failed to send invoice email.");
    console.error("Send invoice error:", error);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-900 via-purple-900 to-blue-800 text-white px-6 py-12">
      <header className="text-center mb-12">
        <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400">
              InvoiceAI
            </h1>
            <div className="hidden md:flex space-x-8">
              <a
                href="/"
                className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition cursor-pointer font-bold"
              >
                Exit App
              </a>
            </div>
          </div>
        </nav>
      </header>

      <div className="m-auto text-center py-6">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight bg-gradient-to-r from-cyan-300 via-white to-purple-300 text-transparent bg-clip-text">
          InvoiceAI - AI Invoice Generator
        </h1>
        <p className="text-lg text-white/80 max-w-xl mx-auto">
          Automate your invoicing with AI. Write your prompt, preview, and send
          in seconds.
        </p>
      </div>

      <div className="w-full max-w-2xl mx-auto bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg p-6 text-white">
        <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 text-transparent bg-clip-text">
          🧠 AI-Powered Invoice Generator
        </h2>

        <textarea
          className="w-full px-4 py-3 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none mb-4"
          rows={5}
          placeholder="Describe your job or task to generate an invoice."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button
          onClick={handleGenerateInvoice}
          disabled={loading}
          className={`w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-600 hover:to-indigo-700 transition-all ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Generating Invoice..." : "Generate Invoice"}
        </button>

        {invoice && (
          <div className="mt-8 bg-white text-gray-900 p-4 rounded-xl shadow-lg">
            <InvoiceEditor
              invoice={editedInvoice}
              onChange={setEditedInvoice}
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleRefineInvoice}
                className="w-2/3 text-white py-3 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-600 hover:to-indigo-700 transition-all"
              >
                {working ? "Working..." : "Generate Final AI Invoice"}
              </button>
            </div>
          </div>
        )}

        {showPreview && (
          <div className="mt-6 bg-white text-gray-900 p-4 rounded-xl shadow-lg">
            <InvoicePreview invoiceText={editedInvoice} />



            <div className="mt-8 space-y-2">
              <label
                htmlFor="clientEmail"
                className="block text-sm font-medium"
              >
                Enter Client Email
              </label>
              <input
                type="email"
                name="clientEmail"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-white/20 placeholder-white/60 border border-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                placeholder="client@example.com"
              />
              <button
                onClick={handleSendEmail}
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
              >
                {sending ? "Sending..." : "Send Email"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
