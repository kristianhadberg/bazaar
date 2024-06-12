import axios, { AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
    results: T[];
}

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BAZAAR_API_URL,
    params: {
        // todo
    },
});

class ApiClient<T> {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAll = (config?: AxiosRequestConfig) => axiosInstance.get<FetchResponse<T>>(this.endpoint, config).then((res) => res.data);

    getOne = (id: string) => axiosInstance.get<T>(`${this.endpoint}/${id}`).then((res) => res.data);

    post = (data: T, config?: AxiosRequestConfig) => axiosInstance.post<T>(this.endpoint, data, config).then((res) => res.data);
}

export default ApiClient;
