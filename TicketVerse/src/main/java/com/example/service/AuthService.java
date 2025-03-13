package com.example.service;

import com.example.dto.AuthRequest;
import com.example.dto.AuthResponse;
import com.example.dto.RegisterRequest;
import com.example.dto.TheatreRegistrationRequest;
import com.example.entity.Role;
import com.example.entity.Screen;
import com.example.entity.Theatre;
import com.example.repository.TheatreRepository;
import com.example.repository.UserRepository;
import com.example.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import com.example.entity.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TheatreRepository theatreRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private ScreenService screenService;

    public AuthResponse register(RegisterRequest request) {
        // Check if username or email already exists
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already taken");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already in use");
        }

        // Create new user
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFullName(request.getFullName());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setRole(request.getRole());

        userRepository.save(user);

        // Generate token
        var jwtToken = jwtService.generateToken(user);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setToken(jwtToken);
        authResponse.setUsername(user.getUsername());
        authResponse.setRole(user.getRole());
        return authResponse;
    }

    @Transactional
    public AuthResponse registerTheatre(String username,TheatreRegistrationRequest request) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Admin user not found: " + username));

        // Validate theatre-specific fields
        if (request.getTheatreName() == null || request.getLocation() == null ||
                request.getScreens() == null || request.getScreens().isEmpty()) {
            throw new RuntimeException("Theatre name, location, and at least one screen are required");
        }

        // Create theatre entity
        Theatre theatre = new Theatre();
        theatre.setName(request.getTheatreName());
        theatre.setLocation(request.getLocation());
        theatre.setAddress(request.getAddress());
        theatre.setCity(request.getCity());
        theatre.setState(request.getState());
        theatre.setZipCode(request.getZipCode());
        theatre.setContactNumber(request.getContactNumber());
        theatre.setUser(user);
        theatre.setScreens(new ArrayList<>());

        theatre = theatreRepository.save(theatre);

        // Create screens
        final Theatre savedTheatre = theatre;
        List<Screen> screens = request.getScreens().stream()
                .map(screenDto -> {
                    Screen screen = screenService.createScreen(savedTheatre.getId(), screenDto);
//                    Screen screen = new Screen();
//                    screen.setScreenName(screenDto.getScreenName());
//                    screen.setSeatingCapacity(screenDto.getSeatingCapacity());
//                    screen.setScreenType(screenDto.getScreenType());
//                    screen.setTheatre(savedTheatre);
                    return screen;
                })
                .collect(Collectors.toList());

        theatre.setScreens(screens);
        theatreRepository.save(theatre);

        // Generate token
        var jwtToken = jwtService.generateToken(user);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setToken(jwtToken);
        authResponse.setUsername(user.getUsername());
        authResponse.setRole(user.getRole());
        return authResponse;
    }

    public AuthResponse authenticate(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        var jwtToken = jwtService.generateToken(user);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setToken(jwtToken);
        authResponse.setUsername(user.getUsername());
        authResponse.setRole(user.getRole());
        return authResponse;
    }
}