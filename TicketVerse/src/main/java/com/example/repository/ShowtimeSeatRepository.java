package com.example.repository;

import com.example.entity.ShowtimeSeat;
import com.example.entity.SeatStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShowtimeSeatRepository extends JpaRepository<ShowtimeSeat, Long> {

    List<ShowtimeSeat> findByShowtimeId(Long showtimeId);

    List<ShowtimeSeat> findByShowtimeIdAndStatus(Long showtimeId, SeatStatus status);

    @Query("SELECT ss FROM ShowtimeSeat ss JOIN ss.seat s WHERE ss.showtime.id = :showtimeId AND s.rowName = :rowName")
    List<ShowtimeSeat> findByShowtimeIdAndRow(@Param("showtimeId") Long showtimeId, @Param("rowName") String rowName);
}
