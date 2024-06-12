import useItems from "@/hooks/useItems";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Link } from "react-router-dom";

function ItemGrid() {
    const { data, isLoading, error } = useItems();

    if (isLoading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {data?.results?.map((item) => (
                    <Link key={item._id} to={`/items/${item._id}`}>
                        <Card>
                            <CardHeader>
                                <CardTitle>{item.title}</CardTitle>
                                <CardDescription>{item.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>{item.price}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </>
    );
}

export default ItemGrid;
