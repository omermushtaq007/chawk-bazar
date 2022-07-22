import axios from "axios";
import { getToken } from "./get-token";

const http = axios.create({
    baseURL: process.env.NEXT_PUBLIC_REST_NODE_API_ENDPOINT,
    timeout: 30000,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    }
});

// Api Resolver
http.interceptors.request.use(
    (config) => {
        const token = getToken();
        config.headers = {
            ...config.headers, 
            Authorization: `Bearer ${token ? token : ""}`,
        };
        return config;
    },
    error => Promise.reject(error)
)

export default http;
