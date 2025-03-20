package com.example.dto;

import java.util.List;

public class ErrorResponse {
    private String message;
    private List<Long> alreadyBookedSeatIds;

    public ErrorResponse(String message, List<Long> alreadyBookedSeatIds) {
        this.message = message;
        this.alreadyBookedSeatIds = alreadyBookedSeatIds;
    }

    // Getters
    public String getMessage() {
        return message;
    }

    public List<Long> getAlreadyBookedSeatIds() {
        return alreadyBookedSeatIds;
    }
}
