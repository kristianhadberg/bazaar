import axios from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BAZAAR_API_URL,
    params: {
        // todo
    },
});

export default apiClient;
