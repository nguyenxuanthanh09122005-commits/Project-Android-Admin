package com.cinema.movie_booking.service.impl;

import com.cinema.movie_booking.dto.seat.SeatBulkRequest;
import com.cinema.movie_booking.dto.seat.SeatRequest;
import com.cinema.movie_booking.dto.seat.SeatResponse;
import com.cinema.movie_booking.entity.Seat;
import com.cinema.movie_booking.entity.TheaterRoom;
import com.cinema.movie_booking.exception.NotFoundException;
import com.cinema.movie_booking.repository.SeatRepository;
import com.cinema.movie_booking.repository.TheaterRoomRepository;
import com.cinema.movie_booking.service.SeatService;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SeatServiceImpl implements SeatService {

    private final SeatRepository seatRepository;
    private final TheaterRoomRepository theaterRoomRepository;

    @Override
    public List<SeatResponse> getSeatsByRoom(Long roomId) {
        return seatRepository.findByTheaterRoomRoomId(roomId).stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public SeatResponse createSeat(Long roomId, SeatRequest request) {
        TheaterRoom room = theaterRoomRepository.findById(roomId)
                .orElseThrow(() -> new NotFoundException("Theater room not found with id: " + roomId));

        Seat seat = Seat.builder()
                .theaterRoom(room)
                .rowLetter(request.rowLetter())
                .seatNumber(request.seatNumber())
                .seatType(request.seatType() != null ? request.seatType() : "Standard")
                .build();

        return toResponse(seatRepository.save(seat));
    }

    @Override
    public List<SeatResponse> createSeats(Long roomId, SeatBulkRequest request) {
        TheaterRoom room = theaterRoomRepository.findById(roomId)
                .orElseThrow(() -> new NotFoundException("Theater room not found with id: " + roomId));

        List<Seat> seats = request.seats().stream()
                .map(req -> Seat.builder()
                        .theaterRoom(room)
                        .rowLetter(req.rowLetter())
                        .seatNumber(req.seatNumber())
                        .seatType(req.seatType() != null ? req.seatType() : "Standard")
                        .build())
                .collect(Collectors.toList());

        return seatRepository.saveAll(seats).stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public void deleteSeat(Long seatId) {
        if (!seatRepository.existsById(seatId)) {
            throw new NotFoundException("Seat not found with id: " + seatId);
        }
        seatRepository.deleteById(seatId);
    }

    private SeatResponse toResponse(Seat seat) {
        return new SeatResponse(
                seat.getSeatId(),
                seat.getTheaterRoom().getRoomId(),
                seat.getRowLetter(),
                seat.getSeatNumber(),
                seat.getSeatType()
        );
    }
}

