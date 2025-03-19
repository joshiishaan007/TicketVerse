package com.example.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('NORMAL_USER')")
    public ResponseEntity<String> userDashboard() {
        return ResponseEntity.ok("User Dashboard - Only normal users can access this");
    }
}
