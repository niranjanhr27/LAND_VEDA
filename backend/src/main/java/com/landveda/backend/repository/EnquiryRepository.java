// EnquiryRepository.java — Database operations for enquiries

package com.landveda.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.landveda.backend.entity.Enquiry;

@Repository
public interface EnquiryRepository extends JpaRepository<Enquiry, Long> {

    // get all enquiries sorted by newest first
    List<Enquiry> findAllByOrderByCreatedAtDesc();

    // get enquiries by status
    List<Enquiry> findByStatusOrderByCreatedAtDesc(String status);
}