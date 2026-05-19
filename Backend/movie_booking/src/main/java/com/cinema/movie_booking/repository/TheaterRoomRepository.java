package com.cinema.movie_booking.repository;

import com.cinema.movie_booking.entity.TheaterRoom;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TheaterRoomRepository extends JpaRepository<TheaterRoom, Long> {
    List<TheaterRoom> findByCinema_CinemaId(Long cinemaId);
}

