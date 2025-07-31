import { Resend } from "resend";
import { useRef } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { sendInvoiceEmail } from "../util/email";

const InvoicePreview = ({ invoiceText }) => {
  const [recipientEmail,setRecipientEmail] =useState("")
  const [sending,setSending] = useState(false)
  if (!invoiceText) return null;
  
  console.log("🧾 invoiceText:", invoiceText);

  // Match lines like "**Label:** Value" or "* **Label:** Value"
  const regex = /\*{1,2}\s?\*{0,1}([A-Za-z #]+):\*\*?\s*(.+)/g;
  const invoiceData = {};
  let match;

  while ((match = regex.exec(invoiceText)) !== null) {
    const key = match[1].trim();
    const value = match[2].trim();
    invoiceData[key] = value;
  }

  // Extract client name from "Billing Information" 
  const extractClientName = () => {
    const billingInfo = invoiceData["Billing Information"] || invoiceData["Bill To"];
    if (!billingInfo) return "N/A";

    const match = billingInfo.match(/\*\*Bill To:\*\* (.+)/);
    return match ? match[1] : "N/A";
  };



  const extractServices = () => {
    const serviceInfo = invoiceData["Service Details"] || invoiceData["Bill To"];
    if (!serviceInfo) return "N/A";

    const match = serviceInfo.match(/\*\*Service Description:\*\* (.+)/);
    return match ? match[1] : "N/A";
  };

// const extractClientName = () => {
//   return invoiceData["Billing Information"]?.split("\n")[0] || "N/A";
// };

  

const handleSendEmail = async () => {
  if (!invoiceData) {
    return toast.error("No invoice to send.");
  }

  if (!recipientEmail || !recipientEmail.includes("@")) {
    return toast.error("Please enter a valid recipient email.");
  }

  try {
    console.log("Sending to:", recipientEmail);

    await sendInvoiceEmail({
      to_name: invoiceData["Billing Information"] || "Client",
      to_email: recipientEmail.trim(),
      invoice_id: invoiceData["Invoice Number"] || "N/A",
      invoice_date: invoiceData["Date"] || "N/A",
      due_date: "August 15, 2024", // Hardcoded from invoiceText or parse dynamically
      job_description: invoiceData["Description of Services"] || "N/A",
      rate_per_hour: invoiceData["Unit Price"] || "0",
      hours_worked: invoiceData["Quantity"] || "1",
      job_total:
        parseFloat(invoiceData["Total"]?.replace("$", "")) || 0,
      subtotal:
        parseFloat(invoiceData["Subtotal"]?.replace("$", "")) || 0,
      tax: parseFloat(invoiceData["Tax (0%)"]?.replace("$", "")) || 0,
      total_due:
        parseFloat(invoiceData["Total Due"]?.replace("$", "")) || 0,
    });

    toast.success("📧 Invoice sent via Email!");
  } catch (err) {
    console.error("Send invoice error:", err);
    toast.error("❌ Failed to send invoice.");
  }
};


  
  console.log("🧾 Parsed invoice data:", invoiceData);

  return (
    <div>
      <div className="bg-white text-gray-800 p-6 rounded-xl shadow-md w-full max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center text-indigo-600">
          Invoice
        </h1>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="font-semibold">Invoice #:</span>
            <span>
              {invoiceData["Invoice Number"] ||
                invoiceData["Invoice #"] ||
                "N/A"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Client:</span>
            <span>
              {invoiceData["Bill To"] ||
                invoiceData["Bill To"] ||
                extractClientName()}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Service:</span>
            <span>
              {/* {invoiceData["Service Details"] || "N/A"} */}
              {invoiceData["Services Provided"] ||
                invoiceData["Bill To"] ||
                extractServices()}
              </span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Amount:</span>
            <span>{invoiceData["Total"] || "N/A"}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Due Date:</span>
            <span>{invoiceData["Date"] || "N/A"}</span>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          Thank you for your business!
        </div>
      </div>

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
  );
};

export default InvoicePreview;
