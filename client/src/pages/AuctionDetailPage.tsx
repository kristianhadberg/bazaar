import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAuction from "@/hooks/useAuction";
import useAuthStore from "@/store";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

function AuctionDetailPage() {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const socket = io(backendUrl);
    const { id: auctionId } = useParams();
    const { user } = useAuthStore();
    const [bidAmount, setBidAmount] = useState<number>(0);
    const queryClient = useQueryClient();

    const { data: auction, error } = useAuction(auctionId!);

    socket.emit("joinAuction", auctionId);

    socket.on("newBid", () => {
        queryClient.invalidateQueries(["auction", auctionId]);
    });

    const placeBid = () => {
        if (!user) {
            return;
        }

        if (auction?.highestBidder?.username == user.username) {
            return;
        }

        socket.emit("placeBid", {
            auctionId: auctionId,
            bidderId: user.id,
            bidAmount: bidAmount,
        });
    };

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div className="flex gap-20 flex-col md:flex-row justify-between">
            <div className="basis-5/12 item-detail-image-container">
                <img className="item-detail-image" src={`${backendUrl}${auction?.image}`} alt={auction?.title} />
            </div>
            <div className="basis-6/12">
                <p className="text-xl font-bold">{auction?.title}</p>
                <div className="border-t-2 border-b-2 mt-12 pt-6 pb-6">
                    <div>
                        <p className="font-bold">Description</p>
                        <p>{auction?.description}</p>
                    </div>
                    <div className="flex flex-col justify-between mt-10 ">
                        <p className="text-xl">Starting price: € {auction?.startingPrice}</p>
                        <p className="text-xl font-bold">Highest bid: {auction?.currentPrice ? `€ ${auction.currentPrice} by ${auction.highestBidder?.username}` : "0"}</p>
                        {auction?.endTime && <p className="font-light">Ends at: {new Date(auction.endTime).toLocaleString("dk-DK", { dateStyle: "short", timeStyle: "short" })}</p>}
                        <Input disabled={!user ? true : false} className="mt-10 mb-5" type="number" value={bidAmount} onChange={(e) => setBidAmount(Number(e.target.value))} placeholder="Place your bid" />
                        <Button disabled={!user ? true : false} onClick={placeBid}>
                            Place bid
                        </Button>
                        {!user && <p>Please login to place a bid.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuctionDetailPage;
