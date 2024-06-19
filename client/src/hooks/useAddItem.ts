import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "@/services/api-client";

interface ApiError {
    response?: {
        data?: {
            message?: string;
        };
    };
    message: string;
}

const apiClient = new ApiClient<FormData>("/items");

const useAddItem = () => {
    const queryClient = useQueryClient();

    return useMutation<FormData, ApiError, FormData>({
        mutationFn: (data: FormData) => apiClient.post(data),
        onSuccess: () => {
            queryClient.invalidateQueries(["items"]);
            queryClient.invalidateQueries(["listings"]);
        },
    });
};

export default useAddItem;
