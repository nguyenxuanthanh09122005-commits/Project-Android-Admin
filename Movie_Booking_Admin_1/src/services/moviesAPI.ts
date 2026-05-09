import type { MoviesType_1 } from "../type/typeMovies";
import { api } from "./api"

export const getListMovies = async () => {
    const res = await api.get("/admin/movies");
    return res.data;
}

export const getDetailMovies = async (id: number) => {
    const res = await api.get(`/admin/movies/${id}`);
    return res.data;
}

export const CreateMovies = async (data: MoviesType_1) => {
    const res = await api.post(`/admin/movies`, data);
    return res.data;
}
