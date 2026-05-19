package com.cinema.movie_booking.dto.seat;

public record SeatAvailabilityResponse(
        Long seatId,
        String rowLetter,
        Integer seatNumber,
        String seatType,
        boolean locked
) {
}
