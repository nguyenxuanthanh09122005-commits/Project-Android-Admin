export type SeatRequest = {
    rowLetter: string,
    seatNumber: number,
    seatType: SeatType,
    seatStatus: SeatStatus
}

export type SeatResponse = {
    seatId: number,
    roomId: number,
    rowLetter: string,
    seatNumber: number,
    seatType: SeatType,
    pairId: number,
    status: SeatStatus
}
export type SeatBulkRequest = {
    seats: SeatRequest[]
}

export type SeatAvailabilityResponse = {
    seatId: number,
    rowLetter: string,
    seatNumber: number,
    seatType: SeatType,
    locked: boolean
}
export type SeatGenerationRequest = {
    rows: number,
    columns: number,
}
export type SeatStatus = "ACTIVE" | "DISABLED";
export type SeatType = "NORMAL" | "VIP" | "COUPLE";