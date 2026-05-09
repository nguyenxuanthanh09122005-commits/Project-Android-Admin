import type { TheaterRoomTypeRequest } from "../type/typeTheaterRooms";
import { api } from "./api";

export const getListTheaterRooms = async (id: number) => {
    const res = await api.get(`/admin/theater-rooms/cinema/${id}`);
    return res.data;
}
export const CreateTheaterRooms = async (roomData: TheaterRoomTypeRequest) => {
    const res = await api.post(`/admin/theater-rooms/cinema`, roomData);
    return res.data;
}