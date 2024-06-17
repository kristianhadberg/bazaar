import { Auction } from "@/@types/Auction";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

interface Props {
    auction: Auction;
}

function AuctionCard({ auction }: Props) {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    return (
        <Card className="item-card">
            <img className="item-card-image" src={`${backendUrl}${auction.image}`} alt={auction.title} />
            <CardHeader className="item-card-header">
                <CardTitle className="item-card-title">{auction.title}</CardTitle>
                <CardDescription className="item-card-description">{auction.description}</CardDescription>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter className="item-card-footer">
                <p>€ {auction.startingPrice}</p>
            </CardFooter>
        </Card>
    );
}

export default AuctionCard;
