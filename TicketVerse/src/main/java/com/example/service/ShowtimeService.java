package com.example.service;

import com.example.dto.CreateShowtimeRequestDto;
import com.example.dto.ShowtimeDto;
import com.example.entity.*;
import com.example.exception.ResourceNotFoundException;
import com.example.exception.ShowtimeConflictException;
import com.example.repository.MovieRepository;
import com.example.repository.ScreenRepository;
import com.example.repository.ShowtimeRepository;
import com.example.repository.ShowtimeSeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ShowtimeService {

    @Autowired
    private ShowtimeRepository showtimeRepository;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private ScreenRepository screenRepository;

    @Autowired
    private ShowtimeSeatRepository showtimeSeatRepository;

    public List<ShowtimeDto> getAllShowtimes() {
        return showtimeRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public void reserveSeat(Long showtimeId, Long seatId){
        Showtime showtime = showtimeRepository.findById(showtimeId)
                .orElseThrow(() -> new ResourceNotFoundException("Showtime not found with id: " + showtimeId));

        ShowtimeSeat showtimeSeat = showtimeSeatRepository.findById(seatId)
                .orElseThrow(() -> new ResourceNotFoundException("Showtime seat not found with id: " + seatId));

        showtimeSeat.setStatus(SeatStatus.RESERVED);

        showtimeSeatRepository.save(showtimeSeat);
    }

    public void releaseSeat(Long showtimeId, Long seatId){
        Showtime showtime = showtimeRepository.findById(showtimeId)
                .orElseThrow(() -> new ResourceNotFoundException("Showtime not found with id: " + showtimeId));

        ShowtimeSeat showtimeSeat = showtimeSeatRepository.findById(seatId)
                .orElseThrow(() -> new ResourceNotFoundException("Showtime seat not found with id: " + seatId));

        showtimeSeat.setStatus(SeatStatus.AVAILABLE);

        showtimeSeatRepository.save(showtimeSeat);
    }

    public ShowtimeDto getShowtimeById(Long showtimeId) {
        Showtime showtime = showtimeRepository.findById(showtimeId)
                .orElseThrow(() -> new ResourceNotFoundException("Showtime not found with id: " + showtimeId));
        return convertToDTO(showtime);
    }

    public List<ShowtimeDto> getShowtimesByTheatre(Long theatreId) {
        return showtimeRepository.findByTheatreId(theatreId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ShowtimeDto> getShowtimesByMovie(Long movieId) {
        return showtimeRepository.findByMovieId(movieId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ShowtimeDto> getShowtimesByScreen(Long screenId) {
        return showtimeRepository.findByScreenId(screenId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ShowtimeDto> getUpcomingShowtimes() {
        return showtimeRepository.findUpcomingShowtimes(LocalDateTime.now()).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ShowtimeDto> getShowtimesByMovieAndTheatre(Long movieId, Long theatreId) {
        LocalDateTime now = LocalDateTime.now();
        return showtimeRepository.findByMovieIdAndScreenTheatreIdAndStartTimeAfter(movieId, theatreId, now)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public ShowtimeDto createShowtime(CreateShowtimeRequestDto request) {
        // Validate movie and screen exist
        Movie movie = movieRepository.findById(request.getMovieId())
                .orElseThrow(() -> new ResourceNotFoundException("Movie not found with id: " + request.getMovieId()));

        Screen screen = screenRepository.findById(request.getScreenId())
                .orElseThrow(() -> new ResourceNotFoundException("Screen not found with id: " + request.getScreenId()));

        // Check for overlapping showtimes
        List<Showtime> overlappingShowtimes = showtimeRepository.findOverlappingShowtimes(
                request.getScreenId(), request.getStartTime(), request.getEndTime());

        if (!overlappingShowtimes.isEmpty()) {
            throw new ShowtimeConflictException("There is already a showtime scheduled for this screen at the requested time");
        }

        // Create new showtime
        Showtime showtime = new Showtime();
        showtime.setMovie(movie);
        showtime.setScreen(screen);
        showtime.setStartTime(request.getStartTime());
        showtime.setEndTime(request.getEndTime());
        showtime.setTicketPrice(request.getTicketPrice());
        showtime.setStatus(ShowtimeStatus.ACTIVE);

        // Save showtime to get ID
        showtime = showtimeRepository.save(showtime);

        // Initialize seats for this showtime
        showtime.setShowtimeSeats(new ArrayList<>());
        showtime.initializeShowtimeSeats();

        // Save again with seats
        showtime = showtimeRepository.save(showtime);

        return convertToDTO(showtime);
    }

    @Transactional
    public ShowtimeDto updateShowtime(Long showtimeId, CreateShowtimeRequestDto request) {
        Showtime showtime = showtimeRepository.findById(showtimeId)
                .orElseThrow(() -> new ResourceNotFoundException("Showtime not found with id: " + showtimeId));

        // Check if the showtime has already started or completed
        if (showtime.getStartTime().isBefore(LocalDateTime.now())) {
            throw new ShowtimeConflictException("Cannot update a showtime that has already started or completed");
        }

        // If changing screen or time, check for conflicts
        if (!request.getScreenId().equals(showtime.getScreen().getId()) ||
                !request.getStartTime().equals(showtime.getStartTime()) ||
                !request.getEndTime().equals(showtime.getEndTime())) {

            List<Showtime> overlappingShowtimes = showtimeRepository.findOverlappingShowtimes(
                    request.getScreenId(), request.getStartTime(), request.getEndTime());

            // Remove current showtime from results if it's in there
            overlappingShowtimes = overlappingShowtimes.stream()
                    .filter(s -> !s.getId().equals(showtimeId))
                    .collect(Collectors.toList());

            if (!overlappingShowtimes.isEmpty()) {
                throw new ShowtimeConflictException("There is already a showtime scheduled for this screen at the requested time");
            }

            // If changing screens, we need to re-initialize seats
            if (!request.getScreenId().equals(showtime.getScreen().getId())) {
                Screen newScreen = screenRepository.findById(request.getScreenId())
                        .orElseThrow(() -> new ResourceNotFoundException("Screen not found with id: " + request.getScreenId()));

                // Delete existing showtime seats
                showtimeSeatRepository.deleteAll(showtime.getShowtimeSeats());

                // Update screen
                showtime.setScreen(newScreen);
                showtime.setShowtimeSeats(new ArrayList<>());

                // Save to update the screen reference
                showtime = showtimeRepository.save(showtime);

                // Re-initialize seats
                showtime.initializeShowtimeSeats();
            }
        }

        // Update movie if changed
        if (!request.getMovieId().equals(showtime.getMovie().getId())) {
            Movie movie = movieRepository.findById(request.getMovieId())
                    .orElseThrow(() -> new ResourceNotFoundException("Movie not found with id: " + request.getMovieId()));
            showtime.setMovie(movie);
        }

        // Update other properties
        showtime.setStartTime(request.getStartTime());
        showtime.setEndTime(request.getEndTime());
        showtime.setTicketPrice(request.getTicketPrice());

        // Save changes
        showtime = showtimeRepository.save(showtime);

        return convertToDTO(showtime);
    }

    @Transactional
    public void deleteShowtime(Long showtimeId) {
        Showtime showtime = showtimeRepository.findById(showtimeId)
                .orElseThrow(() -> new ResourceNotFoundException("Showtime not found with id: " + showtimeId));

        // Check if the showtime has already started
        if (showtime.getStartTime().isBefore(LocalDateTime.now())) {
            throw new ShowtimeConflictException("Cannot delete a showtime that has already started");
        }

        // If tickets are booked, maybe just mark as cancelled instead of deleting
        showtime.setStatus(ShowtimeStatus.CANCELLED);
        showtimeRepository.save(showtime);

        // Alternatively, if you want to actually delete:
        // showtimeRepository.delete(showtime);
    }

    private ShowtimeDto convertToDTO(Showtime showtime) {
        ShowtimeDto dto = new ShowtimeDto();
        dto.setId(showtime.getId());
        dto.setStartTime(showtime.getStartTime());
        dto.setEndTime(showtime.getEndTime());
        dto.setTicketPrice(showtime.getTicketPrice());
        dto.setStatus(showtime.getStatus());

        // Movie info
        dto.setMovieId(showtime.getMovie().getId());
        dto.setMovieTitle(showtime.getMovie().getTitle());

        // Screen info
        dto.setScreenId(showtime.getScreen().getId());
        dto.setScreenName(showtime.getScreen().getScreenName());
        dto.setScreenType(showtime.getScreen().getScreenType());

        // Theatre info
        dto.setTheatreId(showtime.getScreen().getTheatre().getId());
        dto.setTheatreName(showtime.getScreen().getTheatre().getName());

        // Seat availability
        int totalSeats = showtime.getShowtimeSeats().size();
        long availableSeats = showtime.getShowtimeSeats().stream()
                .filter(seat -> seat.getStatus() == SeatStatus.AVAILABLE)
                .count();

        dto.setTotalSeats(totalSeats);
        dto.setAvailableSeats((int) availableSeats);

        return dto;
    }

    public List<ShowtimeSeat> getShowtimeSeats(Long showtimeId){
        Showtime showtime = showtimeRepository.findById(showtimeId)
                .orElseThrow(() -> new ResourceNotFoundException("Showtime not found with id: " + showtimeId));

        return showtime.getShowtimeSeats();
    }
}
