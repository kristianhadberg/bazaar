import { useAuctionQueryStore } from "@/store";
import SearchInput from "./SearchInput";
import CategorySelector from "./CategorySelector";
import ClearSearchButton from "./ClearSearchButton";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

function AuctionSearch() {
    const setSearchText = useAuctionQueryStore((state) => state.setSearchText);
    const searchText = useAuctionQueryStore((state) => state.auctionQuery.searchText);

    const category = useAuctionQueryStore((state) => state.auctionQuery.category);
    const setCategory = useAuctionQueryStore((state) => state.setCategory);

    const ended = useAuctionQueryStore((state) => state.auctionQuery.ended);
    const setEnded = useAuctionQueryStore((state) => state.setEnded);

    const clear = useAuctionQueryStore((state) => state.clear);

    const handleToggle = (checked: boolean) => {
        setEnded(checked);
    };

    return (
        <>
            <SearchInput searchText={searchText} setSearchText={setSearchText} placeholder="Search auctions..." />
            <div className="flex mt-2 gap-2">
                <CategorySelector category={category} setCategory={setCategory} />
                <ClearSearchButton clear={clear} />
                <div className="flex items-center ml-10 space-x-2">
                    <Switch id="ended-auctions" checked={ended} onCheckedChange={handleToggle} />
                    <Label htmlFor="ended-auctions">Show ended auctions</Label>
                </div>
            </div>
        </>
    );
}

export default AuctionSearch;
