// Client.java — Entity class representing a property client in the database

package com.landveda.backend.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "clients")
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String mobile;

    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String service;

    @Column(nullable = false)
    private String status = "Pending";

    @Column(nullable = false)
    private String handler = "Niranjan";

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}