package com.cinema.movie_booking.service;

import com.cinema.movie_booking.dto.cinema.CinemaRequest;
import com.cinema.movie_booking.dto.cinema.CinemaResponse;
import java.util.List;

public interface CinemaService {
    List<CinemaResponse> getAllCinemas();
    CinemaResponse getCinemaById(Long cinemaId);
    CinemaResponse createCinema(CinemaRequest request);
    CinemaResponse updateCinema(Long cinemaId, CinemaRequest request);
    void deleteCinema(Long cinemaId);
}
