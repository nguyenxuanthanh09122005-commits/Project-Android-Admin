package com.cinema.movie_booking.controller;

import com.cinema.movie_booking.dto.seat.SeatBulkRequest;
import com.cinema.movie_booking.dto.seat.SeatRequest;
import com.cinema.movie_booking.dto.seat.SeatResponse;
import com.cinema.movie_booking.service.SeatService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/theater-rooms/{roomId}/seats")
@RequiredArgsConstructor
public class AdminSeatController {

    private final SeatService seatService;

    @GetMapping
    public List<SeatResponse> getSeats(@PathVariable Long roomId) {
        return seatService.getSeatsByRoom(roomId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public SeatResponse createSeat(@PathVariable Long roomId, @Valid @RequestBody SeatRequest request) {
        return seatService.createSeat(roomId, request);
    }

    @PostMapping("/bulk")
    @ResponseStatus(HttpStatus.CREATED)
    public List<SeatResponse> createSeats(@PathVariable Long roomId, @Valid @RequestBody SeatBulkRequest request) {
        return seatService.createSeats(roomId, request);
    }

    @DeleteMapping("/{seatId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteSeat(@PathVariable Long seatId) {
        seatService.deleteSeat(seatId);
    }
}

