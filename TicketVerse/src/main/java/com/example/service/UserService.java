package com.example.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.repository.UserRepository;
import com.example.entity.User;
import com.example.dto.UserResponseDto;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserResponseDto getUserById(Long userId){
        User user = userRepository.findById(userId)
               .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        UserResponseDto userResponseDto = new UserResponseDto();
        userResponseDto = convertToDto(user);

        return userResponseDto;
    }

    public Long getUserIdByUsername(String username){
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username));

        return user.getId();
    }

    public UserResponseDto convertToDto(User user){
        UserResponseDto userResponseDto = new UserResponseDto();
        userResponseDto.setUsername(user.getUsername());
        userResponseDto.setFullname(user.getFullName());
        userResponseDto.setEmail(user.getEmail());
        userResponseDto.setPhonenumber(user.getPhoneNumber());

        return userResponseDto;
    }
}
