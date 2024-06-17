import { User } from "./User";

export interface Auction {
    _id: string;
    title: string;
    description: string;
    startingPrice: number;
    currentPrice?: number;
    seller: User;
    endTime: Date;
    highestBidder?: User;
    image: string;
}
