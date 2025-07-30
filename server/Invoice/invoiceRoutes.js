const express = require("express");
const router = express.Router();
const {
  generateInvoiceAI,
  refineInvoice,
} = require("./invoiceController");




// POST /server/invoice-ai
router.post("/invoice-ai", generateInvoiceAI);

// POST /server/refine-invoice
router.post("/refine-invoice", refineInvoice);

module.exports = router;
