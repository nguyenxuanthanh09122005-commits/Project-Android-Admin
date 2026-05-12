export type BookingRequest = {
    showtimeId: number;
    seatIds: number[];
}
export type BookingStatusUpdateRequest = {
    status: string
}

export type BookingResponse = {
    bookingId: number;
    showtimeId: number;
    totalAmount: number;
    status: string;
    bookingDate: string;
    tickets: TicketDetailResponse[];
}
export type TicketDetailResponse = {
    seatId: number;
    rowLetter: string;
    seatNumber: number;
    seatType: string;
    purchasePrice: number;
}