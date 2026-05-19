package com.cinema.movie_booking.repository;

import com.cinema.movie_booking.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepository extends JpaRepository<Movie, Long> {
}
