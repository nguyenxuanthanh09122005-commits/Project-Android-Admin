package com.cinema.movie_booking.controller;

import com.cinema.movie_booking.dto.cinema.CinemaRequest;
import com.cinema.movie_booking.dto.cinema.CinemaResponse;
import com.cinema.movie_booking.service.CinemaService;
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
@RequestMapping("/api/admin/cinemas")
@RequiredArgsConstructor
public class AdminCinemaController {

    private final CinemaService cinemaService;

    @GetMapping
    public List<CinemaResponse> getAllCinemas() {
        return cinemaService.getAllCinemas();
    }

    @GetMapping("/{cinemaId}")
    public CinemaResponse getCinemaById(@PathVariable Long cinemaId) {
        return cinemaService.getCinemaById(cinemaId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CinemaResponse createCinema(@Valid @RequestBody CinemaRequest request) {
        return cinemaService.createCinema(request);
    }

    @PutMapping("/{cinemaId}")
    public CinemaResponse updateCinema(@PathVariable Long cinemaId, @Valid @RequestBody CinemaRequest request) {
        return cinemaService.updateCinema(cinemaId, request);
    }

    @DeleteMapping("/{cinemaId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCinema(@PathVariable Long cinemaId) {
        cinemaService.deleteCinema(cinemaId);
    }
}
