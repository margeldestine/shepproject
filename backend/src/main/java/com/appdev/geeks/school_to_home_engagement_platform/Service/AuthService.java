package com.appdev.geeks.school_to_home_engagement_platform.Service;

import com.appdev.geeks.school_to_home_engagement_platform.Controller.LoginRequest;
import com.appdev.geeks.school_to_home_engagement_platform.Controller.SignupRequest;
import com.appdev.geeks.school_to_home_engagement_platform.Entity.ParentEntity;
import com.appdev.geeks.school_to_home_engagement_platform.Repository.ParentRepository;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AuthService {
    private final ParentRepository parentRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthService(ParentRepository parentRepository) {
        this.parentRepository = parentRepository;
    }

    public Optional<ParentEntity> login(LoginRequest request) {
        if (request == null || request.getEmail() == null || request.getPassword() == null) {
            return Optional.empty();
        }
        return parentRepository.findByEmail(request.getEmail())
                .filter(parent -> passwordEncoder.matches(request.getPassword(), parent.getPasswordHash()));
    }

    public Optional<ParentEntity> signup(SignupRequest request) {
        if (request == null || request.getEmail() == null || request.getPassword() == null) {
            return Optional.empty();
        }

        // Reject duplicate email
        if (parentRepository.findByEmail(request.getEmail()).isPresent()) {
            return Optional.empty();
        }

        ParentEntity parent = new ParentEntity();
        parent.setFirstName(request.getFirstName());
        parent.setLastName(request.getLastName());
        parent.setEmail(request.getEmail());
        parent.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        parent.setContactNumber(request.getContactNumber());
        parent.setCreatedAt(LocalDateTime.now());
        ParentEntity saved = parentRepository.save(parent);
        return Optional.of(saved);
    }
}