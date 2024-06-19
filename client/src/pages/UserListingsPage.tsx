import AuctionCard from "@/components/AuctionCard";
import ItemCard from "@/components/ItemCard";
import useListings from "@/hooks/useListings";
import useAuthStore from "@/store";
import { Link } from "react-router-dom";

function UserListingsPage() {
    const { user } = useAuthStore();

    const { data, error } = useListings(user?.id || "");

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div>
            <h1 className="text-4xl font-bold">Your listings.</h1>

            <div className="mt-10">
                <h1 className="text-xl font-bold">Items</h1>
                <div className="grid mt-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {data?.items?.map((item) => (
                        <Link key={item._id} to={`/items/${item._id}`}>
                            <ItemCard item={item} />
                        </Link>
                    ))}
                </div>
            </div>
            <div className="mt-20">
                <h1 className="text-xl font-bold">Auctions</h1>
                <div className="grid mt-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {data?.auctions?.map((auction) => (
                        <Link key={auction._id} to={`/auctions/${auction._id}`}>
                            <AuctionCard auction={auction} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default UserListingsPage;
