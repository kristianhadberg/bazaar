export interface Item {
    _id: string;
    title: string;
    description: string;
    price: number;
    seller: string;
    image: string;
}

export interface AddItem {
    title: string;
    description: string;
    price: number;
    seller: string;
}
