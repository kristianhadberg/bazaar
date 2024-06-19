import { Auction } from "@/@types/Auction";
import ApiClient, { FetchResponse } from "@/services/api-client";
import { useAuctionQueryStore } from "@/store";
import { useQuery } from "@tanstack/react-query";

const apiClient = new ApiClient<Auction>("/auctions");

const useAuctions = () => {
    const auctionQuery = useAuctionQueryStore((state) => state.auctionQuery);

    return useQuery<FetchResponse<Auction>, Error>({
        queryKey: ["auctions", auctionQuery],
        queryFn: () =>
            apiClient.getAll({
                params: {
                    search: auctionQuery.searchText,
                    category: auctionQuery.category,
                    ended: auctionQuery.ended,
                    sort: auctionQuery.sort,
                    order: auctionQuery.order,
                },
            }),
        staleTime: 1000 * 60 * 60 * 24, // 1 day
    });
};

export default useAuctions;
