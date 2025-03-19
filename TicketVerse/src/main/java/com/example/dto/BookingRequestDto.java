package com.example.dto;

import java.util.List;

public class BookingRequestDto {
    private Long showtimeId;
    private List<Long> seatIds;
    private Long userId;

    //Constructors

    public BookingRequestDto() {
    }

    public BookingRequestDto(Long showtimeId, List<Long> seatIds, Long userId) {
        this.showtimeId = showtimeId;
        this.seatIds = seatIds;
        this.userId = userId;
    }

    //Getters and setters

    public Long getShowtimeId() {
        return showtimeId;
    }

    public void setShowtimeId(Long showtimeId) {
        this.showtimeId = showtimeId;
    }

    public List<Long> getSeatIds() {
        return seatIds;
    }

    public void setSeatIds(List<Long> seatIds) {
        this.seatIds = seatIds;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
