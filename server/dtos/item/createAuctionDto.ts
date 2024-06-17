import mongoose, { Schema } from "mongoose";

export default interface CreateAuctionDto {
    title: string;
    description: string;
    startingPrice: number;
    endTime: Date;
    seller: Schema.Types.ObjectId;
    highestBidder: mongoose.Schema.Types.ObjectId;
    category: string;
}
