package com.example.controller;

import com.example.dto.TheatreRegistrationRequest;
import com.example.entity.Theatre;
import com.example.exception.ResourceNotFoundException;
import com.example.service.TheatreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/theatres")
public class TheatreController {

    @Autowired
    private TheatreService theatreService;

    @GetMapping
    public ResponseEntity<List<Theatre>> getAllTheatres() {
        List<Theatre> theatres = theatreService.getAllTheatres();
        return new ResponseEntity<>(theatres, HttpStatus.OK);
    }

    @GetMapping("/{theatreId}")
    public ResponseEntity<Theatre> getTheatreById(@PathVariable Long theatreId) {
        Optional<Theatre> theatre = theatreService.getTheatreById(theatreId);
        return theatre.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PatchMapping("/{theatreId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Theatre> updateTheatre(@PathVariable Long theatreId, @RequestBody TheatreRegistrationRequest theatreRegistrationRequest) {
        Optional<Theatre> existingTheatreOptional = theatreService.getTheatreById(theatreId);

        if (existingTheatreOptional.isPresent()) {
            Theatre existingTheatre = existingTheatreOptional.get();
            Theatre updatedTheatre = theatreService.updateTheatre(existingTheatre,theatreRegistrationRequest);
            return new ResponseEntity<>(updatedTheatre, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{theatreId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteTheatre(@PathVariable Long theatreId) {
        try {
            theatreService.deleteTheatre(theatreId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to delete theatre: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
