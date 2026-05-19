package com.cinema.movie_booking.dto.movie;

import java.time.LocalDate;

public record MovieResponse(
        Long movieId,
        String movieName,
        String description,
        Integer duration,
        LocalDate releaseDate,
        String posterImage,
        String trailerUrl,
        String genre,
        String ageRating
) {
}
