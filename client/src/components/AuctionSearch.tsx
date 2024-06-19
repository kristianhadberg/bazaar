import { useAuctionQueryStore } from "@/store";
import SearchInput from "./SearchInput";
import CategorySelector from "./CategorySelector";
import ClearSearchButton from "./ClearSearchButton";

import EndedSwitch from "./EndedSwitch";
import SortSelector from "./SortSelector";
import SortDirection from "./SortDirection";

function AuctionSearch() {
    const setSearchText = useAuctionQueryStore((state) => state.setSearchText);
    const searchText = useAuctionQueryStore((state) => state.auctionQuery.searchText);

    const category = useAuctionQueryStore((state) => state.auctionQuery.category);
    const setCategory = useAuctionQueryStore((state) => state.setCategory);

    const sort = useAuctionQueryStore((state) => state.auctionQuery.sort);
    const setSort = useAuctionQueryStore((state) => state.setSort);

    const order = useAuctionQueryStore((state) => state.auctionQuery.order);
    const setOrder = useAuctionQueryStore((state) => state.setOrder);

    const ended = useAuctionQueryStore((state) => state.auctionQuery.ended);
    const setEnded = useAuctionQueryStore((state) => state.setEnded);

    const clear = useAuctionQueryStore((state) => state.clear);

    return (
        <>
            <SearchInput searchText={searchText} setSearchText={setSearchText} placeholder="Search auctions..." />
            <div className="flex mt-2 gap-2">
                <CategorySelector category={category} setCategory={setCategory} />
                <SortSelector sort={sort} setSort={setSort} />
                <SortDirection order={order} setOrder={setOrder} />
                <ClearSearchButton clear={clear} />
                <EndedSwitch ended={ended} setEnded={setEnded} />
            </div>
        </>
    );
}

export default AuctionSearch;
