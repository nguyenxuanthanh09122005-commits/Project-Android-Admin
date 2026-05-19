package com.cinema.movie_booking.repository;

import com.cinema.movie_booking.entity.Cinema;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CinemaRepository extends JpaRepository<Cinema, Long> {
}
