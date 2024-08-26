package com.example.cinema_project.controller.auth;

import com.example.cinema_project.config.security.AuthService;
import com.example.cinema_project.dto.Login.ReqRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<ReqRes> signUp(@RequestBody ReqRes signUpRequest) {
        return ResponseEntity.ok(authService.signUp(signUpRequest));
    }

    @PostMapping("/signin")
    public ResponseEntity<ReqRes> signIn(@RequestBody ReqRes signInRequest) {
        return ResponseEntity.ok(authService.signIn(signInRequest));
    }

    @PostMapping("/refresh")
    public ResponseEntity<ReqRes> refreshToken(@RequestBody ReqRes refreshTokenRequest) {
        return ResponseEntity.ok(authService.refreshToken(refreshTokenRequest));
    }

    @PostMapping("/forgot-password")
    public ReqRes forgotPassword(@RequestBody ReqRes request) {
        return authService.forgotPassword(request.getEmail());
    }

    @PostMapping("/reset-password")
    public ReqRes resetPassword(@RequestParam String token, @RequestBody ReqRes request) {
        return authService.resetPassword(token, request.getPassword());
    }
}
