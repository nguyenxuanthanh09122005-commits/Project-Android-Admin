package com.cinema.movie_booking.dto.seat;

import jakarta.validation.constraints.NotEmpty;
import java.util.List;

public record SeatBulkRequest(
        @NotEmpty(message = "Seats list must not be empty")
        List<SeatRequest> seats
) {
}

