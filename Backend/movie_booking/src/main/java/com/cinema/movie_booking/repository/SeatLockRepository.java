package com.cinema.movie_booking.repository;

import com.cinema.movie_booking.entity.SeatLock;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SeatLockRepository extends JpaRepository<SeatLock, Long> {

    boolean existsBySeat_SeatIdAndShowtime_ShowtimeIdAndExpiresAtAfter(Long seatId, Long showtimeId, LocalDateTime now);

    @Query("""
            select sl.seat.seatId
            from SeatLock sl
            where sl.showtime.showtimeId = :showtimeId
              and sl.expiresAt > :now
              and sl.seat.seatId in :seatIds
            """)
    List<Long> findActiveLockedSeatIds(
            @Param("showtimeId") Long showtimeId,
            @Param("now") LocalDateTime now,
            @Param("seatIds") List<Long> seatIds
    );
}

