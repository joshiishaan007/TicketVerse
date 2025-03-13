package com.example.controller;

import com.example.dto.CreateShowtimeRequestDto;
import com.example.dto.ShowtimeDto;
import com.example.entity.ShowtimeSeat;
import com.example.service.ShowtimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/showtimes")
public class ShowtimeController {

    @Autowired
    private ShowtimeService showtimeService;

    @GetMapping("/{showtimeId}/seats")
    public ResponseEntity<List<ShowtimeSeat>> getShowtimeSeats(@PathVariable Long showtimeId) {
        return ResponseEntity.ok(showtimeService.getShowtimeSeats(showtimeId));
    }

    @GetMapping
    public ResponseEntity<List<ShowtimeDto>> getAllShowtimes() {
        return ResponseEntity.ok(showtimeService.getAllShowtimes());
    }

    @GetMapping("/{showtimeId}")
    public ResponseEntity<ShowtimeDto> getShowtimeById(@PathVariable Long showtimeId) {
        return ResponseEntity.ok(showtimeService.getShowtimeById(showtimeId));
    }

    @GetMapping("/theatre/{theatreId}")
    public ResponseEntity<List<ShowtimeDto>> getShowtimesByTheatre(@PathVariable Long theatreId) {
        return ResponseEntity.ok(showtimeService.getShowtimesByTheatre(theatreId));
    }

    @GetMapping("/movie/{movieId}")
    public ResponseEntity<List<ShowtimeDto>> getShowtimesByMovie(@PathVariable Long movieId) {
        return ResponseEntity.ok(showtimeService.getShowtimesByMovie(movieId));
    }

    @GetMapping("/screen/{screenId}")
    public ResponseEntity<List<ShowtimeDto>> getShowtimesByScreen(@PathVariable Long screenId) {
        return ResponseEntity.ok(showtimeService.getShowtimesByScreen(screenId));
    }

    @GetMapping("/upcoming")
    public ResponseEntity<List<ShowtimeDto>> getUpcomingShowtimes() {
        return ResponseEntity.ok(showtimeService.getUpcomingShowtimes());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ShowtimeDto> createShowtime(@RequestBody CreateShowtimeRequestDto request) {
        return new ResponseEntity<>(showtimeService.createShowtime(request), HttpStatus.CREATED);
    }

    @PutMapping("/{showtimeId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ShowtimeDto> updateShowtime(
            @PathVariable Long showtimeId,
            @RequestBody CreateShowtimeRequestDto request) {
        return ResponseEntity.ok(showtimeService.updateShowtime(showtimeId, request));
    }

    @DeleteMapping("/{showtimeId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteShowtime(@PathVariable Long showtimeId) {
        showtimeService.deleteShowtime(showtimeId);
        return ResponseEntity.noContent().build();
    }
}
