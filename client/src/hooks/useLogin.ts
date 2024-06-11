import { useMutation } from "@tanstack/react-query";
import ApiClient from "@/services/api-client";

const apiClient = new ApiClient<{
    username: string;
    password: string;
}>("auth/login");

const useLogin = () => {
    return useMutation({
        mutationFn: (data: { username: string; password: string }) => apiClient.post(data),
    });
};

export default useLogin;
