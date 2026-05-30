import axios from "axios";

export const api = axios.create({
    baseURL: "https://movie-booking-backend-deploy.onrender.com/api"
})
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    console.log(token, "token");

    if (token) {
        config.headers.Authorization = `Bearer ${token.trim()}`
    }

    return config
})