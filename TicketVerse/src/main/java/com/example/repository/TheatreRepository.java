package com.example.repository;

import com.example.entity.Theatre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TheatreRepository extends JpaRepository<Theatre, Long> {
    Theatre findByUserId(Long userId);
    List<Theatre> findByCity(String city);
}
