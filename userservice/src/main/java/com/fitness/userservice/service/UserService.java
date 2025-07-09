package com.fitness.userservice.service;

import com.fitness.userservice.dto.RegisterRequest;
import com.fitness.userservice.dto.UserResponse;
import com.fitness.userservice.model.User;
import com.fitness.userservice.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserResponse register(@Valid RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            User existingUser = userRepository.findByEmail(request.getEmail());
            return getUserResponse(existingUser);
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setKeycloakId(request.getKeycloakId());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());

        User savedUser = userRepository.save(user);

        return getUserResponse(savedUser);
    }

    private static UserResponse getUserResponse(User existingUser) {
        UserResponse userResponse = new UserResponse();
        userResponse.setId(existingUser.getId());
        userResponse.setKeycloakId(existingUser.getKeycloakId());
        userResponse.setPassword(existingUser.getPassword());
        userResponse.setEmail(existingUser.getEmail());
        userResponse.setFirstName(existingUser.getFirstName());
        userResponse.setLastName(existingUser.getLastName());
        userResponse.setCreateAt(existingUser.getCreateAt());
        userResponse.setUpdatedAt(existingUser.getUpdatedAt());
        return userResponse;
    }

    public UserResponse getUserProfile(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return getUserResponse(user);
    }

    public Boolean exitsByUserId(String userId) {
        log.info("Calling user validation API for userId: {}", userId);
        return userRepository.existsByKeycloakId(userId);
    }
}
