import { useMutation } from "@tanstack/react-query";
import ApiClient from "@/services/api-client";

const apiClient = new ApiClient<{ username: string; password: string }>("auth/register");

const useRegister = () => {
    return useMutation({
        mutationFn: (data: { username: string; password: string }) => apiClient.post(data),
    });
};

export default useRegister;
