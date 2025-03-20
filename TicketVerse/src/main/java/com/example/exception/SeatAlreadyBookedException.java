package com.example.exception;

import java.util.List;

public class SeatAlreadyBookedException extends RuntimeException {
    private List<Long> bookedSeatIds;

    public SeatAlreadyBookedException(String message, List<Long> bookedSeatIds) {
        super(message);
        this.bookedSeatIds = bookedSeatIds;
    }

    public List<Long> getBookedSeatIds() {
        return bookedSeatIds;
    }
}