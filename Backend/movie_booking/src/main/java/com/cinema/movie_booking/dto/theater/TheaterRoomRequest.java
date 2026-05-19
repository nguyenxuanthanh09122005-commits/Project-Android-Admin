package com.cinema.movie_booking.dto.theater;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record TheaterRoomRequest(
        @NotNull(message = "Cinema id is required")
        Long cinemaId,
        @NotBlank(message = "Room name is required")
        String roomName,
        @NotNull(message = "Total seats is required")
        @Positive(message = "Total seats must be greater than 0")
        Integer totalSeats
) {
}

