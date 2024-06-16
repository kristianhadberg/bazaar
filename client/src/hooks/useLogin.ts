import { useMutation } from "@tanstack/react-query";
import ApiClient from "@/services/api-client";
import { Login, LoginResponse } from "@/@types/Login";

const apiClient = new ApiClient<Login>("auth/login");

const useLogin = () => {
    return useMutation<LoginResponse, Error, Login>({
        mutationFn: (data: Login) => apiClient.login(data),
    });
};

export default useLogin;
