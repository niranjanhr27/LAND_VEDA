// DocumentRepository.java — Database operations for Document entity

package com.landveda.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.landveda.backend.entity.Document;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {

    // find all documents belonging to a specific client
    List<Document> findByClientId(Long clientId);
}