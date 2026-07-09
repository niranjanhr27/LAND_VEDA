package com.landveda.backend.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.landveda.backend.service.OtpService;

@RestController
@RequestMapping("/api/otp")
@CrossOrigin(origins = "http://localhost:5173")
public class OtpController {

    private final OtpService otpService;

    public OtpController(OtpService otpService) {
        this.otpService = otpService;
    }

    @PostMapping("/send")
    public ResponseEntity<?> sendOtp(@RequestBody Map<String, String> body) {
        String mobile = body.get("mobile");
        if (mobile == null || mobile.isBlank()) {
            return ResponseEntity.badRequest().body("Mobile number is required.");
        }

        boolean sent = otpService.sendOtp(mobile);
        return sent
            ? ResponseEntity.ok("OTP sent successfully.")
            : ResponseEntity.status(500).body("Failed to send OTP. Please try again.");
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> body) {
        String mobile = body.get("mobile");
        String otp = body.get("otp");
        if (mobile == null || otp == null) {
            return ResponseEntity.badRequest().body("Mobile and OTP are required.");
        }

        boolean valid = otpService.verifyOtp(mobile, otp);
        return valid
            ? ResponseEntity.ok("OTP verified successfully.")
            : ResponseEntity.status(400).body("Invalid or expired OTP.");
    }
}
