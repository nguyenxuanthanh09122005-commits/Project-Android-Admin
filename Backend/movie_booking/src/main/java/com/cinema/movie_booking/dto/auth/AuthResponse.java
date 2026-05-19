package com.cinema.movie_booking.dto.auth;

public record AuthResponse(
        String token,
        String type,
        String email,
        String role
) {
}
