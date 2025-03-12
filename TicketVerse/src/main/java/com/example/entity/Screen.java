package com.example.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "screens")
public class Screen {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String screenName;

    @Column(nullable = false)
    private Integer seatingCapacity;

    @Column(nullable = true)
    private String screenType; // Regular, IMAX, 3D, etc.

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "theatre_id")
    private Theatre theatre;

    public Screen() {
    }

    public Screen(Long id, String screenName, Integer seatingCapacity, String screenType, Theatre theatre) {
        this.id = id;
        this.screenName = screenName;
        this.seatingCapacity = seatingCapacity;
        this.screenType = screenType;
        this.theatre = theatre;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Theatre getTheatre() {
        return theatre;
    }

    public void setTheatre(Theatre theatre) {
        this.theatre = theatre;
    }
}
