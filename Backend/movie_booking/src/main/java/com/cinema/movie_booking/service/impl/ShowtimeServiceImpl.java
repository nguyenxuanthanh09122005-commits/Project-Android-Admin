package com.cinema.movie_booking.service.impl;

import com.cinema.movie_booking.dto.seat.SeatAvailabilityResponse;
import com.cinema.movie_booking.dto.showtime.ShowtimeRequest;
import com.cinema.movie_booking.dto.showtime.ShowtimeResponse;
import com.cinema.movie_booking.entity.Seat;
import com.cinema.movie_booking.entity.Showtime;
import com.cinema.movie_booking.entity.TheaterRoom;
import com.cinema.movie_booking.exception.NotFoundException;
import com.cinema.movie_booking.repository.MovieRepository;
import com.cinema.movie_booking.repository.SeatLockRepository;
import com.cinema.movie_booking.repository.SeatRepository;
import com.cinema.movie_booking.repository.ShowtimeRepository;
import com.cinema.movie_booking.repository.TheaterRoomRepository;
import com.cinema.movie_booking.repository.TicketDetailRepository;
import com.cinema.movie_booking.service.ShowtimeService;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ShowtimeServiceImpl implements ShowtimeService {

    private final ShowtimeRepository showtimeRepository;
    private final MovieRepository movieRepository;
    private final TheaterRoomRepository theaterRoomRepository;
    private final SeatRepository seatRepository;
    private final TicketDetailRepository ticketDetailRepository;
    private final SeatLockRepository seatLockRepository;

    @Override
    public List<ShowtimeResponse> getAllShowtimes() {
        return showtimeRepository.findAll().stream().map(this::toShowtimeResponse).toList();
    }

    @Override
    public ShowtimeResponse getShowtimeById(Long showtimeId) {
        Showtime showtime = showtimeRepository.findById(showtimeId)
                .orElseThrow(() -> new NotFoundException("Showtime not found with id: " + showtimeId));
        return toShowtimeResponse(showtime);
    }

    @Override
    public List<SeatAvailabilityResponse> getSeatAvailability(Long showtimeId) {
        Showtime showtime = showtimeRepository.findById(showtimeId)
                .orElseThrow(() -> new NotFoundException("Showtime not found with id: " + showtimeId));

        List<Seat> seats = seatRepository.findByTheaterRoomRoomId(showtime.getTheaterRoom().getRoomId());
        if (seats.isEmpty()) {
            return List.of();
        }
        List<Long> seatIds = seats.stream().map(Seat::getSeatId).toList();

        LocalDateTime now = LocalDateTime.now();
        List<Long> bookedSeatIds = ticketDetailRepository.findBookedSeatIdsByShowtimeId(showtimeId);
        List<Long> activeLockedSeatIds = seatLockRepository.findActiveLockedSeatIds(showtimeId, now, seatIds);

        Set<Long> bookedSet = Set.copyOf(bookedSeatIds);
        Set<Long> lockedSet = Set.copyOf(activeLockedSeatIds);

        return seats.stream()
                .map(seat -> new SeatAvailabilityResponse(
                        seat.getSeatId(),
                        seat.getRowLetter(),
                        seat.getSeatNumber(),
                        seat.getSeatType(),
                        bookedSet.contains(seat.getSeatId()) || lockedSet.contains(seat.getSeatId())
                ))
                .toList();
    }

    @Override
    public ShowtimeResponse createShowtime(ShowtimeRequest request) {
        Showtime showtime = buildShowtime(request, null);
        return toShowtimeResponse(showtimeRepository.save(showtime));
    }

    @Override
    public ShowtimeResponse updateShowtime(Long showtimeId, ShowtimeRequest request) {
        Showtime existing = showtimeRepository.findById(showtimeId)
                .orElseThrow(() -> new NotFoundException("Showtime not found with id: " + showtimeId));

        existing.setMovie(
                movieRepository.findById(request.movieId())
                        .orElseThrow(() -> new NotFoundException("Movie not found with id: " + request.movieId()))
        );
        existing.setTheaterRoom(
                theaterRoomRepository.findById(request.roomId())
                        .orElseThrow(() -> new NotFoundException("Room not found with id: " + request.roomId()))
        );
        existing.setStartTime(request.startTime());
        existing.setEndTime(request.endTime());
        existing.setBaseTicketPrice(request.baseTicketPrice());

        return toShowtimeResponse(showtimeRepository.save(existing));
    }

    @Override
    public void deleteShowtime(Long showtimeId) {
        if (!showtimeRepository.existsById(showtimeId)) {
            throw new NotFoundException("Showtime not found with id: " + showtimeId);
        }
        showtimeRepository.deleteById(showtimeId);
    }

    private Showtime buildShowtime(ShowtimeRequest request, Showtime existing) {
        TheaterRoom room = theaterRoomRepository.findById(request.roomId())
                .orElseThrow(() -> new NotFoundException("Room not found with id: " + request.roomId()));

        var movie = movieRepository.findById(request.movieId())
                .orElseThrow(() -> new NotFoundException("Movie not found with id: " + request.movieId()));

        return Showtime.builder()
                .movie(movie)
                .theaterRoom(room)
                .startTime(request.startTime())
                .endTime(request.endTime())
                .baseTicketPrice(request.baseTicketPrice() != null ? request.baseTicketPrice() : BigDecimal.ZERO)
                .build();
    }

    private ShowtimeResponse toShowtimeResponse(Showtime showtime) {
        return new ShowtimeResponse(
                showtime.getShowtimeId(),
                showtime.getMovie().getMovieId(),
                showtime.getMovie().getMovieName(),
                showtime.getTheaterRoom().getRoomId(),
                showtime.getTheaterRoom().getRoomName(),
                showtime.getTheaterRoom().getCinema().getCinemaId(),
                showtime.getTheaterRoom().getCinema().getCinemaName(),
                showtime.getStartTime(),
                showtime.getEndTime(),
                showtime.getBaseTicketPrice()
        );
    }
}
