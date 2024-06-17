import express from "express";
import socketIo from "socket.io";
import "dotenv/config";
import dbConnect from "./startup/dbConnect";
import authRouter from "./routes/authRouter";
import itemRouter from "./routes/itemRouter";
import cors from "cors";
import categoryRouter from "./routes/categoryRouter";
import path from "path";
import auctionRouter from "./routes/auctionRouter";
import Auction from "./models/Auction";
import User from "./models/User";
import { Schema } from "mongoose";

dbConnect();

const app = express();
const io = new socketIo.Server();

const corsOptions = {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/items", itemRouter);
app.use("/api/auctions", auctionRouter);
app.use("/api/categories", categoryRouter);
// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("joinAuction", (auctionId: string) => {
        socket.join(auctionId);
    });

    socket.on("placeBid", async (data: { auctionId: string; bidderId: Schema.Types.ObjectId; bidAmount: number }) => {
        const { auctionId, bidderId, bidAmount } = data;
        const auction = await Auction.findById(auctionId);

        if (auction && bidAmount > auction.currentPrice) {
            auction.currentPrice = bidAmount;
            auction.highestBidder = bidderId;
            await auction.save();

            io.to(auctionId).emit("newBid", {
                currentPrice: auction.currentPrice,
                highestBidder: auction.highestBidder,
            });
        }
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

app.get("/", (req, res) => {
    res.send("Server running!");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port`, PORT));
