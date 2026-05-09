import type { TheaterRoomTypeRequest } from "../type/typeTheaterRooms";
import { api } from "./api";

export const getListTheaterRooms = async (id: number) => {
    const res = await api.get(`/admin/theater-rooms/cinema/${id}`);
    return res.data;
}
export const CreateTheaterRooms = async (roomData: TheaterRoomTypeRequest) => {
    const res = await api.post(`/admin/theater-rooms`, roomData);
    return res.data;
}
export const EditTheaterRooms = async (id: number, roomData: TheaterRoomTypeRequest) => {
    const res = await api.put(`/admin/theater-rooms/${id}`, roomData);
    return res.data;
}
export const DeleteTheaterRooms = async (id: number) => {
    const res = await api.delete(`/admin/theater-rooms/${id}`);
    return res.data;
}
