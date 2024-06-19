import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import CreateUserDto from "../dtos/user/createUserDto";
import LoginRequestDto from "../dtos/user/loginRequestDto";

const authRouter = Router();

authRouter.post("/register", async (req, res) => {
    const user = req.body as CreateUserDto;

    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = new User({
        username: user.username,
        email: user.email,
        password: hashedPassword,
    });

    try {
        await newUser.save();
        res.status(201).json("User created");
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

authRouter.post("/login", async (req, res) => {
    const loginRequest = req.body as LoginRequestDto;

    const user = await User.findOne({ username: loginRequest.username });
    if (!user) return res.status(401).send("Incorrect login information.");

    const validPassword = await bcrypt.compare(loginRequest.password, user.password);
    if (!validPassword) return res.status(401).send("Incorrect login information.");

    const secret = process.env.JWT_SECRET!;

    const token = jwt.sign({ _id: user._id }, secret);
    res.header("auth-token", token).send({ token: token, id: user._id, username: user.username });
});

export default authRouter;
