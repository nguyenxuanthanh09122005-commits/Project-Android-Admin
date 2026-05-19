package com.cinema.movie_booking.dto.auth;

public record MeResponse(
        Long userId,
        String fullName,
        String email,
        String phoneNumber,
        String role
) {
}
