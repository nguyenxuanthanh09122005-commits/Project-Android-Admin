package com.cinema.movie_booking.controller;

import com.cinema.movie_booking.dto.auth.AuthResponse;
import com.cinema.movie_booking.dto.auth.LoginRequest;
import com.cinema.movie_booking.dto.auth.MeResponse;
import com.cinema.movie_booking.dto.auth.RegisterRequest;
import com.cinema.movie_booking.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public AuthResponse register(@Valid @RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @GetMapping("/me")
    public MeResponse me(Authentication authentication) {
        return authService.me(authentication.getName());
    }
}
