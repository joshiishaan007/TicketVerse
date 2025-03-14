package com.example.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "booked_seats")
public class BookedSeat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "booking_id", nullable = false)
    private Booking booking;

    @ManyToOne
    @JoinColumn(name = "showtime_seat_id", nullable = false)
    private ShowtimeSeat showtimeSeat;

    @Column(nullable = false)
    private Double price;

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Booking getBooking() {
        return booking;
    }

    public void setBooking(Booking booking) {
        this.booking = booking;
    }

    public ShowtimeSeat getShowtimeSeat() {
        return showtimeSeat;
    }

    public void setShowtimeSeat(ShowtimeSeat showtimeSeat) {
        this.showtimeSeat = showtimeSeat;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}
