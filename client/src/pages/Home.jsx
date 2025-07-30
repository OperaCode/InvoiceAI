import React, { useState } from "react";
import InvoicePreview from "../components/InvoicePreview";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import JobForm from "../components/JobForm";
import InvoiceEditor from "../components/InvoiceEditor";

const Home = () => {
  const [text, setText] = useState("");
  const [invoice, setInvoice] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);

//   const handleGenerate = async () => {
//     setLoading(true);
//     const parsedInvoice = await parsePrompt(text);
//     if (parsedInvoice) setInvoice(parsedInvoice);
//     setLoading(false);
//   };

//   const handleAIResponse = (reply) => {
//     const lines = reply.split("\n").filter((line) => line.trim() !== "");
//     const parsed = {
//       clientName:
//         lines
//           .find((l) => l.toLowerCase().includes("client"))
//           ?.split(":")[1]
//           ?.trim() || "",
//       jobDescription:
//         lines
//           .find((l) => l.toLowerCase().includes("job"))
//           ?.split(":")[1]
//           ?.trim() || "",
//       amount:
//         lines
//           .find((l) => l.toLowerCase().includes("rate"))
//           ?.match(/\$\d+/)?.[0]
//           ?.replace("$", "") || "",
//       dueDate:
//         lines
//           .find((l) => l.toLowerCase().includes("due"))
//           ?.split(":")[1]
//           ?.trim() || "",
//     };
//     setInvoice(parsed);
//     setInvoiceText(reply);
//   };

  const handleSend = () => {
    alert("✅ Invoice sent to client (mocked)!");
    setInvoice(null);
    setShowPreview(false);
  };

  const parsePrompt = async (prompt) => {
    try {
      const res = await fetch("http://localhost:3000/server/generate-invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Unknown error");
      }

      const data = await res.json();
      console.log("✅ Groq says:", data.reply);
      return data.reply;
    } catch (error) {
      console.error("❌ Error talking to Groq API:", error.message);
      return "Something went wrong.";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">
        🧾 QuickBill - AI Invoice Generator
      </h1>
      <ConnectButton />

      {/* jobform */}
      <JobForm  />
      {/* <button
        className="bg-blue-600 text-white px-4 py-2 rounded mb-6"
        onClick={handleGenerateInvoice}
        disabled={loading}
      >
        {loading ? "Parsing..." : "Generate Invoice"}
      </button> */}

      {invoice && !showPreview && (
        <div className="bg-white p-4 rounded shadow w-full max-w-xl">
          <InvoiceEditor
            invoice={invoice}
            onChange={setInvoice}
            onPreview={() => setShowPreview(true)}
          />
        </div>
      )}

      {invoice && showPreview && (
        <div className="bg-white p-4 rounded shadow w-full max-w-xl mt-4">
          <InvoicePreview invoice={invoice} />
          <button
            className="bg-green-600 text-white px-4 py-2 rounded mt-4 w-full"
            onClick={handleSend}
          >
            Send Invoice
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
