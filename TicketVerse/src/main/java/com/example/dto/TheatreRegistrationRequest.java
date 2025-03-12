package com.example.dto;

import java.util.List;

public class TheatreRegistrationRequest {

    private String theatreName;
    private String location;
    private String address;
    private String city;
    private String state;
    private String zipCode;
    private String contactNumber;

    // Screen details
    private List<ScreenDto> screens;

    public TheatreRegistrationRequest() {
    }

    public TheatreRegistrationRequest(String theatreName, String location, String address, String city, String state, String zipCode, String contactNumber, List<ScreenDto> screens) {
        this.theatreName = theatreName;
        this.location = location;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
        this.contactNumber = contactNumber;
        this.screens = screens;
    }

    public String getTheatreName() {
        return theatreName;
    }

    public void setTheatreName(String theatreName) {
        this.theatreName = theatreName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public List<ScreenDto> getScreens() {
        return screens;
    }

    public void setScreens(List<ScreenDto> screens) {
        this.screens = screens;
    }
}

