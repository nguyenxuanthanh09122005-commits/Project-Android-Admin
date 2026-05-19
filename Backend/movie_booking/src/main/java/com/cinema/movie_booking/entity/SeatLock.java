package com.cinema.movie_booking.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "seat_locks", uniqueConstraints = @UniqueConstraint(name = "uq_seat_lock_showtime_seat", columnNames = {
                "showtime_id", "seat_id" }))
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SeatLock {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "seat_lock_id")
        private Long seatLockId;

        @ManyToOne(optional = false)
        @JoinColumn(name = "showtime_id", nullable = false)
        private Showtime showtime;

        @ManyToOne(optional = false)
        @JoinColumn(name = "seat_id", nullable = false)
        private Seat seat;

        @ManyToOne(optional = false)
        @JoinColumn(name = "user_id", nullable = false)
        private User user;

        @Column(name = "locked_at", nullable = false)
        private LocalDateTime lockedAt;

        @Column(name = "expires_at", nullable = false)
        private LocalDateTime expiresAt;
}
