package com.example.service;

import org.springframework.stereotype.Service;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class TokenBlacklistService {

    // Using ConcurrentHashMap for thread safety
    private Set<String> blacklistedTokens = ConcurrentHashMap.newKeySet();

    // Add token to blacklist when user logs out
    public void blacklistToken(String token) {
        blacklistedTokens.add(token);
    }

    // Check if a token is blacklisted
    public boolean isBlacklisted(String token) {
        return blacklistedTokens.contains(token);
    }
}
