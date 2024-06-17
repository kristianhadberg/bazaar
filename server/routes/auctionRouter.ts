import { Router } from "express";
import Auction from "../models/Auction";
import { upload } from "../middleware/multer";
import Category from "../models/Category";
import CreateAuctionDto from "../dtos/item/createAuctionDto";

const auctionRouter = Router();

// Create a new auction
auctionRouter.post("/", upload.single("image"), async (req, res) => {
    console.log(req.body);
    const createAuctionRequest = req.body as CreateAuctionDto;

    console.log(createAuctionRequest);

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
    const auctions = await Auction.find().populate("seller").populate("highestBidder");
    res.send({ results: auctions });
});

// Get a specific auction by ID
auctionRouter.get("/:id", async (req, res) => {
    const auction = await Auction.findById(req.params.id).populate("seller").populate("highestBidder");
    res.send(auction);
});

export default auctionRouter;
