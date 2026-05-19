package com.cinema.movie_booking.service;

import com.cinema.movie_booking.dto.movie.MovieRequest;
import com.cinema.movie_booking.dto.movie.MovieResponse;
import java.util.List;

public interface MovieService {
    List<MovieResponse> getAllMovies();
    MovieResponse getMovieById(Long movieId);
    MovieResponse createMovie(MovieRequest request);
    MovieResponse updateMovie(Long movieId, MovieRequest request);
    void deleteMovie(Long movieId);
}
