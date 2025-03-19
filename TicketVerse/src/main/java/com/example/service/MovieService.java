package com.example.service;

import com.example.dto.MovieDto;
import com.example.entity.Movie;
import com.example.exception.ResourceNotFoundException;
import com.example.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MovieService {

    private final MovieRepository movieRepository;

    @Autowired
    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public List<MovieDto> getAllMovies() {
        return movieRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<MovieDto> getCurrentlyPlayingMovies() {
        LocalDate today = LocalDate.now();
        return movieRepository.findByReleaseDateAfter(today.minusMonths(2))
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public MovieDto getMovieById(Long id) {
        return movieRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Movie not found with id: " + id));
    }

    private MovieDto convertToDTO(Movie movie) {
        MovieDto dto = new MovieDto();
        dto.setId(movie.getId());
        dto.setTitle(movie.getTitle());
        dto.setPosterUrl(movie.getPosterUrl());
        dto.setDuration(movie.getDuration().toString());
        dto.setGenre(movie.getGenre());
        dto.setReleaseDate(movie.getReleaseDate());
        return dto;
    }
}
