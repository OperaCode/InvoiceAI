const InvoicePreview = ({ invoiceText }) => {
  return (
    <div className="bg-white p-4 border rounded shadow">
      <h3 className="text-lg font-semibold mb-2">Invoice Preview</h3>
      <pre className="whitespace-pre-wrap">{invoiceText}</pre>
    </div>
  );
};

export default InvoicePreview;
