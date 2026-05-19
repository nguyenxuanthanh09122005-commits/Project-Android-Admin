package com.cinema.movie_booking.dto.cinema;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CinemaRequest(
        @NotBlank(message = "Cinema name is required")
        @Size(max = 255, message = "Cinema name must be at most 255 characters")
        String cinemaName,
        @NotBlank(message = "Address is required")
        String address,
        @NotBlank(message = "City is required")
        @Size(max = 100, message = "City must be at most 100 characters")
        String city
) {
}
