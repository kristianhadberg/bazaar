import { Auction } from "@/@types/Auction";
import { Item } from "@/@types/Item";
import { Listings } from "@/@types/Listings";
import ApiClient from "@/services/api-client";
import useAuthStore from "@/store";
import { useQuery } from "@tanstack/react-query";

export interface ListingsResponse {
    items: Item[];
    auctions: Auction[];
}

const apiClient = new ApiClient<Listings>("/listings");

const useListings = (id: string) => {
    const { user } = useAuthStore();

    return useQuery<ListingsResponse, Error>({
        queryKey: ["listings", id],
        queryFn: () =>
            apiClient.getListings(id, {
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            }),
        staleTime: 1000 * 60 * 60 * 24, // 1 day
    });
};

export default useListings;
