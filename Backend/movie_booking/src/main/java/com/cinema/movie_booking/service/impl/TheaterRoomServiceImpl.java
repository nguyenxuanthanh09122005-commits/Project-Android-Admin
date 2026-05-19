package com.cinema.movie_booking.service.impl;

import com.cinema.movie_booking.dto.theater.TheaterRoomRequest;
import com.cinema.movie_booking.dto.theater.TheaterRoomResponse;
import com.cinema.movie_booking.entity.Cinema;
import com.cinema.movie_booking.entity.TheaterRoom;
import com.cinema.movie_booking.exception.NotFoundException;
import com.cinema.movie_booking.repository.CinemaRepository;
import com.cinema.movie_booking.repository.TheaterRoomRepository;
import com.cinema.movie_booking.service.TheaterRoomService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TheaterRoomServiceImpl implements TheaterRoomService {

    private final TheaterRoomRepository theaterRoomRepository;
    private final CinemaRepository cinemaRepository;

    @Override
    public List<TheaterRoomResponse> getTheaterRoomsByCinema(Long cinemaId) {
        return theaterRoomRepository.findByCinema_CinemaId(cinemaId).stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public TheaterRoomResponse getTheaterRoomById(Long roomId) {
        TheaterRoom room = theaterRoomRepository.findById(roomId)
                .orElseThrow(() -> new NotFoundException("Theater room not found with id: " + roomId));
        return toResponse(room);
    }

    @Override
    public TheaterRoomResponse createTheaterRoom(TheaterRoomRequest request) {
        Cinema cinema = cinemaRepository.findById(request.cinemaId())
                .orElseThrow(() -> new NotFoundException("Cinema not found with id: " + request.cinemaId()));

        TheaterRoom room = TheaterRoom.builder()
                .cinema(cinema)
                .roomName(request.roomName())
                .totalSeats(request.totalSeats())
                .build();

        return toResponse(theaterRoomRepository.save(room));
    }

    @Override
    public TheaterRoomResponse updateTheaterRoom(Long roomId, TheaterRoomRequest request) {
        TheaterRoom existing = theaterRoomRepository.findById(roomId)
                .orElseThrow(() -> new NotFoundException("Theater room not found with id: " + roomId));

        Cinema cinema = cinemaRepository.findById(request.cinemaId())
                .orElseThrow(() -> new NotFoundException("Cinema not found with id: " + request.cinemaId()));

        existing.setCinema(cinema);
        existing.setRoomName(request.roomName());
        existing.setTotalSeats(request.totalSeats());

        return toResponse(theaterRoomRepository.save(existing));
    }

    @Override
    public void deleteTheaterRoom(Long roomId) {
        if (!theaterRoomRepository.existsById(roomId)) {
            throw new NotFoundException("Theater room not found with id: " + roomId);
        }
        theaterRoomRepository.deleteById(roomId);
    }

    private TheaterRoomResponse toResponse(TheaterRoom room) {
        return new TheaterRoomResponse(
                room.getRoomId(),
                room.getCinema().getCinemaId(),
                room.getCinema().getCinemaName(),
                room.getRoomName(),
                room.getTotalSeats()
        );
    }
}

