import { Item } from "@/@types/Item";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

interface Props {
    item: Item;
}

function ItemCard({ item }: Props) {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    return (
        <Card className="flex flex-col justify-between h-100">
            <img src={`${backendUrl}${item.image}`} />
            <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter className="justify-end">
                <p>€ {item.price}</p>
            </CardFooter>
        </Card>
    );
}

export default ItemCard;
