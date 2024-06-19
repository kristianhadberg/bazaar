import { Router } from "express";
import Auction from "../models/Auction";
import { upload } from "../middleware/multer";
import Category from "../models/Category";
import CreateAuctionDto from "../dtos/item/createAuctionDto";

const auctionRouter = Router();

// Create a new auction
auctionRouter.post("/", upload.single("image"), async (req, res) => {
    const createAuctionRequest = req.body as CreateAuctionDto;

    const category = await Category.findOne({ name: { $regex: req.body.category, $options: "i" } });

    let imagePath;
    if (req.file) {
        imagePath = req.file.path;
    }

    const newAuction = new Auction({
        title: createAuctionRequest.title,
        description: createAuctionRequest.description,
        startingPrice: createAuctionRequest.startingPrice,
        seller: createAuctionRequest.seller,
        endTime: createAuctionRequest.endTime,
        category: category,
        image: imagePath,
    });

    await newAuction.save();
    res.status(201).send(newAuction);
});

// Get all auctions
auctionRouter.get("/", async (req, res) => {
    const { search, category, ended, sort, order } = req.query;
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

    let sortOptions = {};
    if (sort) {
        const sortField = sort.toString();
        const sortOrder = order === "asc" ? 1 : -1;
        sortOptions = { [sortField]: sortOrder };
    }
    try {
        const auctions = await Auction.find(query).populate("seller").populate("highestBidder").sort(sortOptions);

        if (ended == "true") {
            const endedAuctions = auctions.filter((auction) => !auction.isActive());
            res.send({ results: endedAuctions });
            return;
        }

        const activeAuctions = auctions.filter((auction) => auction.isActive());
        res.send({ results: activeAuctions });
    } catch (err) {
        res.status(500).send({ error: err });
    }
});

// Get a specific auction by ID
auctionRouter.get("/:id", async (req, res) => {
    const auction = await Auction.findById(req.params.id).populate("seller").populate("highestBidder");
    res.send(auction);
});

export default auctionRouter;
