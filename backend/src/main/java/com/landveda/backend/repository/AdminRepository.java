// AdminRepository.java — Database operations for Admin entity

package com.landveda.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.landveda.backend.entity.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {

    // find admin by username
    Optional<Admin> findByUsername(String username);
}