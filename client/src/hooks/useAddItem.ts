import { useMutation } from "@tanstack/react-query";
import ApiClient from "@/services/api-client";

const apiClient = new ApiClient<FormData>("/items");

const useAddItem = () => {
    return useMutation({
        mutationFn: (data: FormData) => apiClient.post(data),
    });
};

export default useAddItem;
