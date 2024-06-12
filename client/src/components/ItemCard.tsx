import { Item } from "@/@types/Item";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

interface Props {
    item: Item;
}

function ItemCard({ item }: Props) {
    return (
        <Card className="flex flex-col justify-between h-64">
            <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardFooter className="justify-end">
                <p>€ {item.price}</p>
            </CardFooter>
        </Card>
    );
}

export default ItemCard;
