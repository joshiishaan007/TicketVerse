package com.example.service;

import com.example.dto.ScreenDto;
import com.example.dto.TheatreRegistrationRequest;
import com.example.entity.Screen;
import com.example.entity.Theatre;
import com.example.entity.User;
import com.example.exception.ResourceNotFoundException;
import com.example.repository.TheatreRepository;
import com.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class TheatreService {

    @Autowired
    private TheatreRepository theatreRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Theatre> getAllTheatres() {
        return theatreRepository.findAll();
    }

    public Optional<Theatre> getTheatreById(Long id) {
        return theatreRepository.findById(id);
    }

    public Theatre saveTheatre(Theatre theatre) {
        return theatreRepository.save(theatre);
    }

    @Transactional
    public void deleteTheatre(Long id) {
        Optional<Theatre> theatreOptional = theatreRepository.findById(id);

        if (!theatreOptional.isPresent()) {
            throw new ResourceNotFoundException("Theatre not found with id: " + id);
        }

        Theatre theatre = theatreOptional.get();

        if (theatre.getUser() != null) {
            User user = theatre.getUser();
            // Properly clear the bidirectional relationship
            user.setTheatre(null);
            theatre.setUser(null);
            userRepository.save(user); // Save the updated user
        }

        theatreRepository.deleteById(id);
    }

    public Theatre updateTheatre(Theatre existingTheatre,TheatreRegistrationRequest request) {

        if (request.getTheatreName() != null) {
            existingTheatre.setName(request.getTheatreName());
        }

        if (request.getLocation() != null) {
            existingTheatre.setLocation(request.getLocation());
        }

        if (request.getAddress() != null) {
            existingTheatre.setAddress(request.getAddress());
        }

        if (request.getCity() != null) {
            existingTheatre.setCity(request.getCity());
        }

        if (request.getState() != null) {
            existingTheatre.setState(request.getState());
        }

        if (request.getZipCode() != null) {
            existingTheatre.setZipCode(request.getZipCode());
        }

        if (request.getContactNumber() != null) {
            existingTheatre.setContactNumber(request.getContactNumber());
        }

        // Handle screen updates if the list is not null
        if (request.getScreens() != null && !request.getScreens().isEmpty()) {
            // Option 1: Replace all screens
            // theatre.getScreens().clear();
            // updateDto.getScreens().forEach(screenDto -> addScreenFromDto(theatre, screenDto));

            // Option 2: Update existing screens and add new ones
            updateScreens(existingTheatre, request.getScreens());
        }

        // Save the updated theatre
        return theatreRepository.save(existingTheatre);
    }

    private void updateScreens(Theatre theatre, List<ScreenDto> screenDtos) {

        List<Screen> existingScreens = theatre.getScreens();
        if (existingScreens == null) {
            existingScreens = new ArrayList<>();
            theatre.setScreens(existingScreens);
        }

        // Create a map of existing screens by name for easier lookup
        Map<String, Screen> screenMap = new HashMap<>();
        for (Screen screen : existingScreens) {
            screenMap.put(screen.getScreenName(), screen);
        }

        for (ScreenDto screenDto : screenDtos) {
            if (screenDto.getScreenName() != null) {
                Screen screen = screenMap.get(screenDto.getScreenName());

                if (screen != null) {
                    // Update existing screen
                    if (screenDto.getSeatingCapacity() != null) {
                        screen.setSeatingCapacity(screenDto.getSeatingCapacity());
                    }
                    if (screenDto.getScreenType() != null) {
                        screen.setScreenType(screenDto.getScreenType());
                    }
                } else {
                    // Add new screen
                    screen = new Screen();
                    screen.setScreenName(screenDto.getScreenName());
                    screen.setSeatingCapacity(screenDto.getSeatingCapacity());
                    screen.setScreenType(screenDto.getScreenType());
                    screen.setTheatre(theatre);
                    existingScreens.add(screen);
                }
            }
        }
    }
}
