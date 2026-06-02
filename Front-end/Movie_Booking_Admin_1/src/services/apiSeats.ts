import type { SeatBulkRequest, SeatGenerationRequest, SeatRequest, SeatStatus, SeatType } from "../type/typeSeats";
import { api } from "./api";

export const getListSeatsbyRoom = async (roomId: number) => {
    const res = await api.get(`/admin/theater-rooms/${roomId}/seats`);
    return res.data;
}
export const CreateSeat = async (roomId: number, data: SeatRequest) => {
    const res = await api.post(`/admin/theater-rooms/${roomId}/seats`, data);
    return res.data;
}
export const CreateAutoSeat = async (roomId: number, data: SeatGenerationRequest) => {
    const res = await api.post(`/admin/theater-rooms/${roomId}/seats/generate`, data);
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
export const UpdateSeatStatus = async (roomId: number, seatId: number, status: SeatStatus) => {
    const res = await api.put(`/admin/theater-rooms/${roomId}/seats/${seatId}/status?status=${status}`);
    return res.data;
}
export const UpdateSeatType = async (roomId: number, seatId: number, type: SeatType) => {
    const res = await api.put(`/admin/theater-rooms/${roomId}/seats/${seatId}/type?type=${type}`);
    return res.data;
}