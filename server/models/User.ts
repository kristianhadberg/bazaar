import mongoose from "mongoose";

interface IUser {
    username: string;
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema<IUser>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

export default mongoose.model("User", userSchema);
