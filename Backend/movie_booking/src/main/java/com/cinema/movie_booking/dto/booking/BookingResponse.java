package com.cinema.movie_booking.dto.booking;

import com.cinema.movie_booking.entity.BookingStatus;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record BookingResponse(
        Long bookingId,
        Long showtimeId,
        BigDecimal totalAmount,
        BookingStatus status,
        LocalDateTime bookingDate,
        List<TicketDetailResponse> tickets
) {
}
