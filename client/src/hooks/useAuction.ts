import { Auction } from "@/@types/Auction";
import ApiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

const apiClient = new ApiClient<Auction>("/auctions");

const useAuction = (id: string) => {
    return useQuery<Auction, Error>({
        queryKey: ["auction", id],
        queryFn: () => apiClient.getOne(id),
        staleTime: 1000 * 60 * 60 * 24, // 1 day
    });
};

export default useAuction;
