import { Button } from "@/components/ui/button";
import useAuction from "@/hooks/useAuction";
import { useParams } from "react-router-dom";

function AuctionDetailPage() {
    const { id } = useParams();

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const { data: auction, error } = useAuction(id!);

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
                        <p className="text-xl">Highest bid: {auction?.highestBidder ? `€ ${auction.highestBidder}` : "0"}</p>
                        <Button>Bid</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuctionDetailPage;
