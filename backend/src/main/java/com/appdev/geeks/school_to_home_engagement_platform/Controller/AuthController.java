package com.appdev.geeks.school_to_home_engagement_platform.Controller;

import com.appdev.geeks.school_to_home_engagement_platform.Controller.ApiResponse;
import com.appdev.geeks.school_to_home_engagement_platform.Controller.LoginRequest;
import com.appdev.geeks.school_to_home_engagement_platform.Controller.SignupRequest;
import com.appdev.geeks.school_to_home_engagement_platform.Entity.ParentEntity;
import com.appdev.geeks.school_to_home_engagement_platform.Service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001", "http://localhost:3002"})
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody LoginRequest request) {
        Optional<ParentEntity> authenticated = authService.login(request);
        if (authenticated.isEmpty()) {
            ApiResponse error = new ApiResponse("error", "Invalid email or password", null);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }

        Map<String, Object> user = userPayload(authenticated.get());
        ApiResponse success = new ApiResponse("success", "Login successful", Map.of("user", user));
        return ResponseEntity.ok(success);
    }

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse> signup(@RequestBody SignupRequest request) {
        Optional<ParentEntity> created = authService.signup(request);
        if (created.isEmpty()) {
            ApiResponse error = new ApiResponse("error", "Email already registered or invalid request", null);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
        Map<String, Object> user = userPayload(created.get());
        ApiResponse success = new ApiResponse("success", "Signup successful", Map.of("user", user));
        return ResponseEntity.status(HttpStatus.CREATED).body(success);
    }

    private Map<String, Object> userPayload(ParentEntity parent) {
        Map<String, Object> user = new HashMap<>();
        user.put("id", parent.getId());
        user.put("firstName", parent.getFirstName());
        user.put("lastName", parent.getLastName());
        user.put("email", parent.getEmail());
        user.put("contactNumber", parent.getContactNumber());
        return user;
    }
}