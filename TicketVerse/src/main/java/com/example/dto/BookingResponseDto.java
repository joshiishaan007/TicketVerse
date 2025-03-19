package com.example.dto;

import java.time.LocalDateTime;
import java.util.List;

public class BookingResponseDto {

    private Long bookingId;
    private String bookingReference;
    private Double totalAmount;
    private List<SeatDto> bookedSeats;
    private MovieDto movie;
    private TheatreDto theatre;
    private ShowtimeDto showtime;
    private LocalDateTime bookingDate;

    //Constructors

    public BookingResponseDto() {
    }

    public BookingResponseDto(Long bookingId, String bookingReference, Double totalAmount, List<SeatDto> bookedSeats, MovieDto movie, TheatreDto theatre, ShowtimeDto showtime, LocalDateTime bookingDate) {
        this.bookingId = bookingId;
        this.bookingReference = bookingReference;
        this.totalAmount = totalAmount;
        this.bookedSeats = bookedSeats;
        this.movie = movie;
        this.theatre = theatre;
        this.showtime = showtime;
        this.bookingDate = bookingDate;
    }

    //Getters and setters

    public Long getBookingId() {
        return bookingId;
    }

    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }

    public String getBookingReference() {
        return bookingReference;
    }

    public void setBookingReference(String bookingReference) {
        this.bookingReference = bookingReference;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public List<SeatDto> getBookedSeats() {
        return bookedSeats;
    }

    public void setBookedSeats(List<SeatDto> bookedSeats) {
        this.bookedSeats = bookedSeats;
    }

    public MovieDto getMovie() {
        return movie;
    }

    public void setMovie(MovieDto movie) {
        this.movie = movie;
    }

    public TheatreDto getTheatre() {
        return theatre;
    }

    public void setTheatre(TheatreDto theatre) {
        this.theatre = theatre;
    }

    public ShowtimeDto getShowtime() {
        return showtime;
    }

    public void setShowtime(ShowtimeDto showtime) {
        this.showtime = showtime;
    }

    public LocalDateTime getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(LocalDateTime bookingDate) {
        this.bookingDate = bookingDate;
    }
}
