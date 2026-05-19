package com.cinema.movie_booking.controller;

import com.cinema.movie_booking.dto.seat.SeatAvailabilityResponse;
import com.cinema.movie_booking.dto.showtime.ShowtimeResponse;
import com.cinema.movie_booking.service.ShowtimeService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/showtimes")
@RequiredArgsConstructor
public class ShowtimeController {

    private final ShowtimeService showtimeService;

    @GetMapping
    public List<ShowtimeResponse> getAllShowtimes() {
        return showtimeService.getAllShowtimes();
    }

    @GetMapping("/{showtimeId}")
    public ShowtimeResponse getShowtime(@PathVariable Long showtimeId) {
        return showtimeService.getShowtimeById(showtimeId);
    }

    @GetMapping("/{showtimeId}/seats")
    public List<SeatAvailabilityResponse> getSeatAvailability(@PathVariable Long showtimeId) {
        return showtimeService.getSeatAvailability(showtimeId);
    }
}
