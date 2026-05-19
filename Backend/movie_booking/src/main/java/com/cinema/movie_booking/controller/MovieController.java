package com.cinema.movie_booking.controller;

import com.cinema.movie_booking.dto.movie.MovieResponse;
import com.cinema.movie_booking.service.MovieService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/movies")
@RequiredArgsConstructor
public class MovieController {

    private final MovieService movieService;

    @GetMapping
    public List<MovieResponse> getAllMovies() {
        return movieService.getAllMovies();
    }

    @GetMapping("/{movieId}")
    public MovieResponse getMovieById(@PathVariable Long movieId) {
        return movieService.getMovieById(movieId);
    }
}
