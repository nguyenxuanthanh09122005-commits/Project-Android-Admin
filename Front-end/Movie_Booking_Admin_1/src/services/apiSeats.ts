import type { SeatBulkRequest, SeatRequest } from "../type/typeSeats";
import { api } from "./api";

export const getListSeatsbyRoom = async (roomId: number) => {
    const res = await api.get(`/admin/theater-rooms/${roomId}/seats`);
    return res.data;
}
export const CreateSeat = async (roomId: number, data: SeatRequest) => {
    const res = await api.post(`/admin/theater-rooms/${roomId}/seats`, data);
    return res.data;
}
export const CreateListSeats = async (roomId: number, data: SeatBulkRequest) => {
    const res = await api.post(`/admin/theater-rooms/${roomId}/seats/bulk`, data);
    return res.data;
}
export const DeleteSeat = async (roomId: number, seatId: number) => {
    const res = await api.delete(`/admin/theater-rooms/${roomId}/seats/${seatId}`);
    return res.data;
}