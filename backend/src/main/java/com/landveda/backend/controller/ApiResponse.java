package com.landveda.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

final class ApiResponse {

    private ApiResponse() {
    }

    static ResponseEntity<?> run(ApiAction action) {
        try {
            return ResponseEntity.ok(action.execute());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @FunctionalInterface
    interface ApiAction {
        Object execute();
    }
}
