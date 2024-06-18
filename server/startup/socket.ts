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

            if (auction) {
                if (!auction.isActive()) {
                    socket.emit("bidError", "Auction has ended.");
                    return;
                }

                if (auction.seller.toString() === bidderId.toString()) {
                    socket.emit("bidError", "You cannot bid on your own items");
                    return;
                }

                if (auction.highestBidder.toString() === bidderId.toString()) {
                    socket.emit("bidError", "You already have the highest bid.");
                    return;
                }

                if (bidAmount < auction.startingPrice) {
                    socket.emit("bidError", "Bid must be higher than the starting price.");
                    return;
                }

                if (bidAmount <= auction.currentPrice) {
                    socket.emit("bidError", "Bid must be higher than the current price.");
                    return;
                }

                auction.currentPrice = bidAmount;
                auction.highestBidder = bidderId;
                await auction.save();

                io.to(auctionId).emit("newBid", {
                    currentPrice: auction.currentPrice,
                    highestBidder: auction.highestBidder,
                });

                socket.emit("bidSuccess", "Bid successfully placed");
            }
            return;
        });

        socket.on("disconnect", () => {
            console.log("Client disconnected");
        });
    });

    return io;
};

export default setupSocket;
