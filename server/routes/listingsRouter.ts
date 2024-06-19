import { Router, Request, Response, NextFunction } from "express";
import Item from "../models/Item";
import Auction from "../models/Auction";
import { authenticateJWT } from "../middleware/jwt";
import User from "../models/User";

const listingsRouter = Router();

listingsRouter.use(authenticateJWT);
listingsRouter.get("/:id", async (req, res) => {
    const requestedId = req.params.id;

    try {
        const user = await User.findById(requestedId);

        const items = await Item.find({ seller: user });
        const auctions = await Auction.find({ seller: user });

        res.send({ items: items, auctions: auctions });
    } catch (err) {
        let message = "Unknown error";
        if (err instanceof Error) {
            message = err.message;
        }

        res.status(500).send({ error: message });
    }
});

export default listingsRouter;
