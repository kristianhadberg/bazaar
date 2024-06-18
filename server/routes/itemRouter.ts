import { Router } from "express";
import Item from "../models/Item";
import Category from "../models/Category";
import CreateItemDto from "../dtos/item/createItemDto";
import { upload } from "../middleware/multer";

const itemRouter = Router();

itemRouter.post("/", upload.single("image"), async (req, res) => {
    const createItemRequest = req.body as CreateItemDto;

    const category = await Category.findOne({ name: { $regex: createItemRequest.category, $options: "i" } });

    let imagePath;
    if (req.file) {
        imagePath = req.file.path;
    }

    const newItem = new Item({
        title: createItemRequest.title,
        description: createItemRequest.description,
        price: createItemRequest.price,
        seller: createItemRequest.seller,
        category: category,
        image: imagePath,
    });

    await newItem.save();
    res.status(201).send(newItem);
});

itemRouter.get("/", async (req, res) => {
    const { search, category } = req.query;
    let query = {};

    if (search) {
        query = {
            title: { $regex: search, $options: "i" },
        };
    }

    if (category) {
        const requestedCategory = await Category.findOne({ name: { $regex: category, $options: "i" } });

        if (Object.keys(query).length > 0) {
            query = {
                $and: [query, { category: requestedCategory?._id }],
            };
        } else {
            query = { category: requestedCategory?._id };
        }
    }

    try {
        const items = await Item.find(query).populate("seller");
        res.send({ results: items });
    } catch (err) {
        res.status(500).send({ error: err });
    }
});

itemRouter.get("/:id", async (req, res) => {
    try {
        const item = await Item.findById(req.params.id).populate("seller");
        res.send(item);
    } catch (err) {
        res.status(500).send({ error: err });
    }
});

export default itemRouter;
