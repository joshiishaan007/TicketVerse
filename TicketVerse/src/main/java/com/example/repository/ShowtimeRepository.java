package com.example.repository;

import com.example.entity.Showtime;
import com.example.entity.Screen;
import com.example.entity.Theatre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ShowtimeRepository extends JpaRepository<Showtime, Long> {

    List<Showtime> findByScreenId(Long screenId);

    List<Showtime> findByMovieId(Long movieId);

    @Query("SELECT s FROM Showtime s WHERE s.screen.theatre.id = :theatreId")
    List<Showtime> findByTheatreId(@Param("theatreId") Long theatreId);

    @Query("SELECT s FROM Showtime s WHERE s.screen.id = :screenId AND " +
            "((s.startTime BETWEEN :startTime AND :endTime) OR " +
            "(s.endTime BETWEEN :startTime AND :endTime) OR " +
            "(:startTime BETWEEN s.startTime AND s.endTime))")
    List<Showtime> findOverlappingShowtimes(
            @Param("screenId") Long screenId,
            @Param("startTime") LocalDateTime startTime,
            @Param("endTime") LocalDateTime endTime);

    @Query("SELECT s FROM Showtime s WHERE s.startTime >= :date ORDER BY s.startTime")
    List<Showtime> findUpcomingShowtimes(@Param("date") LocalDateTime date);
}
