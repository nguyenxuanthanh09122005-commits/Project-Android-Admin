// import type { } from "../type/typeMovies";
import type { MoviesTypeRequest } from "../type/typeMovies";
import { api } from "./api"

export const getListMovies = async () => {
    const res = await api.get("/admin/movies");
    return res.data;
}

export const getDetailMovies = async (id: number) => {
    const res = await api.get(`/admin/movies/${id}`);
    return res.data;
}

export const CreateMovies = async (data: MoviesTypeRequest) => {
    const res = await api.post(`/admin/movies`, data);
    return res.data;
}

export const EditMovies = async (id: number, data: MoviesTypeRequest) => {
    const res = await api.put(`/admin/movies/${id}`, data);
    return res.data;
}
export const DeleteMovies = async (id: number) => {
    const res = await api.delete(`/admin/movies/${id}`);
    return res.data;
}