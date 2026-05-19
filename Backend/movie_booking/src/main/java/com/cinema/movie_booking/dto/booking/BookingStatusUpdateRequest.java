package com.cinema.movie_booking.dto.booking;

import jakarta.validation.constraints.NotBlank;

public record BookingStatusUpdateRequest(
        @NotBlank(message = "Status is required")
        String status
) {
}
