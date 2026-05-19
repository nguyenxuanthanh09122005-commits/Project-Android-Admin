package com.cinema.movie_booking.config;

import com.cinema.movie_booking.entity.Movie;
import com.cinema.movie_booking.entity.Role;
import com.cinema.movie_booking.entity.User;
import com.cinema.movie_booking.entity.Cinema;
import com.cinema.movie_booking.entity.TheaterRoom;
import com.cinema.movie_booking.entity.Seat;
import com.cinema.movie_booking.entity.Showtime;
import com.cinema.movie_booking.repository.CinemaRepository;
import com.cinema.movie_booking.repository.SeatRepository;
import com.cinema.movie_booking.repository.ShowtimeRepository;
import com.cinema.movie_booking.repository.TheaterRoomRepository;
import com.cinema.movie_booking.repository.MovieRepository;
import com.cinema.movie_booking.repository.UserRepository;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class DataInitializer {

    private final UserRepository userRepository;
    private final MovieRepository movieRepository;
    private final CinemaRepository cinemaRepository;
    private final TheaterRoomRepository theaterRoomRepository;
    private final SeatRepository seatRepository;
    private final ShowtimeRepository showtimeRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    @Order(1)
    CommandLineRunner seedUsers() {
        return args -> {
            if (!userRepository.existsByEmail("admin@movie.com")) {
                userRepository.save(User.builder()
                        .fullName("System Admin")
                        .email("admin@movie.com")
                        .password(passwordEncoder.encode("admin123"))
                        .phoneNumber("0900000000")
                        .role(Role.ROLE_ADMIN)
                        .build());
            }
            if (!userRepository.existsByEmail("user@movie.com")) {
                userRepository.save(User.builder()
                        .fullName("Demo User")
                        .email("user@movie.com")
                        .password(passwordEncoder.encode("user123"))
                        .phoneNumber("0911111111")
                        .role(Role.ROLE_USER)
                        .build());
            }
        };
    }

    @Bean
    @Order(2)
    CommandLineRunner seedMovies() {
        return args -> {
            if (movieRepository.count() == 0) {
                movieRepository.save(Movie.builder()
                        .movieName("Avengers: Endgame")
                        .description("After the devastating events of Infinity War, the Avengers assemble once more.")
                        .duration(181)
                        .releaseDate(LocalDate.of(2019, 4, 26))
                        .posterImage("https://example.com/posters/endgame.jpg")
                        .trailerUrl("https://example.com/trailers/endgame")
                        .genre("Action")
                        .ageRating("T13")
                        .build());

                movieRepository.save(Movie.builder()
                        .movieName("Dune: Part Two")
                        .description("Paul Atreides unites with the Fremen while seeking revenge against conspirators.")
                        .duration(166)
                        .releaseDate(LocalDate.of(2024, 3, 1))
                        .posterImage("https://example.com/posters/dune2.jpg")
                        .trailerUrl("https://example.com/trailers/dune2")
                        .genre("Sci-Fi")
                        .ageRating("T13")
                        .build());
            }
        };
    }

    @Bean
    @Order(3)
    CommandLineRunner seedCinemas() {
        return args -> {
            if (cinemaRepository.count() == 0) {
                cinemaRepository.save(Cinema.builder()
                        .cinemaName("CGV Vincom Center")
                        .address("72 Le Thanh Ton, Ben Nghe Ward, District 1")
                        .city("Ho Chi Minh City")
                        .build());

                cinemaRepository.save(Cinema.builder()
                        .cinemaName("Lotte Cinema Ba Dinh")
                        .address("54 Lieu Giai, Cong Vi Ward, Ba Dinh District")
                        .city("Hanoi")
                        .build());
            }
        };
    }

    @Bean
    @Order(4)
    CommandLineRunner seedTheaterRooms() {
        return args -> {
            if (theaterRoomRepository.count() == 0) {
                for (var cinema : cinemaRepository.findAll()) {
                    theaterRoomRepository.save(TheaterRoom.builder()
                            .cinema(cinema)
                            .roomName("Room 1")
                            .totalSeats(20)
                            .build());
                    theaterRoomRepository.save(TheaterRoom.builder()
                            .cinema(cinema)
                            .roomName("Room 2")
                            .totalSeats(20)
                            .build());
                    theaterRoomRepository.save(TheaterRoom.builder()
                            .cinema(cinema)
                            .roomName("Room 3")
                            .totalSeats(20)
                            .build());
                    theaterRoomRepository.save(TheaterRoom.builder()
                            .cinema(cinema)
                            .roomName("Room 4")
                            .totalSeats(20)
                            .build());
                }
            }
        };
    }

    @Bean
    @Order(5)
    CommandLineRunner seedSeats() {
        return args -> {
            if (seatRepository.count() == 0) {
                List<TheaterRoom> rooms = theaterRoomRepository.findAll();
                for (var room : rooms) {
                    // Create 20 seats: rows A-D, seats 1-5 each
                    for (char row = 'A'; row <= 'D'; row++) {
                        for (int seatNumber = 1; seatNumber <= 5; seatNumber++) {
                            seatRepository.save(Seat.builder()
                                    .theaterRoom(room)
                                    .rowLetter(String.valueOf(row))
                                    .seatNumber(seatNumber)
                                    .seatType("Standard")
                                    .build());
                        }
                    }
                }
            }
        };
    }

    @Bean
    @Order(6)
    CommandLineRunner seedShowtimes() {
        return args -> {
            if (showtimeRepository.count() == 0) {
                var rooms = theaterRoomRepository.findAll();
                var movies = movieRepository.findAll();

                LocalDateTime base = LocalDateTime.now().plusDays(1).withHour(10).withMinute(0).withSecond(0).withNano(0);
                BigDecimal basePrice = new BigDecimal("120000");

                for (var room : rooms) {
                    int i = 0;
                    for (var movie : movies) {
                        // Create 2 showtimes per room (one per movie) for demo
                        LocalDateTime start = base.plusHours(3L * i);
                        LocalDateTime end = start.plusMinutes(movie.getDuration().longValue());

                        showtimeRepository.save(Showtime.builder()
                                .movie(movie)
                                .theaterRoom(room)
                                .startTime(start)
                                .endTime(end)
                                .baseTicketPrice(basePrice)
                                .build());
                        i++;
                    }
                }
            }
        };
    }
}
