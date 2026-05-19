package com.cinema.movie_booking.service.impl;

import com.cinema.movie_booking.dto.auth.AuthResponse;
import com.cinema.movie_booking.dto.auth.LoginRequest;
import com.cinema.movie_booking.dto.auth.MeResponse;
import com.cinema.movie_booking.dto.auth.RegisterRequest;
import com.cinema.movie_booking.entity.Role;
import com.cinema.movie_booking.entity.User;
import com.cinema.movie_booking.repository.UserRepository;
import com.cinema.movie_booking.security.JwtService;
import com.cinema.movie_booking.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Override
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new IllegalArgumentException("Email is already registered");
        }

        User user = User.builder()
                .fullName(request.fullName())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .phoneNumber(request.phoneNumber())
                .role(Role.ROLE_USER)
                .build();
        userRepository.save(user);

        String token = jwtService.generateToken(user.getEmail(), user.getRole());
        return new AuthResponse(token, "Bearer", user.getEmail(), user.getRole().name());
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );

        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        String token = jwtService.generateToken(user.getEmail(), user.getRole());
        return new AuthResponse(token, "Bearer", user.getEmail(), user.getRole().name());
    }

    @Override
    public MeResponse me(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return new MeResponse(user.getId(), user.getFullName(), user.getEmail(), user.getPhoneNumber(), user.getRole().name());
    }
}
