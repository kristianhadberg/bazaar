import { Router } from "express";
import Category from "../models/Category";
import CreateCategoryDto from "../dtos/item/createCategoryDto";

const categoryRouter = Router();

categoryRouter.post("/", async (req, res) => {
    const createCategoryRequest = req.body as CreateCategoryDto;

    const newCategory = new Category(createCategoryRequest);

    await newCategory.save();
    res.status(201).send(newCategory);
});

categoryRouter.get("/", async (req, res) => {
    try {
        const categories = await Category.find();
        res.send({ results: categories });
    } catch (err) {
        res.status(500).send({ error: "Error" });
    }
});

export default categoryRouter;
