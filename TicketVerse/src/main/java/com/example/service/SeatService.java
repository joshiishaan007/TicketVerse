package com.example.service;

import com.example.dto.SeatDto;
import com.example.entity.*;
import com.example.repository.ScreenRepository;
import com.example.repository.SeatRepository;
import com.example.repository.ShowtimeRepository;
import com.example.repository.ShowtimeSeatRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class SeatService {

    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    private ScreenRepository screenRepository;

    @Autowired
    private ShowtimeSeatRepository showtimeSeatRepository;

    public List<SeatDto> getSeatsByScreenId(Long screenId) {
        List<Seat> seats = seatRepository.findByScreenId(screenId);
        return seats.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public Map<String, List<SeatDto>> getSeatLayoutByScreenId(Long screenId) {
        List<Seat> seats = seatRepository.findByScreenId(screenId);

        Map<String, List<SeatDto>> seatsByRow = new TreeMap<>();

        for (Seat seat : seats) {
            String rowName = seat.getRowName();
            if (!seatsByRow.containsKey(rowName)) {
                seatsByRow.put(rowName, new ArrayList<>());
            }
            seatsByRow.get(rowName).add(convertToDto(seat));
        }

        // Sort seats within each row by column number
        for (List<SeatDto> rowSeats : seatsByRow.values()) {
            rowSeats.sort(Comparator.comparing(SeatDto::getColumnNumber));
        }

        return seatsByRow;
    }

    public List<SeatDto> getAvailableSeats(Long showtimeId) {
        return showtimeSeatRepository.findByShowtimeIdAndStatusNot(showtimeId, SeatStatus.BOOKED)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public List<Seat> initializeSeats(Long screenId, Integer numberOfRows, Integer seatsPerRow) {
        Screen screen = screenRepository.findById(screenId)
                .orElseThrow(() -> new EntityNotFoundException("Screen not found with id: " + screenId));

//        // Update screen with row and seat information
//        screen.setNumberOfRows(numberOfRows);
//        screen.setSeatsPerRow(seatsPerRow);
//        screen.setSeatingCapacity(numberOfRows * seatsPerRow);
//        screenRepository.save(screen);

        // Clear existing seats if any
//        seatRepository.deleteByScreenId(screenId);

        // Create new seats
        List<Seat> seats = new ArrayList<>();
        char rowName = 'A';

        for (int row = 0; row < numberOfRows; row++) {
            for (int col = 1; col <= seatsPerRow; col++) {
                Seat seat = new Seat();
                seat.setRowName(String.valueOf(rowName));
                seat.setColumnNumber(col);
                seat.setSeatNumber(rowName + String.valueOf(col));
                seat.setSeatType(SeatType.STANDARD); // Default
                seat.setStatus(SeatStatus.AVAILABLE);
                seat.setScreen(screen);
                seats.add(seat);
            }
            rowName++;
        }

        return seatRepository.saveAll(seats);
    }

    @Transactional
    public SeatDto updateSeat(Long theatreId, Long screenId, Long seatId, SeatDto seatDto) {
        Seat seat = seatRepository.findById(seatId)
                .orElseThrow(() -> new EntityNotFoundException("Seat not found with id: " + seatId));

        // Verify seat belongs to the specified screen
        if (!seat.getScreen().getId().equals(screenId)) {
            throw new IllegalArgumentException("Seat does not belong to the specified screen");
        }

        if (!seat.getScreen().getTheatre().getId().equals(theatreId)) {
            throw new IllegalArgumentException("Seat does not belong to the specified theatre");
        }

        // Update seat properties
        seat.setSeatType(SeatType.valueOf(seatDto.getSeatType()));
        seat.setStatus(SeatStatus.valueOf(seatDto.getStatus()));

        Seat updatedSeat = seatRepository.save(seat);
        return convertToDto(updatedSeat);
    }

    @Transactional
    public void bulkUpdateSeatTypes(Long screenId, SeatBulkUpdateRequest request) {
        // Validation
        Screen screen = screenRepository.findById(screenId)
                .orElseThrow(() -> new EntityNotFoundException("Screen not found with id: " + screenId));

        List<Seat> seatsToUpdate = new ArrayList<>();

        for (SeatIdentifier seatId : request.getSeatIdentifiers()) {
            String rowName = seatId.getRowName();
            int startColumn = seatId.getStartColumn();
            int endColumn = seatId.getEndColumn() != null ? seatId.getEndColumn() : startColumn;

            List<Seat> rowSeats = seatRepository.findByScreenIdAndRowNameAndColumnNumberBetween(
                    screenId, rowName, startColumn, endColumn);

            for (Seat seat : rowSeats) {
                seat.setSeatType(SeatType.valueOf(request.getSeatType()));
                seatsToUpdate.add(seat);
            }
        }

        seatRepository.saveAll(seatsToUpdate);
    }

    private SeatDto convertToDto(Seat seat) {
        SeatDto dto = new SeatDto();
        dto.setSeatNumber(seat.getSeatNumber());
        dto.setRowName(seat.getRowName());
        dto.setColumnNumber(seat.getColumnNumber());
        dto.setSeatType(seat.getSeatType().name());
        dto.setStatus(seat.getStatus().name());
        return dto;
    }

    private SeatDto convertToDTO(ShowtimeSeat showtimeSeat) {
        SeatDto dto = new SeatDto();
        Seat seat = showtimeSeat.getSeat();
        dto.setSeatNumber(seat.getSeatNumber());
        dto.setRowName(seat.getRowName());
        dto.setColumnNumber(seat.getColumnNumber());
        dto.setSeatType(seat.getSeatType().name());
        dto.setStatus(showtimeSeat.getStatus().name());
        dto.setPrice(showtimeSeat.getPrice());
        return dto;
    }

    public Seat getSeatById(Long theatreId, Long screenId, Long seatId) {

        Seat seat = seatRepository.findById(seatId)
                .orElseThrow(() -> new EntityNotFoundException("Seat not found with id: " + seatId));


        if (!seat.getScreen().getId().equals(screenId)) {
            throw new IllegalArgumentException("Seat does not belong to the specified screen");
        }

        if (!seat.getScreen().getTheatre().getId().equals(theatreId)) {
            throw new IllegalArgumentException("Seat does not belong to the specified theatre");
        }

        return seat;
    }
}
