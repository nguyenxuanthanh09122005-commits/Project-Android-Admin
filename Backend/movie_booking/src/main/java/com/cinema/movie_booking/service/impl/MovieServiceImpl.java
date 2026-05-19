package com.cinema.movie_booking.service.impl;

import com.cinema.movie_booking.dto.movie.MovieRequest;
import com.cinema.movie_booking.dto.movie.MovieResponse;
import com.cinema.movie_booking.entity.Movie;
import com.cinema.movie_booking.exception.NotFoundException;
import com.cinema.movie_booking.repository.MovieRepository;
import com.cinema.movie_booking.service.MovieService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MovieServiceImpl implements MovieService {

    private final MovieRepository movieRepository;

    @Override
    public List<MovieResponse> getAllMovies() {
        return movieRepository.findAll().stream().map(this::toResponse).toList();
    }

    @Override
    public MovieResponse getMovieById(Long movieId) {
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new NotFoundException("Movie not found with id: " + movieId));
        return toResponse(movie);
    }

    @Override
    public MovieResponse createMovie(MovieRequest request) {
        Movie movie = Movie.builder()
                .movieName(request.movieName())
                .description(request.description())
                .duration(request.duration())
                .releaseDate(request.releaseDate())
                .posterImage(request.posterImage())
                .trailerUrl(request.trailerUrl())
                .genre(request.genre())
                .ageRating(request.ageRating())
                .build();
        return toResponse(movieRepository.save(movie));
    }

    @Override
    public MovieResponse updateMovie(Long movieId, MovieRequest request) {
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new NotFoundException("Movie not found with id: " + movieId));

        movie.setMovieName(request.movieName());
        movie.setDescription(request.description());
        movie.setDuration(request.duration());
        movie.setReleaseDate(request.releaseDate());
        movie.setPosterImage(request.posterImage());
        movie.setTrailerUrl(request.trailerUrl());
        movie.setGenre(request.genre());
        movie.setAgeRating(request.ageRating());

        return toResponse(movieRepository.save(movie));
    }

    @Override
    public void deleteMovie(Long movieId) {
        if (!movieRepository.existsById(movieId)) {
            throw new NotFoundException("Movie not found with id: " + movieId);
        }
        movieRepository.deleteById(movieId);
    }

    private MovieResponse toResponse(Movie movie) {
        return new MovieResponse(
                movie.getMovieId(),
                movie.getMovieName(),
                movie.getDescription(),
                movie.getDuration(),
                movie.getReleaseDate(),
                movie.getPosterImage(),
                movie.getTrailerUrl(),
                movie.getGenre(),
                movie.getAgeRating()
        );
    }
}
