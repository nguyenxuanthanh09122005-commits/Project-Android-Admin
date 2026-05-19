package com.cinema.movie_booking.dto.seat;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record SeatRequest(
        @NotBlank(message = "Row letter is required")
        @Size(min = 1, max = 1, message = "Row letter must be exactly 1 character")
        String rowLetter,
        @NotNull(message = "Seat number is required")
        Integer seatNumber,
        String seatType
) {
}

