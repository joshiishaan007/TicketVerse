package com.example.user;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Entity
@Data
@Table(name="users")
public class User {

    @Id
    @GeneratedValue
    @Column(name = "user_id")
    private long userId;

    @Column(name = "username", unique = true, nullable = false)
    private String username;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(name = "email", unique = true, nullable = false)
    private String emial;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "created_at", updatable = false)
    private Timestamp createdAt = new Timestamp(System.currentTimeMillis());
}
