package com.example.exception;

public class ShowtimeExpiredException extends RuntimeException {
    public ShowtimeExpiredException(String message) {
        super(message);
    }
}
