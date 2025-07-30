import { useState } from "react";
import axios from "axios";
import InvoicePreview from "./InvoicePreview";
import InvoiceEditor from "./InvoiceEditor";
// import SendInvoiceButton from "./SendInvoiceButton";

const JobForm = () => {
  const [jobData, setJobData] = useState({
    clientName: "",
    jobDescription: "",
    estimatedHours: "",
    ratePerHour: "",
    dueDate: "",
  });

  const [invoice, setInvoice] = useState(""); // original from AI
  const [editedInvoice, setEditedInvoice] = useState(""); // user-edited
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false); // for invoice preview

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
      setEditedInvoice(res.data.reply); // default edit value = AI result
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
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Job Form</h2>
      <input type="text" name="clientName" placeholder="Client Name" className="input mb-2" onChange={handleChange} />
      <textarea name="jobDescription" placeholder="Job Description" className="input mb-2" onChange={handleChange}></textarea>
      <input type="number" name="estimatedHours" placeholder="Estimated Hours" className="input mb-2" onChange={handleChange} />
      <input type="number" name="ratePerHour" placeholder="Rate per Hour" className="input mb-2" onChange={handleChange} />
      <input type="date" name="dueDate" className="input mb-4" onChange={handleChange} />

      <button onClick={handleGenerateInvoice} className="btn btn-primary">
        {loading ? "Generating..." : "Generate Invoice"}
      </button>

      {invoice && (
        <InvoiceEditor
          invoice={editedInvoice}
          onChange={setEditedInvoice}
        />
      )}

      {invoice && (
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePreview}
            className="btn btn-secondary"
          >
            Preview Final Invoice
          </button>
        </div>
      )}

      {showPreview && (
        <div className="mt-6">
          <InvoicePreview invoiceText={editedInvoice} />
          {/* <SendInvoiceButton invoiceText={editedInvoice} jobData={jobData} /> */}
        </div>
      )}
    </div>
  );
};

export default JobForm;
