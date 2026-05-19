package com.cinema.movie_booking.service.impl;

import com.cinema.movie_booking.dto.cinema.CinemaRequest;
import com.cinema.movie_booking.dto.cinema.CinemaResponse;
import com.cinema.movie_booking.entity.Cinema;
import com.cinema.movie_booking.exception.NotFoundException;
import com.cinema.movie_booking.repository.CinemaRepository;
import com.cinema.movie_booking.service.CinemaService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CinemaServiceImpl implements CinemaService {

    private final CinemaRepository cinemaRepository;

    @Override
    public List<CinemaResponse> getAllCinemas() {
        return cinemaRepository.findAll().stream().map(this::toResponse).toList();
    }

    @Override
    public CinemaResponse getCinemaById(Long cinemaId) {
        Cinema cinema = cinemaRepository.findById(cinemaId)
                .orElseThrow(() -> new NotFoundException("Cinema not found with id: " + cinemaId));
        return toResponse(cinema);
    }

    @Override
    public CinemaResponse createCinema(CinemaRequest request) {
        Cinema cinema = Cinema.builder()
                .cinemaName(request.cinemaName())
                .address(request.address())
                .city(request.city())
                .build();
        return toResponse(cinemaRepository.save(cinema));
    }

    @Override
    public CinemaResponse updateCinema(Long cinemaId, CinemaRequest request) {
        Cinema cinema = cinemaRepository.findById(cinemaId)
                .orElseThrow(() -> new NotFoundException("Cinema not found with id: " + cinemaId));

        cinema.setCinemaName(request.cinemaName());
        cinema.setAddress(request.address());
        cinema.setCity(request.city());

        return toResponse(cinemaRepository.save(cinema));
    }

    @Override
    public void deleteCinema(Long cinemaId) {
        if (!cinemaRepository.existsById(cinemaId)) {
            throw new NotFoundException("Cinema not found with id: " + cinemaId);
        }
        cinemaRepository.deleteById(cinemaId);
    }

    private CinemaResponse toResponse(Cinema cinema) {
        return new CinemaResponse(
                cinema.getCinemaId(),
                cinema.getCinemaName(),
                cinema.getAddress(),
                cinema.getCity()
        );
    }
}
