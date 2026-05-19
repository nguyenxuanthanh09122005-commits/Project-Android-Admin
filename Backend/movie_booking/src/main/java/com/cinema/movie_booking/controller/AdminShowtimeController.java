package com.cinema.movie_booking.controller;

import com.cinema.movie_booking.dto.showtime.ShowtimeRequest;
import com.cinema.movie_booking.dto.showtime.ShowtimeResponse;
import com.cinema.movie_booking.service.ShowtimeService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/showtimes")
@RequiredArgsConstructor
public class AdminShowtimeController {

    private final ShowtimeService showtimeService;

    @GetMapping
    public List<ShowtimeResponse> getAllShowtimes() {
        return showtimeService.getAllShowtimes();
    }

    @GetMapping("/{showtimeId}")
    public ShowtimeResponse getShowtime(@PathVariable Long showtimeId) {
        return showtimeService.getShowtimeById(showtimeId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ShowtimeResponse createShowtime(@Valid @RequestBody ShowtimeRequest request) {
        return showtimeService.createShowtime(request);
    }

    @PutMapping("/{showtimeId}")
    public ShowtimeResponse updateShowtime(
            @PathVariable Long showtimeId,
            @Valid @RequestBody ShowtimeRequest request
    ) {
        return showtimeService.updateShowtime(showtimeId, request);
    }

    @DeleteMapping("/{showtimeId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteShowtime(@PathVariable Long showtimeId) {
        showtimeService.deleteShowtime(showtimeId);
    }
}
