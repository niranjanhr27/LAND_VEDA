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

import com.landveda.backend.entity.Enquiry;
import com.landveda.backend.service.EnquiryService;

@RestController
@RequestMapping("/api/enquiries")
@CrossOrigin(origins = "http://localhost:5173")
public class EnquiryController {

    private final EnquiryService enquiryService;

    public EnquiryController(EnquiryService enquiryService) {
        this.enquiryService = enquiryService;
    }

    @PostMapping
    public ResponseEntity<?> saveEnquiry(@RequestBody @NonNull Enquiry enquiry) {
        return ApiResponse.run(() -> enquiryService.saveEnquiry(enquiry));
    }

    @GetMapping
    public ResponseEntity<List<Enquiry>> getAllEnquiries() {
        return ResponseEntity.ok(enquiryService.getAllEnquiries());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(
        @PathVariable @NonNull Long id,
        @RequestBody Map<String, String> body
    ) {
        return ApiResponse.run(() -> enquiryService.updateStatus(id, body.get("status")));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEnquiry(@PathVariable @NonNull Long id) {
        enquiryService.deleteEnquiry(id);
        return ResponseEntity.ok("Enquiry deleted successfully.");
    }

    @GetMapping("/count")
    public ResponseEntity<?> getNewCount() {
        return ResponseEntity.ok(enquiryService.countNewEnquiries());
    }
}
