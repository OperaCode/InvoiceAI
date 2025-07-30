import React, { useState } from "react";
import InvoicePreview from "../components/InvoicePreview";
import { useAccount } from "wagmi";
// import { ConnectButton } from "@rainbow-me/rainbowkit";
import JobForm from "../components/JobForm";
import InvoiceEditor from "../components/InvoiceEditor";

const Home = () => {
  const [text, setText] = useState("");
  const [invoice, setInvoice] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    alert("✅ Invoice sent to client (mocked)!");
    setInvoice(null);
    setShowPreview(false);
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
      <div className="m-auto text-center p-3">
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

      {/* Job Form */}
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-xl rounded-xl p-6 mb-10 border border-white/10 shadow-lg">
        <JobForm />
      </div>

      
    </div>
  );
};

export default Home;
