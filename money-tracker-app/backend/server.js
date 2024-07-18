const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import cors
const transactionRoutes = require("./routes/transactionRoutes");

// MongoDB URI and server port
const MONGO_URI = "mongodb://localhost:27017/"; // Replace with your MongoDB URI
const PORT = 5000;

// Set Mongoose configuration to avoid deprecation warnings
mongoose.set("strictQuery", false); // Use 'true' if you prefer stricter query validation

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const app = express();

// Middleware
app.use(cors()); // Use cors middleware
app.use(express.json());

// Routes
app.use("/api/transactions", transactionRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
