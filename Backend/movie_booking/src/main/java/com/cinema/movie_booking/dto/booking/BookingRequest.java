package com.cinema.movie_booking.dto.booking;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public record BookingRequest(
        @NotNull(message = "Showtime id is required")
        Long showtimeId,
        @NotEmpty(message = "At least one seat must be selected")
        List<Long> seatIds
) {
}
