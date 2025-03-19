package com.example.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "showtimes")
public class Showtime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime startTime;

    @Column(nullable = false)
    private LocalDateTime endTime;

    @Column(nullable = false)
    private Double ticketPrice;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "movie_id", nullable = false)
    private Movie movie;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "screen_id", nullable = false)
    private Screen screen;

    @JsonIgnore
    @OneToMany(mappedBy = "showtime", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ShowtimeSeat> showtimeSeats;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ShowtimeStatus status = ShowtimeStatus.ACTIVE;

    public Showtime() {
    }

    public Showtime(Long id, LocalDateTime startTime, LocalDateTime endTime, Double ticketPrice,
                    Movie movie, Screen screen, ShowtimeStatus status) {
        this.id = id;
        this.startTime = startTime;
        this.endTime = endTime;
        this.ticketPrice = ticketPrice;
        this.movie = movie;
        this.screen = screen;
        this.status = status;
    }

    // Initialize seats for this showtime based on screen seating configuration
    public void initializeShowtimeSeats() {
        if (screen != null && screen.getSeats() != null) {
            for (Seat seat : screen.getSeats()) {
                ShowtimeSeat showtimeSeat = new ShowtimeSeat();
                showtimeSeat.setSeat(seat);
                showtimeSeat.setShowtime(this);
                showtimeSeat.setStatus(SeatStatus.AVAILABLE);
                showtimeSeat.setPrice(calculateSeatPrice(seat.getSeatType()));
                showtimeSeats.add(showtimeSeat);
            }
        }
    }

    private Double calculateSeatPrice(SeatType seatType) {
        // Apply price multiplier based on seat type
        switch (seatType) {
            case PREMIUM:
                return ticketPrice * 1.5;
            case RECLINER:
                return ticketPrice * 2.0;
            case STANDARD:
            default:
                return ticketPrice;
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public Double getTicketPrice() {
        return ticketPrice;
    }

    public void setTicketPrice(Double ticketPrice) {
        this.ticketPrice = ticketPrice;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public Screen getScreen() {
        return screen;
    }

    public void setScreen(Screen screen) {
        this.screen = screen;
    }

    public List<ShowtimeSeat> getShowtimeSeats() {
        return showtimeSeats;
    }

    public void setShowtimeSeats(List<ShowtimeSeat> showtimeSeats) {
        this.showtimeSeats = showtimeSeats;
    }

    public ShowtimeStatus getStatus() {
        return status;
    }

    public void setStatus(ShowtimeStatus status) {
        this.status = status;
    }
}
