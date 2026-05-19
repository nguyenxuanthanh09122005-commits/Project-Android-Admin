package com.cinema.movie_booking.service;

import com.cinema.movie_booking.dto.booking.BookingRequest;
import com.cinema.movie_booking.dto.booking.BookingResponse;
import com.cinema.movie_booking.dto.booking.BookingStatusUpdateRequest;
import java.util.List;

public interface BookingService {

    BookingResponse createBooking(String userEmail, BookingRequest request);

    List<BookingResponse> getMyBookings(String userEmail);

    BookingResponse getBookingById(Long bookingId);

    BookingResponse updateBookingStatus(Long bookingId, BookingStatusUpdateRequest request);

    List<BookingResponse> getAllBookings();
}
