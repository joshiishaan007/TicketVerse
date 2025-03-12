package com.example.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/theatre")
public class TheatreController {

    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('THEATRE')")
    public ResponseEntity<String> theatreDashboard() {
        return ResponseEntity.ok("Theatre Dashboard - Only theatre users can access this");
    }
}
