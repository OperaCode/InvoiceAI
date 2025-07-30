import { useState } from "react";
import axios from "axios";
import InvoicePreview from "./InvoicePreview";
import InvoiceEditor from "./InvoiceEditor";

const JobForm = () => {
  const [jobData, setJobData] = useState({
    clientName: "",
    jobDescription: "",
    estimatedHours: "",
    ratePerHour: "",
    dueDate: "",
  });

  const [invoice, setInvoice] = useState("");
  const [editedInvoice, setEditedInvoice] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleGenerateInvoice = async () => {
    setLoading(true);
    setShowPreview(false);
    try {
      const res = await axios.post("http://localhost:3000/server/invoice-ai", {
        jobData,
      });
      setInvoice(res.data.reply);
      setEditedInvoice(res.data.reply);
    } catch (err) {
      console.error("Failed to generate invoice", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg p-6 text-white">
      <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 text-transparent bg-clip-text">
        ✨ AI Job-to-Invoice Form
      </h2>

      <div className="grid gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-white/80">Client Name (your company or business name)</label>
          <input
            type="text"
            name="clientName"
            placeholder="e.g., John Doe"
            className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-white/80">Job Description</label>
          <textarea
            name="jobDescription"
            placeholder="e.g., Web design for crypto platform"
            className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white/60 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-400"
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-white/80">Estimated Hours</label>
            <input
              type="number"
              name="estimatedHours"
              placeholder="e.g., 10"
              className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-white/80">Rate Per Hour ($)</label>
            <input
              type="number"
              name="ratePerHour"
              placeholder="e.g., 50"
              className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-white/80">Due Date</label>
          <input
            type="date"
            name="dueDate"
            className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            onChange={handleChange}
          />
        </div>
      </div>

      <button
        onClick={handleGenerateInvoice}
        disabled={loading}
        className={`mt-6 w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-600 hover:to-indigo-700 transition-all ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Generating..." : "Generate Invoice with AI"}
      </button>

      {/* Invoice Editor */}
      {invoice && (
        <div className="mt-8 bg-white text-gray-900 p-4 rounded-xl shadow-lg">
          <InvoiceEditor invoice={editedInvoice} onChange={setEditedInvoice} />
          <div className="mt-4 flex justify-end">
            <button
              onClick={handlePreview}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Preview Final Invoice
            </button>
          </div>
        </div>
      )}

      {/* Invoice Preview */}
      {showPreview && (
        <div className="mt-6 bg-white text-gray-900 p-4 rounded-xl shadow-lg">
          <InvoicePreview invoiceText={editedInvoice} />
        </div>
      )}
    </div>
  );
};

export default JobForm;
