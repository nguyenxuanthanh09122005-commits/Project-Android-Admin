import type { BookingStatusUpdateRequest } from "../type/typeBooking";
import { api } from "./api";

export const getListBookings = async () => {
    const res = await api.get("/admin/bookings");
    return res.data;
}
export const getDetailedBooking = async (bookingId: number) => {
    const res = await api.get(`/admin/bookings/${bookingId}`);
    return res.data;
}
export const updateBookingStatus = async (bookingId: number, status: BookingStatusUpdateRequest) => {
    const res = await api.put(`/admin/bookings/${bookingId}`, { status });
    return res.data;
}