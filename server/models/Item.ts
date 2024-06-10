import mongoose, { mongo } from "mongoose";

interface IItem {
    title: string;
    description: string;
    price: number;
    seller: mongoose.Schema.Types.ObjectId;
}

const itemSchema = new mongoose.Schema<IItem>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model("Item", itemSchema);
