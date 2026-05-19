package com.cinema.movie_booking.service;

import com.cinema.movie_booking.dto.auth.AuthResponse;
import com.cinema.movie_booking.dto.auth.LoginRequest;
import com.cinema.movie_booking.dto.auth.MeResponse;
import com.cinema.movie_booking.dto.auth.RegisterRequest;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
    MeResponse me(String email);
}
