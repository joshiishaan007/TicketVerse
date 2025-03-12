package com.example.dto;

public class ScreenDto {
    private String screenName;
    private Integer seatingCapacity;
    private String screenType;

    public ScreenDto() {
    }

    public ScreenDto(String screenName, Integer seatingCapacity, String screenType) {
        this.screenName = screenName;
        this.seatingCapacity = seatingCapacity;
        this.screenType = screenType;
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
