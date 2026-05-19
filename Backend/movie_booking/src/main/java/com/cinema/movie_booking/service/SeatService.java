package com.cinema.movie_booking.service;

import com.cinema.movie_booking.dto.seat.SeatBulkRequest;
import com.cinema.movie_booking.dto.seat.SeatRequest;
import com.cinema.movie_booking.dto.seat.SeatResponse;
import java.util.List;

public interface SeatService {
    List<SeatResponse> getSeatsByRoom(Long roomId);
    SeatResponse createSeat(Long roomId, SeatRequest request);
    List<SeatResponse> createSeats(Long roomId, SeatBulkRequest request);
    void deleteSeat(Long seatId);
}

