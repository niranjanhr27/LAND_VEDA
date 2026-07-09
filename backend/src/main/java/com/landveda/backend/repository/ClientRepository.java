// ClientRepository.java — Database operations for Client entity

package com.landveda.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.landveda.backend.entity.Client;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {

    // find client by mobile number
    Optional<Client> findByMobile(String mobile);

    // check if mobile already exists
    boolean existsByMobile(String mobile);
}