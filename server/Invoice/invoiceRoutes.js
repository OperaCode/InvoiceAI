const express = require("express");
const router = express.Router();
const {
  generateInvoiceAI,
  refineInvoice,
  sendInvoiceEmail,
} = require("./invoiceController");



router.post("/invoice-ai", generateInvoiceAI);


router.post("/refine-invoice", refineInvoice);


router.post("/send-invoice", sendInvoiceEmail);


module.exports = router;
