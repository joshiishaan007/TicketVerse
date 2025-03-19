package com.example.service;

import com.example.dto.*;
import com.example.entity.*;
import com.example.exception.BookingCancellationException;
import com.example.exception.ResourceNotFoundException;
import com.example.exception.SeatUnavailableException;
import com.example.exception.ShowtimeExpiredException;
import com.example.repository.BookingRepository;
import com.example.repository.ShowtimeRepository;
import com.example.repository.ShowtimeSeatRepository;
import com.example.repository.UserRepository;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.*;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class BookingService {

    private final BookingRepository bookingRepository;
    private final ShowtimeSeatRepository showtimeSeatRepository;
    private final UserRepository userRepository;
    private final ShowtimeRepository showtimeRepository;

    @Autowired
    public BookingService(
            BookingRepository bookingRepository,
            ShowtimeSeatRepository showtimeSeatRepository,
            UserRepository userRepository,
            ShowtimeRepository showtimeRepository) {
        this.bookingRepository = bookingRepository;
        this.showtimeSeatRepository = showtimeSeatRepository;
        this.userRepository = userRepository;
        this.showtimeRepository = showtimeRepository;
    }

    @Transactional
    public BookingResponseDto createBooking(BookingRequestDto request) {
        // Validate the request
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + request.getUserId()));

        Showtime showtime = showtimeRepository.findById(request.getShowtimeId())
                .orElseThrow(() -> new ResourceNotFoundException("Showtime not found with id: " + request.getShowtimeId()));

        // Check if showtime has already started
        if (showtime.getStartTime().isBefore(LocalDateTime.now())) {
            throw new ShowtimeExpiredException("Cannot book tickets for a show that has already started");
        }

        // Check if showtime is active
        if (showtime.getStatus() != ShowtimeStatus.ACTIVE) {
            throw new ShowtimeExpiredException("The selected showtime is no longer available for booking");
        }

        // Check if seats are available
        List<ShowtimeSeat> seats = showtimeSeatRepository.findAllById(request.getSeatIds());

        if (seats.size() != request.getSeatIds().size()) {
            throw new ResourceNotFoundException("Some selected seats could not be found");
        }

        // Check if any seat is already booked
        Optional<ShowtimeSeat> alreadyBooked = seats.stream()
                .filter(seat -> seat.getStatus() == SeatStatus.BOOKED)
                .findFirst();

        if (alreadyBooked.isPresent()) {
            throw new SeatUnavailableException("Seat " + alreadyBooked.get().getSeat().getSeatNumber() +
                    " is already booked. Please refresh and try again.");
        }

        // Create booking
        Booking booking = new Booking();
        booking.setUser(user);
        booking.setShowtime(showtime);
        booking.setBookingDate(LocalDateTime.now());
        booking.setBookingReference(generateBookingReference());

        // Calculate total amount
        double totalAmount = seats.stream()
                .mapToDouble(ShowtimeSeat::getPrice)
                .sum();
        booking.setTotalAmount(totalAmount);

        // Save booking
        Booking savedBooking = bookingRepository.save(booking);

        // Create booked seats
        List<BookedSeat> bookedSeats = new ArrayList<>();
        for (ShowtimeSeat seat : seats) {
            BookedSeat bookedSeat = new BookedSeat();
            bookedSeat.setBooking(savedBooking);
            bookedSeat.setShowtimeSeat(seat);
            bookedSeat.setPrice(seat.getPrice());
            bookedSeats.add(bookedSeat);

            // Update seat status
            seat.setStatus(SeatStatus.BOOKED);
            showtimeSeatRepository.save(seat);
        }

        savedBooking.setBookedSeats(bookedSeats);

        // Convert to response
        return convertToDTO(savedBooking);
    }

    private String generateBookingReference() {
        return "BK" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }

    private BookingResponseDto convertToDTO(Booking booking) {
        BookingResponseDto response = new BookingResponseDto();
        response.setBookingId(booking.getId());
        response.setBookingReference(booking.getBookingReference());
        response.setTotalAmount(booking.getTotalAmount());
        response.setBookingDate(booking.getBookingDate());

        // Convert booked seats
        List<SeatDto> seatDTOs = booking.getBookedSeats().stream()
                .map(bookedSeat -> {
                    ShowtimeSeat showtimeSeat = bookedSeat.getShowtimeSeat();
                    Seat seat = showtimeSeat.getSeat();

                    SeatDto dto = new SeatDto();
                    dto.setSeatNumber(seat.getSeatNumber());
                    dto.setRowName(seat.getRowName());
                    dto.setColumnNumber(seat.getColumnNumber());
                    dto.setSeatType(seat.getSeatType().name());
                    dto.setStatus(showtimeSeat.getStatus().name());
                    dto.setPrice(showtimeSeat.getPrice());
                    return dto;
                })
                .collect(Collectors.toList());
        response.setBookedSeats(seatDTOs);

        // Set movie details
        MovieDto movieDTO = new MovieDto();
        Movie movie = booking.getShowtime().getMovie();
        movieDTO.setId(movie.getId());
        movieDTO.setTitle(movie.getTitle());
        movieDTO.setPosterUrl(movie.getPosterUrl());
        movieDTO.setDuration(movie.getDuration().toString());
        movieDTO.setGenre(movie.getGenre());
        movieDTO.setReleaseDate(movie.getReleaseDate());
        response.setMovie(movieDTO);

        // Set theatre details
        TheatreDto theatreDTO = new TheatreDto();
        Theatre theatre = booking.getShowtime().getScreen().getTheatre();
        theatreDTO.setId(theatre.getId());
        theatreDTO.setName(theatre.getName());
        theatreDTO.setLocation(theatre.getLocation());
        theatreDTO.setCity(theatre.getCity());
        response.setTheatre(theatreDTO);

        // Set showtime details
        ShowtimeDto showtimeDto = new ShowtimeDto();
        Showtime showtime = booking.getShowtime();
        showtimeDto.setStartTime(showtime.getStartTime());
        showtimeDto.setEndTime(showtime.getEndTime());
        showtimeDto.setTicketPrice(showtime.getTicketPrice());
        showtimeDto.setScreenName(showtime.getScreen().getScreenName());
        showtimeDto.setScreenType(showtime.getScreen().getScreenType());
        response.setShowtime(showtimeDto);

        return response;
    }

    public List<BookingResponseDto> getUserBookings(Long userId) {
        // Validate user exists
        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User not found with id: " + userId);
        }

        return bookingRepository.findByUserId(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public BookingResponseDto getBookingByReference(String reference) {
        return bookingRepository.findByBookingReference(reference)
                .map(this::convertToDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with reference: " + reference));
    }

    @Transactional
    public boolean cancelBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + bookingId));

        // Check if the booking is already cancelled
        if (booking.getStatus() == BookingStatus.CANCELLED) {
            throw new BookingCancellationException("This booking has already been cancelled");
        }

        // Check if the showtime has already started
        if (booking.getShowtime().getStartTime().isBefore(LocalDateTime.now())) {
            throw new BookingCancellationException("Cannot cancel booking for a show that has already started");
        }

        // Update the booking status
        booking.setStatus(BookingStatus.CANCELLED);

        // Update the seat statuses
        for (BookedSeat bookedSeat : booking.getBookedSeats()) {
            ShowtimeSeat showtimeSeat = bookedSeat.getShowtimeSeat();
            showtimeSeat.setStatus(SeatStatus.AVAILABLE);
            showtimeSeatRepository.save(showtimeSeat);
        }

        bookingRepository.save(booking);
        return true;
    }
}
