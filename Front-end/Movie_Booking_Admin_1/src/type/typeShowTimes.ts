export type ShowTimesRequest = {
    movieId: number,

    roomId: number,

    startTime: Date,

    endTime: Date,

    baseTicketPrice: number
}
export type ShowTimesResponse = {
    showtimeId: number,
    movieId: number,
    movieName: string,
    roomId: number,
    roomName: string,
    cinemaId: number,
    cinemaName: string,
    startTime: Date,
    endTime: Date,
    baseTicketPrice: number
}
export type getMovieIdShowTimes = {
    movieId: number,
    movieName: string
}
export type getRoomIdShowTimes = {
    roomId: number,
    roomName: string
}