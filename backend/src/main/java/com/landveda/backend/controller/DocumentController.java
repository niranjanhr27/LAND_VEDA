package com.landveda.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.landveda.backend.entity.Client;
import com.landveda.backend.entity.Document;
import com.landveda.backend.service.ClientService;
import com.landveda.backend.service.DocumentService;
import com.landveda.backend.service.FileStorageService;

@RestController
@RequestMapping("/api/documents")
@CrossOrigin(origins = "http://localhost:5173")
public class DocumentController {

    private final DocumentService documentService;
    private final ClientService clientService;
    private final FileStorageService fileStorageService;

    public DocumentController(DocumentService documentService, ClientService clientService, FileStorageService fileStorageService) {
        this.documentService = documentService;
        this.clientService = clientService;
        this.fileStorageService = fileStorageService;
    }

    @GetMapping("/client/{clientId}")
    public List<Document> getDocumentsByClient(@PathVariable Long clientId) {
        return documentService.getDocumentsByClientId(clientId);
    }

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<?> uploadDocument(
        @RequestParam("file") MultipartFile file,
        @RequestParam("clientId") @NonNull Long clientId,
        @RequestParam("name") String name,
        @RequestParam("type") String type,
        @RequestParam(value = "description", required = false) String description,
        @RequestParam("uploadedBy") String uploadedBy
    ) {
        try {
            Client client = clientService.getClientById(clientId)
                .orElseThrow(() -> new IllegalArgumentException("Client not found."));

            Document document = new Document();
            document.setName(name);
            document.setType(type);
            document.setDescription(description);
            document.setUploadedBy(uploadedBy);
            document.setFileUrl(fileStorageService.uploadFile(file, clientId));
            document.setClient(client);

            return ResponseEntity.ok(documentService.uploadDocument(document));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Document upload failed.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDocument(@PathVariable @NonNull Long id) {
        try {
            Document document = documentService.getDocumentById(id)
                .orElseThrow(() -> new IllegalArgumentException("Document not found."));

            if (document.getFileUrl() != null) {
                fileStorageService.deleteFile(document.getFileUrl());
            }

            documentService.deleteDocument(id);
            return ResponseEntity.ok("Document deleted successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Document deletion failed.");
        }
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<?> getDownloadUrl(@PathVariable @NonNull Long id) {
        try {
            Document document = documentService.getDocumentById(id)
                .orElseThrow(() -> new IllegalArgumentException("Document not found."));

            if (document.getFileUrl() == null) {
                return ResponseEntity.badRequest().body("No file attached.");
            }

            return ResponseEntity.ok(fileStorageService.generatePresignedUrl(document.getFileUrl()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
