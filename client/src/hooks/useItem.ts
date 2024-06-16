import { Item } from "@/@types/Item";
import ApiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

const apiClient = new ApiClient<Item>("/items");

const useItems = (id: string) => {
    return useQuery<Item, Error>({
        queryKey: ["item", id],
        queryFn: () => apiClient.getOne(id),
        staleTime: 1000 * 60 * 60 * 24, // 1 day
    });
};

export default useItems;
