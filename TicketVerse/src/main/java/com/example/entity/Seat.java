package com.example.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.*;

@Entity
@Table(name = "seats")
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String seatNumber; // For example: "A1", "B5", etc.

    @Column(nullable = false)
    private String rowName; // For example: "A", "B", "C", etc.

    @Column(nullable = false)
    private Integer columnNumber; // For example: 1, 2, 3, etc.

    @Column(nullable = false)
    private SeatType seatType; // STANDARD, PREMIUM, RECLINER, etc.

    @Column(nullable = false)
    private SeatStatus status; // AVAILABLE, BOOKED, RESERVED, MAINTENANCE

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "screen_id")
    private Screen screen;

    public Seat() {
    }

    public Seat(Long id, String seatNumber, String rowName, Integer columnNumber, SeatType seatType, SeatStatus status, Screen screen) {
        this.id = id;
        this.seatNumber = seatNumber;
        this.rowName = rowName;
        this.columnNumber = columnNumber;
        this.seatType = seatType;
        this.status = status;
        this.screen = screen;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(String seatNumber) {
        this.seatNumber = seatNumber;
    }

    public String getRowName() {
        return rowName;
    }

    public void setRowName(String rowName) {
        this.rowName = rowName;
    }

    public Integer getColumnNumber() {
        return columnNumber;
    }

    public void setColumnNumber(Integer columnNumber) {
        this.columnNumber = columnNumber;
    }

    public SeatType getSeatType() {
        return seatType;
    }

    public void setSeatType(SeatType seatType) {
        this.seatType = seatType;
    }

    public SeatStatus getStatus() {
        return status;
    }

    public void setStatus(SeatStatus status) {
        this.status = status;
    }

    public Screen getScreen() {
        return screen;
    }

    public void setScreen(Screen screen) {
        this.screen = screen;
    }
}