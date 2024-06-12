import useItems from "@/hooks/useItems";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Link } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";

function ItemGrid() {
    const { data, isLoading, error } = useItems();
    const skeletons = [...Array(20).keys()];

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {isLoading &&
                    skeletons.map((skeleton) => (
                        <div key={skeleton} className="space-y-2">
                            <Skeleton className="h-4 h-[250px] w-[250px]" />
                        </div>
                    ))}
                {data?.results?.map((item) => (
                    <Link key={item._id} to={`/items/${item._id}`}>
                        <Card className="flex flex-col justify-between h-64">
                            <CardHeader>
                                <CardTitle>{item.title}</CardTitle>
                                <CardDescription>{item.description}</CardDescription>
                            </CardHeader>
                            <CardFooter className="justify-end">
                                <p>€ {item.price}</p>
                            </CardFooter>
                        </Card>
                    </Link>
                ))}
            </div>
        </>
    );
}

export default ItemGrid;
