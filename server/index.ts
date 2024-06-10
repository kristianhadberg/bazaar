import express from "express";
import "dotenv/config";
import dbConnect from "./startup/dbConnect";

dbConnect();

const app = express();
app.get("/", (req, res) => {
    res.send("Server running!");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port`, PORT));
