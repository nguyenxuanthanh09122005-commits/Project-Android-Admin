package com.cinema.movie_booking.dto.seat;

public record SeatResponse(
        Long seatId,
        Long roomId,
        String rowLetter,
        Integer seatNumber,
        String seatType
) {
}

