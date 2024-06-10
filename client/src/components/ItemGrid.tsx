import useItems from "@/hooks/useItems";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

function ItemGrid() {
    const { data: items } = useItems();
    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {items.map((item) => (
                <Card key={item.id}>
                    <CardHeader>
                        <CardTitle>{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>{item.price}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export default ItemGrid;
