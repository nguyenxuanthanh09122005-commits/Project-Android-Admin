package com.cinema.movie_booking.service;

import com.cinema.movie_booking.dto.seat.SeatAvailabilityResponse;
import com.cinema.movie_booking.dto.showtime.ShowtimeRequest;
import com.cinema.movie_booking.dto.showtime.ShowtimeResponse;
import java.util.List;

public interface ShowtimeService {
    List<ShowtimeResponse> getAllShowtimes();

    ShowtimeResponse getShowtimeById(Long showtimeId);

    List<SeatAvailabilityResponse> getSeatAvailability(Long showtimeId);

    ShowtimeResponse createShowtime(ShowtimeRequest request);

    ShowtimeResponse updateShowtime(Long showtimeId, ShowtimeRequest request);

    void deleteShowtime(Long showtimeId);
}
