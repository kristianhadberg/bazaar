import mongoose from "mongoose";

interface IItem {
    title: string;
    description: string;
    price: number;
    seller: mongoose.Schema.Types.ObjectId;
    category: mongoose.Schema.Types.ObjectId;
    image: string;
}

const itemSchema = new mongoose.Schema<IItem>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    image: { type: String },
});

export default mongoose.model("Item", itemSchema);
