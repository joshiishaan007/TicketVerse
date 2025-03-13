package com.example.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "screens")
public class Screen {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String screenName;

    @Column(nullable = false)
    private Integer seatingCapacity;

    @Column(nullable = true)
    private String screenType; // Regular, IMAX, 3D, etc.

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "theatre_id")
    private Theatre theatre;

    @OneToMany(mappedBy = "screen", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Seat> seats;

    @Column(nullable = false)
    private Integer numberOfRows;

    @Column(nullable = false)
    private Integer seatsPerRow;

    // Method to initialize seats for a new screen
    public void initializeSeats() {
        seats = new ArrayList<>();
        char rowName = 'A';

        for (int row = 0; row < numberOfRows; row++) {
            for (int col = 1; col <= seatsPerRow; col++) {
                Seat seat = new Seat();
                seat.setRowName(String.valueOf(rowName));
                seat.setColumnNumber(col);
                seat.setSeatNumber(rowName + String.valueOf(col));
                seat.setSeatType(SeatType.STANDARD); // Default
                seat.setStatus(SeatStatus.AVAILABLE);
                seat.setScreen(this);
                seats.add(seat);
            }
            rowName++;
        }
    }

    public Screen() {
    }

    public Screen(Long id, String screenName, Integer seatingCapacity, String screenType, Theatre theatre) {
        this.id = id;
        this.screenName = screenName;
        this.seatingCapacity = seatingCapacity;
        this.screenType = screenType;
        this.theatre = theatre;
    }

    public List<Seat> getSeats() {
        return seats;
    }

    public void setSeats(List<Seat> seats) {
        this.seats = seats;
    }

    public Integer getNumberOfRows() {
        return numberOfRows;
    }

    public void setNumberOfRows(Integer numberOfRows) {
        this.numberOfRows = numberOfRows;
    }

    public Integer getSeatsPerRow() {
        return seatsPerRow;
    }

    public void setSeatsPerRow(Integer seatsPerRow) {
        this.seatsPerRow = seatsPerRow;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getScreenName() {
        return screenName;
    }

    public void setScreenName(String screenName) {
        this.screenName = screenName;
    }

    public Integer getSeatingCapacity() {
        return seatingCapacity;
    }

    public void setSeatingCapacity(Integer seatingCapacity) {
        this.seatingCapacity = seatingCapacity;
    }

    public String getScreenType() {
        return screenType;
    }

    public void setScreenType(String screenType) {
        this.screenType = screenType;
    }

    public Theatre getTheatre() {
        return theatre;
    }

    public void setTheatre(Theatre theatre) {
        this.theatre = theatre;
    }
}
