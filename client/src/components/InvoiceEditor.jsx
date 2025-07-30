const InvoiceEditor = ({ invoice, onChange }) => {
  return (
    <div className="mt-6 bg-gray-100 p-4 rounded">
      <h3 className="text-lg font-bold mb-2">Edit Your Invoice</h3>
      <textarea
        className="w-full h-64 p-2 border rounded mb-4"
        value={invoice}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default InvoiceEditor;
