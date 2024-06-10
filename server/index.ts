import express from "express";
import "dotenv/config";
import dbConnect from "./startup/dbConnect";
import authRouter from "./routes/authRouter";

dbConnect();

const app = express();
app.use(express.json());
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
    res.send("Server running!");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port`, PORT));
