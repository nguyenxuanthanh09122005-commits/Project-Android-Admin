package com.cinema.movie_booking.controller;

import com.cinema.movie_booking.dto.theater.TheaterRoomRequest;
import com.cinema.movie_booking.dto.theater.TheaterRoomResponse;
import com.cinema.movie_booking.service.TheaterRoomService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/theater-rooms")
@RequiredArgsConstructor
public class AdminTheaterRoomController {

    private final TheaterRoomService theaterRoomService;

    @GetMapping("/cinema/{cinemaId}")
    public List<TheaterRoomResponse> getRoomsByCinema(@PathVariable Long cinemaId) {
        return theaterRoomService.getTheaterRoomsByCinema(cinemaId);
    }

    @GetMapping("/{roomId}")
    public TheaterRoomResponse getRoom(@PathVariable Long roomId) {
        return theaterRoomService.getTheaterRoomById(roomId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TheaterRoomResponse createRoom(@Valid @RequestBody TheaterRoomRequest request) {
        return theaterRoomService.createTheaterRoom(request);
    }

    @PutMapping("/{roomId}")
    public TheaterRoomResponse updateRoom(
            @PathVariable Long roomId,
            @Valid @RequestBody TheaterRoomRequest request
    ) {
        return theaterRoomService.updateTheaterRoom(roomId, request);
    }

    @DeleteMapping("/{roomId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteRoom(@PathVariable Long roomId) {
        theaterRoomService.deleteTheaterRoom(roomId);
    }
}

