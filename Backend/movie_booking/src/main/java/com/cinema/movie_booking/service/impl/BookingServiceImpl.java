package com.cinema.movie_booking.service.impl;

import com.cinema.movie_booking.dto.booking.BookingRequest;
import com.cinema.movie_booking.dto.booking.BookingResponse;
import com.cinema.movie_booking.dto.booking.BookingStatusUpdateRequest;
import com.cinema.movie_booking.dto.booking.TicketDetailResponse;
import com.cinema.movie_booking.entity.Booking;
import com.cinema.movie_booking.entity.BookingStatus;
import com.cinema.movie_booking.entity.Seat;
import com.cinema.movie_booking.entity.SeatLock;
import com.cinema.movie_booking.entity.Showtime;
import com.cinema.movie_booking.entity.TicketDetail;
import com.cinema.movie_booking.entity.TicketDetailId;
import com.cinema.movie_booking.entity.User;
import com.cinema.movie_booking.dto.booking.*;
import com.cinema.movie_booking.exception.NotFoundException;
import com.cinema.movie_booking.repository.BookingRepository;
import com.cinema.movie_booking.repository.SeatLockRepository;
import com.cinema.movie_booking.repository.SeatRepository;
import com.cinema.movie_booking.repository.ShowtimeRepository;
import com.cinema.movie_booking.repository.TicketDetailRepository;
import com.cinema.movie_booking.repository.UserRepository;
import com.cinema.movie_booking.service.BookingService;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final ShowtimeRepository showtimeRepository;
    private final SeatRepository seatRepository;
    private final SeatLockRepository seatLockRepository;
    private final TicketDetailRepository ticketDetailRepository;

    @Value("${seat.lock.expiration-minutes}")
    private long seatLockExpirationMinutes;

    @Override
    @Transactional
    public BookingResponse createBooking(String userEmail, BookingRequest request) {
        Showtime showtime = showtimeRepository.findById(request.showtimeId())
                .orElseThrow(() -> new NotFoundException("Showtime not found with id: " + request.showtimeId()));

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + userEmail));

        List<Seat> availableSeats = seatRepository.findByTheaterRoomRoomId(showtime.getTheaterRoom().getRoomId());
        Map<Long, Seat> seatById = availableSeats.stream().collect(Collectors.toMap(Seat::getSeatId, s -> s));
        Set<Long> allowedSeatIds = seatById.keySet();

        List<Long> seatIds = request.seatIds();
        if (!allowedSeatIds.containsAll(seatIds)) {
            throw new IllegalArgumentException("One or more seats are invalid for this showtime");
        }

        List<Long> bookedSeatIds = ticketDetailRepository.findBookedSeatIdsByShowtimeId(showtime.getShowtimeId());
        Set<Long> bookedSeatSet = Set.copyOf(bookedSeatIds);
        if (!bookedSeatSet.isEmpty()) {
            List<Long> intersection = seatIds.stream().filter(bookedSeatSet::contains).toList();
            if (!intersection.isEmpty()) {
                throw new IllegalArgumentException("Seats already booked: " + intersection);
            }
        }

        LocalDateTime now = LocalDateTime.now();
        List<Long> activeLockedSeatIds = seatLockRepository.findActiveLockedSeatIds(showtime.getShowtimeId(), now, seatIds);
        Set<Long> lockedSeatSet = Set.copyOf(activeLockedSeatIds);
        List<Long> lockedIntersection = seatIds.stream().filter(lockedSeatSet::contains).toList();
        if (!lockedIntersection.isEmpty()) {
            throw new IllegalArgumentException("Seats are currently locked: " + lockedIntersection);
        }

        // 1) Lock requested seats (seat_locks)
        LocalDateTime expiresAt = now.plusMinutes(seatLockExpirationMinutes);
        List<SeatLock> locks = seatIds.stream().map(seatId -> {
            Seat seat = seatById.get(seatId);
            return SeatLock.builder()
                    .showtime(showtime)
                    .seat(seat)
                    .user(user)
                    .lockedAt(now)
                    .expiresAt(expiresAt)
                    .build();
        }).toList();
        try {
            seatLockRepository.saveAll(locks);
        } catch (DataIntegrityViolationException ex) {
            throw new IllegalArgumentException("Seats are currently locked: " + seatIds);
        }

        // 2) Create booking
        int seatCount = seatIds.size();
        BigDecimal totalAmount = showtime.getBaseTicketPrice().multiply(BigDecimal.valueOf(seatCount));

        Booking booking = Booking.builder()
                .user(user)
                .showtime(showtime)
                .bookingDate(now)
                .totalAmount(totalAmount)
                .status(BookingStatus.PendingPayment)
                .build();
        Booking savedBooking = bookingRepository.save(booking);

        // 3) Create ticket details
        List<TicketDetail> ticketDetails = new ArrayList<>();
        for (Long seatId : seatIds) {
            Seat seat = seatById.get(seatId);
            TicketDetailId ticketDetailId = new TicketDetailId(savedBooking.getBookingId(), seatId);
            TicketDetail detail = TicketDetail.builder()
                    .id(ticketDetailId)
                    .booking(savedBooking)
                    .seat(seat)
                    .purchasePrice(showtime.getBaseTicketPrice())
                    .build();
            ticketDetails.add(detail);
        }
        ticketDetailRepository.saveAll(ticketDetails);

        return toBookingResponse(savedBooking, ticketDetails);
    }

    @Override
    public List<BookingResponse> getMyBookings(String userEmail) {
        List<Booking> bookings = bookingRepository.findByUser_Email(userEmail);
        return bookings.stream().map(this::toBookingResponse).toList();
    }

    @Override
    public BookingResponse getBookingById(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new NotFoundException("Booking not found with id: " + bookingId));
        return toBookingResponse(booking);
    }

    @Override
    @Transactional
    public BookingResponse updateBookingStatus(Long bookingId, BookingStatusUpdateRequest request) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new NotFoundException("Booking not found with id: " + bookingId));

        booking.setStatus(parseStatus(request.status()));
        Booking saved = bookingRepository.save(booking);

        return toBookingResponse(saved);
    }

    @Override
    public List<BookingResponse> getAllBookings() {
        return bookingRepository.findAll().stream().map(this::toBookingResponse).toList();
    }

    private BookingStatus parseStatus(String raw) {
        String normalized = raw.trim().toLowerCase();
        if (normalized.equals("paid")) {
            return BookingStatus.Paid;
        }
        if (normalized.equals("pending") || normalized.equals("pendingpayment") || normalized.equals("pending_payment")) {
            return BookingStatus.PendingPayment;
        }
        throw new IllegalArgumentException("Invalid booking status: " + raw);
    }

    private BookingResponse toBookingResponse(Booking booking) {
        List<TicketDetail> tickets = ticketDetailRepository.findByBooking_BookingId(booking.getBookingId());
        List<TicketDetailResponse> ticketResponses = tickets.stream().map(this::toTicketDetailResponse).toList();
        return new BookingResponse(
                booking.getBookingId(),
                booking.getShowtime().getShowtimeId(),
                booking.getTotalAmount(),
                booking.getStatus(),
                booking.getBookingDate(),
                ticketResponses
        );
    }

    private BookingResponse toBookingResponse(Booking booking, List<TicketDetail> tickets) {
        List<TicketDetailResponse> ticketResponses = tickets.stream().map(this::toTicketDetailResponse).toList();
        return new BookingResponse(
                booking.getBookingId(),
                booking.getShowtime().getShowtimeId(),
                booking.getTotalAmount(),
                booking.getStatus(),
                booking.getBookingDate(),
                ticketResponses
        );
    }

    private TicketDetailResponse toTicketDetailResponse(TicketDetail detail) {
        return new TicketDetailResponse(
                detail.getSeat().getSeatId(),
                detail.getSeat().getRowLetter(),
                detail.getSeat().getSeatNumber(),
                detail.getSeat().getSeatType(),
                detail.getPurchasePrice()
        );
    }
}

