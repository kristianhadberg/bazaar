import { Server as HttpServer } from "http";
import socketIo from "socket.io";
import Auction from "../models/Auction";
import { Schema } from "mongoose";

const setupSocket = (server: HttpServer) => {
    const io = new socketIo.Server(server, {
        cors: {
            origin: process.env.CLIENT_URL || "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        console.log("New client connected");

        socket.on("joinAuction", (auctionId: string) => {
            socket.join(auctionId);
        });

        socket.on("placeBid", async (data: { auctionId: string; bidderId: Schema.Types.ObjectId; bidAmount: number }) => {
            const { auctionId, bidderId, bidAmount } = data;
            const auction = await Auction.findById(auctionId);

            if (auction && bidAmount > auction.startingPrice && bidAmount > auction.currentPrice) {
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

    return io;
};

export default setupSocket;