package com.example.dto;

import java.time.LocalDate;

public class MovieDto {
    private Long id;
    private String title;
    private String posterUrl;
    private String duration;
    private String genre;
    private LocalDate releaseDate;

    // Constructors

    public MovieDto() {
    }

    public MovieDto(Long id, String title, String posterUrl, String duration, String genre, LocalDate releaseDate) {
        this.id = id;
        this.title = title;
        this.posterUrl = posterUrl;
        this.duration = duration;
        this.genre = genre;
        this.releaseDate = releaseDate;
    }

    //Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPosterUrl() {
        return posterUrl;
    }

    public void setPosterUrl(String posterUrl) {
        this.posterUrl = posterUrl;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public LocalDate getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(LocalDate releaseDate) {
        this.releaseDate = releaseDate;
    }
}
