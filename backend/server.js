import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js"; // Import DB connection
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import "./utils/emailScheduler.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", authRoutes); // Base path for authentication routes
app.use("/api/tasks", taskRoutes);
// Test Route
app.get("/", (req, res) => {
    res.send("API is running...");
});

// Define PORT
const PORT = process.env.PORT || 5000;

// Connect to MongoDB first, then start the server
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB Connection Error:", error);
        process.exit(1); // Exit if connection fails
    });