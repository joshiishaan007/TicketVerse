package com.example.dto;

import com.example.entity.ShowtimeStatus;

import java.time.LocalDateTime;

public class ShowtimeDto {

    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Double ticketPrice;
    private Long movieId;
    private String movieTitle;
    private Long screenId;
    private String screenName;
    private Long theatreId;
    private String theatreName;
    private ShowtimeStatus status;
    private Integer availableSeats;
    private Integer totalSeats;

    //Constructors
    public ShowtimeDto() {
    }

    public ShowtimeDto(LocalDateTime startTime, LocalDateTime endTime, Double ticketPrice, Long movieId, String movieTitle, Long screenId, String screenName, Long theatreId, String theatreName, ShowtimeStatus status, Integer availableSeats, Integer totalSeats) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.ticketPrice = ticketPrice;
        this.movieId = movieId;
        this.movieTitle = movieTitle;
        this.screenId = screenId;
        this.screenName = screenName;
        this.theatreId = theatreId;
        this.theatreName = theatreName;
        this.status = status;
        this.availableSeats = availableSeats;
        this.totalSeats = totalSeats;
    }

    //Getters and setters

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

    public Long getMovieId() {
        return movieId;
    }

    public void setMovieId(Long movieId) {
        this.movieId = movieId;
    }

    public String getMovieTitle() {
        return movieTitle;
    }

    public void setMovieTitle(String movieTitle) {
        this.movieTitle = movieTitle;
    }

    public Long getScreenId() {
        return screenId;
    }

    public void setScreenId(Long screenId) {
        this.screenId = screenId;
    }

    public String getScreenName() {
        return screenName;
    }

    public void setScreenName(String screenName) {
        this.screenName = screenName;
    }

    public Long getTheatreId() {
        return theatreId;
    }

    public void setTheatreId(Long theatreId) {
        this.theatreId = theatreId;
    }

    public String getTheatreName() {
        return theatreName;
    }

    public void setTheatreName(String theatreName) {
        this.theatreName = theatreName;
    }

    public ShowtimeStatus getStatus() {
        return status;
    }

    public void setStatus(ShowtimeStatus status) {
        this.status = status;
    }

    public Integer getAvailableSeats() {
        return availableSeats;
    }

    public void setAvailableSeats(Integer availableSeats) {
        this.availableSeats = availableSeats;
    }

    public Integer getTotalSeats() {
        return totalSeats;
    }

    public void setTotalSeats(Integer totalSeats) {
        this.totalSeats = totalSeats;
    }
}
