
import { Resend } from 'resend';
import { useRef } from "react";


const InvoicePreview = ({ invoiceText }) => {
  
  
  
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


  // Extract client name from "Billing Information" if not directly available
  const extractClientName = () => {
    const billingInfo = invoiceData["Billing Information"];
    if (!billingInfo) return "N/A";

    const match = billingInfo.match(/\*\*Client Name:\*\* (.+)/);
    return match ? match[1] : "N/A";
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
            <span>{invoiceData["Client Name"] || extractClientName()}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Service:</span>
            <span>{invoiceData["Service"] || "N/A"}</span>
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
       
    </div>
  );
};

export default InvoicePreview;
