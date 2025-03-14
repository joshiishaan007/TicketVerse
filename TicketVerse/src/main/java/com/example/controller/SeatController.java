package com.example.controller;

import com.example.dto.SeatDto;
import com.example.service.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/seats")
public class SeatController {

    @Autowired
    private SeatService seatService;

    @GetMapping("/by-showtime/{showtimeId}")
    public ResponseEntity<List<SeatDto>> getAvailableSeats(@PathVariable Long showtimeId) {
        List<SeatDto> seats = seatService.getAvailableSeats(showtimeId);
        return ResponseEntity.ok(seats);
    }
}