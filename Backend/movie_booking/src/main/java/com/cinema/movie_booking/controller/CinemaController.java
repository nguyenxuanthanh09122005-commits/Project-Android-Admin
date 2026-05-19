package com.cinema.movie_booking.controller;

import com.cinema.movie_booking.dto.cinema.CinemaResponse;
import com.cinema.movie_booking.service.CinemaService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cinemas")
@RequiredArgsConstructor
public class CinemaController {

    private final CinemaService cinemaService;

    @GetMapping
    public List<CinemaResponse> getAllCinemas() {
        return cinemaService.getAllCinemas();
    }

    @GetMapping("/{cinemaId}")
    public CinemaResponse getCinemaById(@PathVariable Long cinemaId) {
        return cinemaService.getCinemaById(cinemaId);
    }
}
