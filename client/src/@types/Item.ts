export interface Item {
    id: string;
    title: string;
    description: string;
    price: number;
    seller: string;
}

export interface AddItem {
    title: string;
    description: string;
    price: number;
    seller: string;
}
