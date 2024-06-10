import express from "express";
import "dotenv/config";
import dbConnect from "./startup/dbConnect";
import authRouter from "./routes/authRouter";
import itemRouter from "./routes/itemRouter";

dbConnect();

const app = express();
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/item", itemRouter);

app.get("/", (req, res) => {
    res.send("Server running!");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port`, PORT));
