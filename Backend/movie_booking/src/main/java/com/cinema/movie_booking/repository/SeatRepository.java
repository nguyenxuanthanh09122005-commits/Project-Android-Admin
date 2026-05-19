package com.cinema.movie_booking.repository;

import com.cinema.movie_booking.entity.Seat;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeatRepository extends JpaRepository<Seat, Long> {
    List<Seat> findByTheaterRoomRoomId(Long roomId);
}

