package com.cinema.movie_booking.dto.theater;

public record TheaterRoomResponse(
        Long roomId,
        Long cinemaId,
        String cinemaName,
        String roomName,
        Integer totalSeats
) {
}

