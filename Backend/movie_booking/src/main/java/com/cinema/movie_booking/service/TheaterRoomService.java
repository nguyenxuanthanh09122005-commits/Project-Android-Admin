package com.cinema.movie_booking.service;

import com.cinema.movie_booking.dto.theater.TheaterRoomRequest;
import com.cinema.movie_booking.dto.theater.TheaterRoomResponse;
import java.util.List;

public interface TheaterRoomService {
    List<TheaterRoomResponse> getTheaterRoomsByCinema(Long cinemaId);
    TheaterRoomResponse getTheaterRoomById(Long roomId);
    TheaterRoomResponse createTheaterRoom(TheaterRoomRequest request);
    TheaterRoomResponse updateTheaterRoom(Long roomId, TheaterRoomRequest request);
    void deleteTheaterRoom(Long roomId);
}

