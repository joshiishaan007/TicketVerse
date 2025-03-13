package com.example.dto;

import org.springframework.beans.factory.annotation.Autowired;

public class SeatDto {

    private String seatNumber;
    private String rowName;
    private int columnNumber;
    private String seatType;
    private String status;

    public SeatDto() {
    }

    public SeatDto(String seatNumber, String rowName, int columnNumber, String seatType, String status) {
        this.seatNumber = seatNumber;
        this.rowName = rowName;
        this.columnNumber = columnNumber;
        this.seatType = seatType;
        this.status = status;
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

    public int getColumnNumber() {
        return columnNumber;
    }

    public void setColumnNumber(int columnNumber) {
        this.columnNumber = columnNumber;
    }

    public String getSeatType() {
        return seatType;
    }

    public void setSeatType(String seatType) {
        this.seatType = seatType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
