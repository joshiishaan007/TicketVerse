package com.example.entity;

import java.util.List;

public class SeatBulkUpdateRequest {
    private List<SeatIdentifier> seatIdentifiers;
    private String seatType;

    public List<SeatIdentifier> getSeatIdentifiers() {
        return seatIdentifiers;
    }

    public void setSeatIdentifiers(List<SeatIdentifier> seatIdentifiers) {
        this.seatIdentifiers = seatIdentifiers;
    }

    public String getSeatType() {
        return seatType;
    }

    public void setSeatType(String seatType) {
        this.seatType = seatType;
    }
}
