package com.cinema.movie_booking.entity;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TicketDetailId implements Serializable {

    private Long bookingId;
    private Long seatId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof TicketDetailId that)) return false;
        return bookingId != null && bookingId.equals(that.bookingId) && seatId != null && seatId.equals(that.seatId);
    }

    @Override
    public int hashCode() {
        int result = bookingId != null ? bookingId.hashCode() : 0;
        result = 31 * result + (seatId != null ? seatId.hashCode() : 0);
        return result;
    }
}

