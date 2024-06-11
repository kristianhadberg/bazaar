import { useMutation } from "@tanstack/react-query";
import ApiClient from "@/services/api-client";
import { AddItem } from "@/@types/Item";

const apiClient = new ApiClient<AddItem>("/items");

const useAddItem = () => {
    return useMutation({
        mutationFn: (data: AddItem) => apiClient.post(data),
    });
};

export default useAddItem;
