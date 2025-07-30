const InvoiceEditor = ({ invoice, onChange }) => {
  return (
    <div className="mt-6 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        ✍️ Edit Invoice
      </h3>
      <textarea
        className="w-full h-64 p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition"
        value={invoice}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter or edit your invoice JSON or content here..."
      />
    </div>
  );
};

export default InvoiceEditor;
