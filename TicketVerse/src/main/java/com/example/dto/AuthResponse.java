package com.example.dto;


import com.example.entity.Role;

public class AuthResponse {
    private String token;
    private String username;
    private Role role;

    // Constructor

    public AuthResponse() {
    }

    // Getters and setters

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
