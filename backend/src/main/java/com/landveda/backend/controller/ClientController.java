package com.landveda.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.landveda.backend.entity.Client;
import com.landveda.backend.service.ClientService;
import com.landveda.backend.service.OtpService;

@RestController
@RequestMapping("/api/clients")
@CrossOrigin(origins = "http://localhost:5173")
public class ClientController {

    private final ClientService clientService;
    private final OtpService otpService;

    public ClientController(ClientService clientService, OtpService otpService) {
        this.clientService = clientService;
        this.otpService = otpService;
    }

    @GetMapping
    public List<Client> getAllClients() {
        return clientService.getAllClients();
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerClient(@RequestBody Client client) {
        return ApiResponse.run(() -> clientService.registerClient(client));
    }

    @PostMapping("/login/otp-send")
    public ResponseEntity<?> sendLoginOtp(@RequestBody Map<String, String> body) {
        String mobile = body.get("mobile");
        if (mobile == null || mobile.isBlank()) {
            return ResponseEntity.badRequest().body("Mobile number is required.");
        }

        boolean exists = clientService.getClientByMobile(mobile).isPresent();
        if (!exists) {
            return ResponseEntity.status(401).body("Mobile number not registered.");
        }

        boolean sent = otpService.sendOtp(mobile);
        return sent
            ? ResponseEntity.ok("OTP sent successfully.")
            : ResponseEntity.status(500).body("Failed to send OTP. Please try again.");
    }

    @PostMapping("/login/otp-verify")
    public ResponseEntity<?> verifyLoginOtp(@RequestBody Map<String, String> body) {
        String mobile = body.get("mobile");
        String otp = body.get("otp");
        if (mobile == null || otp == null) {
            return ResponseEntity.badRequest().body("Mobile and OTP are required.");
        }

        boolean valid = otpService.verifyOtp(mobile, otp);
        if (!valid) {
            return ResponseEntity.status(401).body("Invalid or expired OTP.");
        }

        return clientService.getClientByMobile(mobile)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.status(404).build());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable @NonNull Long id, @RequestBody Map<String, String> body) {
        return ApiResponse.run(() -> clientService.updateStatus(id, body.get("status")));
    }

    @PutMapping("/{id}/handler")
    public ResponseEntity<?> updateHandler(@PathVariable @NonNull Long id, @RequestBody Map<String, String> body) {
        return ApiResponse.run(() -> clientService.updateHandler(id, body.get("handler")));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteClient(@PathVariable @NonNull Long id) {
        clientService.deleteClient(id);
        return ResponseEntity.ok("Client deleted successfully.");
    }
}
