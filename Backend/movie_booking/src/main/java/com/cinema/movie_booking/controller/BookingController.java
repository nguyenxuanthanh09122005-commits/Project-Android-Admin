package com.cinema.movie_booking.controller;

import com.cinema.movie_booking.dto.booking.BookingRequest;
import com.cinema.movie_booking.dto.booking.BookingResponse;
import com.cinema.movie_booking.service.BookingService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    public BookingResponse createBooking(
            Authentication authentication,
            @Valid @RequestBody BookingRequest request
    ) {
        return bookingService.createBooking(authentication.getName(), request);
    }

    @GetMapping
    public List<BookingResponse> getMyBookings(Authentication authentication) {
        return bookingService.getMyBookings(authentication.getName());
    }
}
