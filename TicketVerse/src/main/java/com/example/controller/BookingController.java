package com.example.controller;

import com.example.dto.BookingRequestDto;
import com.example.dto.BookingResponseDto;
import com.example.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;


    @PostMapping
    public ResponseEntity<BookingResponseDto> createBooking(@RequestBody BookingRequestDto request) {
        BookingResponseDto booking = bookingService.createBooking(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(booking);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BookingResponseDto>> getUserBookings(@PathVariable Long userId) {
        List<BookingResponseDto> bookings = bookingService.getUserBookings(userId);
        return ResponseEntity.ok(bookings);
    }

    @GetMapping("/reference/{reference}")
    public ResponseEntity<BookingResponseDto> getBookingByReference(@PathVariable String reference) {
        BookingResponseDto booking = bookingService.getBookingByReference(reference);
        return ResponseEntity.ok(booking);
    }

    @PostMapping("/{bookingId}/cancel")
    public ResponseEntity<Map<String, Boolean>> cancelBooking(@PathVariable Long bookingId) {
        boolean canceled = bookingService.cancelBooking(bookingId);
        Map<String, Boolean> response = Collections.singletonMap("canceled", canceled);
        return ResponseEntity.ok(response);
    }
}
