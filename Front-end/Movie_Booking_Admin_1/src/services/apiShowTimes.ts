import type { ShowTimesRequest } from "../type/typeShowTimes";
import { api } from "./api";

export const getListShowTimes = async () => {
    const res = await api.get("/admin/showtimes");
    return res.data;
}
export const getShowTimeById = async (id: number) => {
    const res = await api.get(`/admin/showtimes/${id}`);
    return res.data;
}
export const CreateShowTimes = async (data: ShowTimesRequest) => {
    const res = await api.post("/admin/showtimes", data);
    return res.data;
}
export const EditShowTimes = async (id: number, data: ShowTimesRequest) => {
    const res = await api.put(`/admin/showtimes/${id}`, data);
    return res.data;
}
export const DeleteShowTimes = async (id: number) => {
    const res = await api.delete(`/admin/showtimes/${id}`);
    return res.data;
}