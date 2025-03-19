package com.example.dto;

import java.util.List;

public class ScreenDto {

    private String screenName;
    private Integer seatingCapacity;
    private String screenType;
    private int numberOfRows;
    private int seatsPerRow;

    public ScreenDto() {
    }

    public ScreenDto(String screenName, int seatingCapacity, String screenType, int numberOfRows, int seatsPerRow) {

        this.screenName = screenName;
        this.seatingCapacity = seatingCapacity;
        this.screenType = screenType;
        this.numberOfRows = numberOfRows;
        this.seatsPerRow = seatsPerRow;
    }

    public int getNumberOfRows() {
        return numberOfRows;
    }

    public void setNumberOfRows(int numberOfRows) {
        this.numberOfRows = numberOfRows;
    }

    public int getSeatsPerRow() {
        return seatsPerRow;
    }

    public void setSeatsPerRow(int seatsPerRow) {
        this.seatsPerRow = seatsPerRow;
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
}
