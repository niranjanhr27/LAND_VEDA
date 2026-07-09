package com.landveda.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.landveda.backend.entity.Document;
import com.landveda.backend.repository.DocumentRepository;

@Service
public class DocumentService {

    private final DocumentRepository documentRepository;

    public DocumentService(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    public List<Document> getDocumentsByClientId(Long clientId) {
        return documentRepository.findByClientId(clientId);
    }

    public Optional<Document> getDocumentById(@NonNull Long id) {
        return documentRepository.findById(id);
    }

    public Document uploadDocument(@NonNull Document document) {
        return documentRepository.save(document);
    }

    public void deleteDocument(@NonNull Long id) {
        documentRepository.deleteById(id);
    }
}
