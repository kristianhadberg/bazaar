import { Router } from "express";
import Item from "../models/Item";
import CreateItemDto from "../dtos/item/createItemDto";

const itemRouter = Router();

itemRouter.post("/", async (req, res) => {
    const createItemRequest = req.body as CreateItemDto;

    const newItem = new Item(createItemRequest);

    await newItem.save();
    res.status(201).send(newItem);
});

itemRouter.get("/", async (req, res) => {
    const { search } = req.query;
    let query = {};

    if (search) {
        query = {
            $or: [{ title: { $regex: search, $options: "i" } }, { description: { $regex: search, $options: "i" } }],
        };
    }

    try {
        const items = await Item.find(query).populate("seller");
        res.send({ results: items });
    } catch (err) {
        res.status(500).send({ error: "Error" });
    }
});

itemRouter.get("/:id", async (req, res) => {
    const item = await Item.findById(req.params.id).populate("seller");
    res.send(item);
});

export default itemRouter;
