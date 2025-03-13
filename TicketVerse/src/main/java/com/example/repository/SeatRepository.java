package com.example.repository;

import com.example.entity.Seat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SeatRepository extends JpaRepository<Seat, Long> {
    List<Seat> findByScreenId(Long screenId);

    void deleteByScreenId(Long screenId);

    List<Seat> findByScreenIdAndRowNameAndColumnNumberBetween(
            Long screenId, String rowName, Integer startColumn, Integer endColumn);
}
