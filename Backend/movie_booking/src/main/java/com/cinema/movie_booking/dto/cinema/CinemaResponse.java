package com.cinema.movie_booking.dto.cinema;

public record CinemaResponse(
        Long cinemaId,
        String cinemaName,
        String address,
        String city
) {
}
