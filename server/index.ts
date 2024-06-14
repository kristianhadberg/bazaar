import express from "express";
import "dotenv/config";
import dbConnect from "./startup/dbConnect";
import authRouter from "./routes/authRouter";
import itemRouter from "./routes/itemRouter";
import cors from "cors";
import categoryRouter from "./routes/categoryRouter";
import path from "path";

dbConnect();

const app = express();

const corsOptions = {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/items", itemRouter);
app.use("/api/categories", categoryRouter);
// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
    res.send("Server running!");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port`, PORT));
