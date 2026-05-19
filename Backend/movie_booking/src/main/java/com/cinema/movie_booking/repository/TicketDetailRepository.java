package com.cinema.movie_booking.repository;

import com.cinema.movie_booking.entity.TicketDetail;
import com.cinema.movie_booking.entity.TicketDetailId;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TicketDetailRepository extends JpaRepository<TicketDetail, TicketDetailId> {

    @Query("""
            select td.seat.seatId
            from TicketDetail td
            where td.booking.showtime.showtimeId = :showtimeId
              and td.booking.status = com.cinema.movie_booking.entity.BookingStatus.Paid
            """)
    List<Long> findBookedSeatIdsByShowtimeId(Long showtimeId);

    List<TicketDetail> findByBooking_BookingId(Long bookingId);
}

