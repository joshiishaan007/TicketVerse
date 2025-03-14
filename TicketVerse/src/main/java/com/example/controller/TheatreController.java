package com.example.controller;

import com.example.dto.ScreenDto;
import com.example.dto.SeatDto;
import com.example.dto.TheatreDto;
import com.example.dto.TheatreRegistrationRequest;
import com.example.entity.Screen;
import com.example.entity.Seat;
import com.example.entity.SeatBulkUpdateRequest;
import com.example.entity.Theatre;
import com.example.exception.ResourceNotFoundException;
import com.example.service.ScreenService;
import com.example.service.SeatService;
import com.example.service.TheatreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/theatres")
public class TheatreController {

    @Autowired
    private TheatreService theatreService;

    @Autowired
    private ScreenService screenService;

    @Autowired
    private SeatService seatService;

    @GetMapping
    public ResponseEntity<List<Theatre>> getAllTheatres() {
        List<Theatre> theatres = theatreService.getAllTheatres();
        return new ResponseEntity<>(theatres, HttpStatus.OK);
    }

    @GetMapping("/{theatreId}")
    public ResponseEntity<Theatre> getTheatreById(@PathVariable Long theatreId) {
        Optional<Theatre> theatre = Optional.ofNullable(theatreService.getTheatreById(theatreId));
        return theatre.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/by-movie/{movieId}")
    public ResponseEntity<List<TheatreDto>> getTheatresByMovie(@PathVariable Long movieId) {
        List<TheatreDto> theatres = theatreService.getTheatresByMovie(movieId);
        return ResponseEntity.ok(theatres);
    }

    @PatchMapping("/{theatreId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Theatre> updateTheatre(@PathVariable Long theatreId, @RequestBody TheatreRegistrationRequest theatreRegistrationRequest) {
        Optional<Theatre> existingTheatreOptional = Optional.ofNullable(theatreService.getTheatreById(theatreId));

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

    // screen end points

    @GetMapping("/{theatreId}/screens")
    public ResponseEntity<List<ScreenDto>> getScreensByTheatre(@PathVariable Long theatreId) {
        return ResponseEntity.ok(screenService.getScreensByTheatreId(theatreId));
    }

    @GetMapping("/{theatreId}/screens/{screenId}")
    public ResponseEntity<ScreenDto> getScreenById(@PathVariable Long theatreId, @PathVariable Long screenId) {
        return ResponseEntity.ok(screenService.getScreenById(screenId));
    }

    @PostMapping("/{theatreId}/screens")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Screen> createScreen(@PathVariable Long theatreId, @RequestBody ScreenDto screenDto) {
        Screen createdScreen = screenService.createScreen(theatreId, screenDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdScreen);
    }

    @PatchMapping("/{theatreId}/screens/{screenId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ScreenDto> updateScreen(@PathVariable Long theatreId,
                                                  @PathVariable Long screenId,
                                                  @RequestBody ScreenDto screenDto) {
        return ResponseEntity.ok(screenService.updateScreen(theatreId,screenId,screenDto));
    }

    @DeleteMapping("/{theatreId}/screens/{screenId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteScreen(@PathVariable Long theatreId, @PathVariable Long screenId) {
        screenService.deleteScreen(screenId);
        return ResponseEntity.noContent().build();
    }

    // Seat endpoints
    @GetMapping("/{theatreId}/screens/{screenId}/seats")
    public ResponseEntity<List<SeatDto>> getSeatsByScreen(@PathVariable Long theatreId,
                                                          @PathVariable Long screenId) {
        return ResponseEntity.ok(seatService.getSeatsByScreenId(screenId));
    }

    @GetMapping("/{theatreId}/screens/{screenId}/seats/{seatId}")
    public ResponseEntity<Seat> getSeatById(@PathVariable Long theatreId,
                                            @PathVariable Long screenId,
                                            @PathVariable Long seatId) {
        return ResponseEntity.ok(seatService.getSeatById(theatreId,screenId,seatId));
    }

    @GetMapping("/{theatreId}/screens/{screenId}/seats/layout")
    public ResponseEntity<Map<String, List<SeatDto>>> getSeatLayoutByScreen(@PathVariable Long theatreId,
                                                                            @PathVariable Long screenId) {
        return ResponseEntity.ok(seatService.getSeatLayoutByScreenId(screenId));
    }

    @PatchMapping("/{theatreId}/screens/{screenId}/seats/{seatId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SeatDto> updateSeat(@PathVariable Long theatreId,
                                              @PathVariable Long screenId,
                                              @PathVariable Long seatId,
                                              @RequestBody SeatDto seatDto) {
        return ResponseEntity.ok(seatService.updateSeat(theatreId,screenId,seatId,seatDto));
    }

    @PutMapping("/{theatreId}/screens/{screenId}/seats/bulk-update")
    public ResponseEntity<Void> bulkUpdateSeatTypes(@PathVariable Long theatreId,
                                                    @PathVariable Long screenId,
                                                    @RequestBody SeatBulkUpdateRequest request) {
        seatService.bulkUpdateSeatTypes(screenId, request);
        return ResponseEntity.ok().build();
    }
}
