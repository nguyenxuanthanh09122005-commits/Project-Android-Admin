package com.cinema.movie_booking.dto.booking;

import java.math.BigDecimal;

public record TicketDetailResponse(
        Long seatId,
        String rowLetter,
        Integer seatNumber,
        String seatType,
        BigDecimal purchasePrice
) {
}
