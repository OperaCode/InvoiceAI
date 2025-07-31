import emailjs from "@emailjs/browser";


const service_id = import.meta.env.VITE_SERVICE_ID
const template_id =import.meta.env.VITE_TEMPLATE_ID
const public_key = import.meta.env.VITE_PUBLIC_KEY



export const sendInvoiceEmail = async (data) => {
  try {
    const response = await emailjs.send(
      service_id,
      template_id,
      {
        to_email: data.to_email,
        to_name: data.to_name,
        invoice_id: data.invoice_id,
        invoice_date: data.invoice_date,
        due_date: data.due_date,
        job_description: data.job_description,
        rate_per_hour: data.rate_per_hour,
        hours_worked: data.hours_worked,
        job_total: data.job_total,
        subtotal: data.subtotal,
        tax: data.tax,
      },
      public_key
    );
    return response;
  } catch (error) {
    console.error("EmailJS send error:", error);
    throw error;
  }
};
