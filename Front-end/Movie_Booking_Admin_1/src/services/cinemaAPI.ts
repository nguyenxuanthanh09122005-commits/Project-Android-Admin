import type { CinemaTypeRequest } from "../type/typeCinema";
import { api } from "./api";

export const getListCinemas = async () => {
    const res = await api.get("/admin/cinemas");
    return res.data;
}
export const getDetailCinemas = async (cinemaId: number) => {
    const res = await api.get(`/admin/cinemas/${cinemaId}`);
    return res.data;
}
export const CreateCinemas = async (cinemaData: CinemaTypeRequest) => {
    const res = await api.post("/admin/cinemas", cinemaData);
    return res.data;
}
export const EditCinemas = async (cinemaId: number, cinemaData: CinemaTypeRequest) => {
    const res = await api.put(`/admin/cinemas/${cinemaId}`, cinemaData);
    return res.data;
}
export const DeleteCinemas = async (cinemaId: number) => {
    const res = await api.delete(`/admin/cinemas/${cinemaId}`);
    return res.data;
}