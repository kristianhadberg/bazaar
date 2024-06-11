import { Item } from "@/@types/Item";
import ApiClient, { FetchResponse } from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

const apiClient = new ApiClient<Item>("/items");

const useItems = () => {
    return useQuery<FetchResponse<Item>, Error>({
        queryKey: ["items"],
        queryFn: apiClient.getAll,
        staleTime: 1000 * 60 * 60 * 24, // 1 day
    });
};

export default useItems;
