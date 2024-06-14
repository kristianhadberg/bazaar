import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "@/services/api-client";

const apiClient = new ApiClient<FormData>("/items");

const useAddItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: FormData) => apiClient.post(data),
        onSuccess: () => {
            queryClient.invalidateQueries(["items"]);
        },
    });
};

export default useAddItem;
