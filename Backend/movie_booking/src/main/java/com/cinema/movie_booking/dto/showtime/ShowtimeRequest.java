package com.cinema.movie_booking.dto.showtime;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ShowtimeRequest(
        @NotNull(message = "Movie id is required")
        Long movieId,
        @NotNull(message = "Room id is required")
        Long roomId,
        @NotNull(message = "Start time is required")
        LocalDateTime startTime,
        @NotNull(message = "End time is required")
        LocalDateTime endTime,
        @NotNull(message = "Base ticket price is required")
        @DecimalMin(value = "0.01", message = "Base ticket price must be greater than 0")
        BigDecimal baseTicketPrice
) {
}

