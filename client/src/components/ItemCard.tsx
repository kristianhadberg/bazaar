import { Item } from "@/@types/Item";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

interface Props {
    item: Item;
}

function ItemCard({ item }: Props) {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    return (
        <Card className="item-card">
            <img className="item-card-image" src={`${backendUrl}${item.image}`} alt={item.title} />
            <CardHeader className="item-card-header">
                <CardTitle className="item-card-title">{item.title}</CardTitle>
                <CardDescription className="item-card-description">{item.description}</CardDescription>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter className="item-card-footer">
                <p>€ {item.price}</p>
            </CardFooter>
        </Card>
    );
}

export default ItemCard;
