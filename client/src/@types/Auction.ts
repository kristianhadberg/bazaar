export interface Auction {
    _id: string;
    title: string;
    description: string;
    startingPrice: number;
    currentPrice?: number;
    seller: string;
    endTime: Date;
    highestBidder?: string;
    image: string;
}
