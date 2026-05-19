package com.cinema.movie_booking.dto.movie;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

public record MovieRequest(
        @NotBlank(message = "Movie name is required")
        @Size(max = 255, message = "Movie name must be at most 255 characters")
        String movieName,
        String description,
        @NotNull(message = "Duration is required")
        @Min(value = 1, message = "Duration must be greater than 0")
        Integer duration,
        LocalDate releaseDate,
        String posterImage,
        String trailerUrl,
        @Size(max = 100, message = "Genre must be at most 100 characters")
        String genre,
        @Size(max = 20, message = "Age rating must be at most 20 characters")
        String ageRating
) {
}
