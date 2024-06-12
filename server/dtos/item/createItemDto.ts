import { Schema } from "mongoose";

export default interface CreateItemDto {
    title: string;
    description: string;
    price: number;
    seller: Schema.Types.ObjectId;
    category: string;
}
