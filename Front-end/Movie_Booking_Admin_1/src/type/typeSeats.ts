export type SeatRequest = {
    rowLetter: string,
    seatNumber: number,
    seatType: string
}

export type SeatResponse = {
    seatId: number,
    roomId: number,
    rowLetter: string,
    seatNumber: number,
    seatType: string
}
export type SeatBulkRequest = {
    seats: SeatRequest[]
}
export type SeatAvailabilityResponse = {
    seatId: number,
    rowLetter: string,
    seatNumber: number,
    seatType: string,
    locked: boolean
}