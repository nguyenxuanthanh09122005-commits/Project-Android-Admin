export type TheaterRoomTypeRequest = {
    cinemaId: number,
    roomName: string,
    totalSeats: number
}
export type TheaterRoomType = {
    roomId: number,
    cinemaId: number,
    cinemaName: string,
    roomName: string,
    totalSeats: number
}
