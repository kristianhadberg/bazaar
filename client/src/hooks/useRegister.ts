import { useMutation } from "@tanstack/react-query";
import ApiClient from "@/services/api-client";
import { Register } from "@/@types/Register";

const apiClient = new ApiClient<Register>("auth/register");

const useRegister = () => {
    return useMutation<Register, Error, Register>({
        mutationKey: ["login"],
        mutationFn: (data: Register) => apiClient.post(data),
    });
};

export default useRegister;
