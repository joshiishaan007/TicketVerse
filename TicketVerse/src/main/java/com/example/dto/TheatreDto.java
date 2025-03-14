package com.example.dto;

public class TheatreDto {

    private Long id;
    private String name;
    private String location;
    private String city;

    // Constructors

    public TheatreDto() {
    }

    public TheatreDto(Long id, String name, String location, String city) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.city = city;
    }

    //Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }
}
