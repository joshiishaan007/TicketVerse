package com.example.service;

import com.example.dto.ScreenDto;
import com.example.entity.Screen;
import com.example.entity.Seat;
import com.example.entity.Theatre;
import com.example.repository.ScreenRepository;
import com.example.repository.TheatreRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ScreenService {

    @Autowired
    private ScreenRepository screenRepository;

    @Autowired
    private TheatreRepository theatreRepository;

    @Autowired
    private SeatService seatService;

    public List<ScreenDto> getScreensByTheatreId(Long theatreId) {
        List<Screen> screens = screenRepository.findByTheatreId(theatreId);
        return screens.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public ScreenDto getScreenById(Long screenId) {
        Screen screen = screenRepository.findById(screenId)
                .orElseThrow(() -> new EntityNotFoundException("Screen not found with id: " + screenId));
        return convertToDto(screen);
    }

    @Transactional
    public Screen createScreen(Long theatreId, ScreenDto screenDto) {
        Theatre theatre = theatreRepository.findById(theatreId)
                .orElseThrow(() -> new EntityNotFoundException("Theatre not found with id: " + theatreId));

        Screen screen = new Screen();
        screen.setScreenName(screenDto.getScreenName());
        screen.setSeatingCapacity(screenDto.getSeatingCapacity());
        screen.setScreenType(screenDto.getScreenType());
        screen.setNumberOfRows(screenDto.getNumberOfRows());
        screen.setSeatsPerRow(screenDto.getSeatsPerRow());
        screen.setTheatre(theatre);

        Screen savedScreen = screenRepository.save(screen);

        List<Seat> seats = seatService.initializeSeats(savedScreen.getId(), savedScreen.getNumberOfRows(), savedScreen.getSeatsPerRow());
        savedScreen.setSeats(seats);

        savedScreen = screenRepository.save(savedScreen);

        return savedScreen;
    }

    @Transactional
    public ScreenDto updateScreen(Long theatreId, Long screenId, ScreenDto screenDto) {
        Screen screen = screenRepository.findById(screenId)
                .orElseThrow(() -> new EntityNotFoundException("Screen not found with id: " + screenId));

        // Verify screen belongs to the specified theatre
        if (!screen.getTheatre().getId().equals(theatreId)) {
            throw new IllegalArgumentException("Screen does not belong to the specified theatre");
        }

        screen.setScreenName(screenDto.getScreenName());
        screen.setSeatingCapacity(screenDto.getSeatingCapacity());
        screen.setScreenType(screenDto.getScreenType());
        screen.setNumberOfRows(screenDto.getNumberOfRows());
        screen.setSeatsPerRow(screenDto.getSeatsPerRow());

        Screen updatedScreen = screenRepository.save(screen);
        return convertToDto(updatedScreen);
    }

    @Transactional
    public void deleteScreen(Long screenId) {
        screenRepository.deleteById(screenId);
    }

    private ScreenDto convertToDto(Screen screen) {
        ScreenDto dto = new ScreenDto();
        dto.setScreenName(screen.getScreenName());
        dto.setSeatingCapacity(screen.getSeatingCapacity());
        dto.setScreenType(screen.getScreenType());
        dto.setNumberOfRows(screen.getNumberOfRows());
        dto.setSeatsPerRow(screen.getSeatsPerRow());
        return dto;
    }
}
