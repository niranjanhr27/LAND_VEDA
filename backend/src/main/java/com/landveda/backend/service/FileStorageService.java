package com.landveda.backend.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileStorageService {

    private final Path rootLocation = Paths.get("uploads");
    private final String backendBaseUrl;

    public FileStorageService(@Value("${app.backend.base-url:http://localhost:8080}") String backendBaseUrl) {
        this.backendBaseUrl = backendBaseUrl;
        try {
            Files.createDirectories(rootLocation);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize storage directory!", e);
        }
    }

    public String uploadFile(MultipartFile file, Long clientId) throws IOException {
        Path clientDir = rootLocation.resolve("clients").resolve(String.valueOf(clientId));
        Files.createDirectories(clientDir);

        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path destinationFile = clientDir.resolve(fileName);

        Files.copy(file.getInputStream(), destinationFile);

        // Return the relative file key (or path) which is stored in the database
        return "clients/" + clientId + "/" + fileName;
    }

    public String generatePresignedUrl(String fileKey) {
        // Return a direct HTTP download link to the served resource handler
        return backendBaseUrl + "/uploads/" + fileKey;
    }

    public void deleteFile(String fileKey) {
        try {
            Path file = rootLocation.resolve(fileKey);
            Files.deleteIfExists(file);
        } catch (IOException e) {
            System.err.println("Failed to delete local file: " + fileKey);
        }
    }
}
