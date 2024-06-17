import mongoose from "mongoose";

interface IAuction {
    title: string;
    description: string;
    startingPrice: number;
    currentPrice: number;
    endTime: Date;
    seller: mongoose.Schema.Types.ObjectId;
    highestBidder: mongoose.Schema.Types.ObjectId;
    category: mongoose.Schema.Types.ObjectId;
    image: string;
}

const auctionSchema = new mongoose.Schema<IAuction>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    startingPrice: { type: Number, required: true },
    currentPrice: { type: Number, default: 0 },
    endTime: { type: Date, required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    highestBidder: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    image: { type: String },
});

export default mongoose.model("Auction", auctionSchema);
