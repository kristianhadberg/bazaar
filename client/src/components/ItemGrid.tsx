import useItems from "@/hooks/useItems";
import { Link } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";
import ItemCard from "./ItemCard";

function ItemGrid() {
    const { data, isLoading, error } = useItems();
    const skeletons = [...Array(20).keys()];

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    if (data?.results.length == 0) {
        return <p>No results found.</p>;
    }

    return (
        <>
            <div className="grid mt-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {isLoading &&
                    skeletons.map((skeleton) => (
                        <div key={skeleton} className="space-y-2">
                            <Skeleton className="h-4 h-[250px] w-[250px]" />
                        </div>
                    ))}
                {data?.results?.map((item) => (
                    <Link key={item._id} to={`/items/${item._id}`}>
                        <ItemCard item={item} />
                    </Link>
                ))}
            </div>
        </>
    );
}

export default ItemGrid;
