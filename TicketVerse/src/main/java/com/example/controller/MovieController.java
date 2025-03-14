package com.example.controller;

import com.example.dto.MovieDto;
import com.example.entity.Movie;
import com.example.repository.MovieRepository;
import com.example.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private MovieService movieService;

    @GetMapping
    public ResponseEntity<List<Movie>> getAllMovies() {
        return ResponseEntity.ok(movieRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Movie> getMovieById(@PathVariable Long id) {
        return movieRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Movie>> searchMovies(@RequestParam(required = false) String title,
                                                    @RequestParam(required = false) String genre) {
        if (title != null && !title.isEmpty()) {
            return ResponseEntity.ok(movieRepository.findByTitleContainingIgnoreCase(title));
        } else if (genre != null && !genre.isEmpty()) {
            return ResponseEntity.ok(movieRepository.findByGenreContainingIgnoreCase(genre));
        } else {
            return ResponseEntity.ok(movieRepository.findAll());
        }
    }

    @GetMapping("/upcoming")
    public ResponseEntity<List<Movie>> getUpcomingMovies() {
        return ResponseEntity.ok(movieRepository.findByReleaseDateAfter(LocalDate.now()));
    }

    @GetMapping("/current")
    public ResponseEntity<List<MovieDto>> getCurrentlyPlayingMovies() {
        List<MovieDto> movies = movieService.getCurrentlyPlayingMovies();
        return ResponseEntity.ok(movies);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Movie> createMovie(@RequestBody Movie movie) {
        return new ResponseEntity<>(movieRepository.save(movie), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Movie> updateMovie(@PathVariable Long id, @RequestBody Movie movieDetails) {
        return movieRepository.findById(id)
                .map(movie -> {
                    movie.setTitle(movieDetails.getTitle());
                    movie.setDuration(movieDetails.getDuration());
                    movie.setGenre(movieDetails.getGenre());
                    movie.setLanguage(movieDetails.getLanguage());
                    movie.setDescription(movieDetails.getDescription());
                    movie.setPosterUrl(movieDetails.getPosterUrl());
                    movie.setReleaseDate(movieDetails.getReleaseDate());
                    return ResponseEntity.ok(movieRepository.save(movie));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteMovie(@PathVariable Long id) {
        return movieRepository.findById(id)
                .map(movie -> {
                    movieRepository.delete(movie);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
