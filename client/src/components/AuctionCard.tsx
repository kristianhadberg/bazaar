import { Auction } from "@/@types/Auction";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

interface Props {
    auction: Auction;
}

function AuctionCard({ auction }: Props) {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    return (
        <Card className="auction-card">
            <img className="item-card-image" src={`${backendUrl}${auction.image}`} alt={auction.title} />
            <CardHeader className="item-card-header">
                <CardTitle className="item-card-title">{auction.title}</CardTitle>
                <CardDescription className="item-card-description">{auction.description}</CardDescription>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter className="flex flex-col item-card-footer items-end">
                <p>Starting price: € {auction.startingPrice}</p>
                <p className="font-bold">Highest bid: {auction.currentPrice ? `€ ${auction.currentPrice}` : "0"}</p>

                <p>Ends at: {new Date(auction.endTime).toLocaleString("dk-DK", { dateStyle: "short", timeStyle: "short" })}</p>
            </CardFooter>
        </Card>
    );
}

export default AuctionCard;
