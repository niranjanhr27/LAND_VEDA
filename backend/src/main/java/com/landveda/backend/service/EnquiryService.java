package com.landveda.backend.service;

import java.util.List;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.landveda.backend.entity.Enquiry;
import com.landveda.backend.repository.EnquiryRepository;

@Service
public class EnquiryService {

    private final EnquiryRepository enquiryRepository;

    public EnquiryService(EnquiryRepository enquiryRepository) {
        this.enquiryRepository = enquiryRepository;
    }

    public Enquiry saveEnquiry(@NonNull Enquiry enquiry) {
        return enquiryRepository.save(enquiry);
    }

    public List<Enquiry> getAllEnquiries() {
        return enquiryRepository.findAllByOrderByCreatedAtDesc();
    }

    public Enquiry updateStatus(@NonNull Long id, String status) {
        Enquiry enquiry = enquiryRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Enquiry not found."));
        enquiry.setStatus(status);
        return enquiryRepository.save(enquiry);
    }

    public void deleteEnquiry(@NonNull Long id) {
        enquiryRepository.deleteById(id);
    }

    public long countNewEnquiries() {
        return enquiryRepository.findByStatusOrderByCreatedAtDesc("New").size();
    }
}
