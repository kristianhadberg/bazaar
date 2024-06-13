import { Item } from "@/@types/Item";
import ApiClient, { FetchResponse } from "@/services/api-client";
import { useItemQueryStore } from "@/store";
import { useQuery } from "@tanstack/react-query";

const apiClient = new ApiClient<Item>("/items");

const useItems = () => {
    const itemQuery = useItemQueryStore((state) => state.itemQuery);

    return useQuery<FetchResponse<Item>, Error>({
        queryKey: ["items", itemQuery],
        queryFn: () =>
            apiClient.getAll({
                params: {
                    search: itemQuery.searchText,
                    category: itemQuery.category,
                },
            }),
        staleTime: 1000 * 60 * 60 * 24, // 1 day
    });
};

export default useItems;
