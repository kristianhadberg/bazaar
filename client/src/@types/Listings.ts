import { Auction } from "./Auction";
import { Item } from "./Item";

export interface Listings {
    items: Item[];
    auctions: Auction[];
}
