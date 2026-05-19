package com.cinema.movie_booking.dto.showtime;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ShowtimeResponse(
        Long showtimeId,
        Long movieId,
        String movieName,
        Long roomId,
        String roomName,
        Long cinemaId,
        String cinemaName,
        LocalDateTime startTime,
        LocalDateTime endTime,
        BigDecimal baseTicketPrice
) {
}
