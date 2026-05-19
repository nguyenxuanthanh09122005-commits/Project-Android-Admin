package com.cinema.movie_booking.repository;

import com.cinema.movie_booking.entity.Showtime;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShowtimeRepository extends JpaRepository<Showtime, Long> {
}

