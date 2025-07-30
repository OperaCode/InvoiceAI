const InvoicePreview = ({ invoiceText }) => {
  return (
    <div className="mt-6 bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        🧾 Invoice Preview
      </h3>
      <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-700">
        {invoiceText}
      </pre>
    </div>
  );
};

export default InvoicePreview;
