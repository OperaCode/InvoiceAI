import React, { useState } from "react";
import InvoicePreview from "../components/InvoicePreview";
import { useAccount } from "wagmi";
// import { ConnectButton } from "@rainbow-me/rainbowkit";
import JobForm from "../components/JobForm";
import InvoiceEditor from "../components/InvoiceEditor";

const BASE_URL = import.meta.env.VITE_URL;

const Home = () => {
  const [text, setText] = useState("");
  // const [invoice, setInvoice] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);

  const [prompt, setPrompt] = useState("");
  const [invoice, setInvoice] = useState("");
  const [editedInvoice, setEditedInvoice] = useState("");
  // const [loading, setLoading] = useState(false);
  const [working, setWorking] = useState(false);
  // const [showPreview, setShowPreview] = useState(false);
  const [finalInvoice, setFinalInvoice] = useState("");

  // CTA Function for AI prompt
  const handleGenerateInvoice = async () => {
    if (!prompt.trim())
      return toast.error("Prompt is required, Enter a prompt !!!");
    setLoading(true);
    setShowPreview(false);

    try {
      const res = await axios.post(`${BASE_URL}/server/invoice-ai`, {
        prompt,
      });
      setInvoice(res.data.reply);
      setEditedInvoice(res.data.reply);
    } catch (err) {
      console.error("Failed to generate invoice", err);
    } finally {
      setLoading(false);
    }
  };

  // CTA for refine invoice
  const handleRefineInvoice = async () => {
    if (!editedInvoice.trim())
      return toast.error("Please edit the invoice first.");
    setWorking(true);
    setShowPreview(false);

    try {
      const res = await axios.post(`${BASE_URL}/server/refine-invoice`, {
        invoiceText: editedInvoice,
      });
      setFinalInvoice(res.data.reply); // assuming backend sends refined invoice in `reply`
      setShowPreview(true);
    } catch (err) {
      console.error("Failed to refine invoice", err);
      toast.error("Failed to generate final invoice.");
    } finally {
      setWorking(false);
    }
  };

  // CTA handle send email
  const handleSendEmail = async () => {
    if (!finalInvoice) return toast.error("No invoice to send.");

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "you@yourdomain.com",
          to: "client@example.com",
          subject: "📄 Your Invoice",
          html: finalInvoice,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data);
        return toast.error("Failed to send email.");
      }

      toast.success("📧 Invoice sent successfully!");
    } catch (error) {
      console.error("Resend error:", error);
      toast.error("Error sending invoice.");
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-900 via-purple-900 to-blue-800 text-white px-6 py-12">
      
      {/* Header */}
      <header className="text-center mb-12">
        <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400">
              InvoiceAI
            </h1>
            <div className="hidden md:flex space-x-8">
              <a
                href="/"
                className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
              >
                Exit App
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Header*/}
      <div className="m-auto text-center py-6">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight bg-gradient-to-r from-cyan-300 via-white to-purple-300 text-transparent bg-clip-text">
          InvoiceAI - AI Invoice Generator
        </h1>
        <p className="text-lg text-white/80 max-w-xl mx-auto">
          Automate your invoicing with AI. Fill in job details, preview, and
          send in seconds.
        </p>
      </div>

      {/* Connect Wallet */}
      {/* <div className="mb-8 flex justify-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-lg px-6 py-4 border border-white/20 shadow-md">
          <ConnectButton />
        </div>
      </div> */}

      <div className="w-full max-w-2xl mx-auto bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg p-6 text-white">
        <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 text-transparent bg-clip-text">
          🧠 AI-Powered Invoice Generator
        </h2>

        {/* AI Prompt for new invoice */}
        <textarea
          className="w-full px-4 py-3 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none mb-4"
          rows={5}
          placeholder="Describe your job or task to generate an invoice. E.g., 'Create an invoice for Jane Doe for graphic design services, $500, due August 20'"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        {/* CTA-generate invoice */}
        <button
          onClick={handleGenerateInvoice}
          disabled={loading}
          className={`w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-600 hover:to-indigo-700 transition-all ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Generating Invoice..." : "Generate Invoice"}
        </button>

        {/* Invoice Editor */}
        {invoice && (
          <div className="mt-8 bg-white text-gray-900 p-4 rounded-xl shadow-lg">
            <InvoiceEditor
              invoice={editedInvoice}
              onChange={setEditedInvoice}
            />

            {/* CTA - refine invoice */}
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

        {/* Invoice Preview */}
        {showPreview && (
          <div className="mt-6 bg-white text-gray-900 p-4 rounded-xl shadow-lg">
            <InvoicePreview invoiceText={editedInvoice} />

            {/* CTA- SEND BY EMAIL */}
            <div className="mt-8 flex justify-end space-x-4">
              {/* Send as Email */}
              <button
                onClick={() => handleSendEmail()}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
              >
                Send via Email
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
