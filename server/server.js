const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const invoiceRoutes = require("./Invoice/invoiceRoutes");

// Load env vars
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());



// Debug
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.path}`);
//   next();
// });



// Routes
app.use("/server", invoiceRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at port:${PORT}`);
});
