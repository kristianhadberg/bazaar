import { Category } from "@/@types/Category";
import ApiClient, { FetchResponse } from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

const apiClient = new ApiClient<Category>("/categories");

const useCategories = () => {
    return useQuery<FetchResponse<Category>, Error>({
        queryKey: ["categories"],
        queryFn: apiClient.getAll,
        staleTime: 1000 * 60 * 60 * 24, // 1 day
    });
};

export default useCategories;
