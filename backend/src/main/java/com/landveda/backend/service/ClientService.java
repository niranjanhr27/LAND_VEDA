package com.landveda.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.landveda.backend.PasswordUtil;
import com.landveda.backend.entity.Client;
import com.landveda.backend.repository.ClientRepository;

@Service
public class ClientService {

    private final ClientRepository clientRepository;
    private final PasswordUtil passwordUtil;

    public ClientService(ClientRepository clientRepository, PasswordUtil passwordUtil) {
        this.clientRepository = clientRepository;
        this.passwordUtil = passwordUtil;
    }

    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    public Optional<Client> getClientById(@NonNull Long id) {
        return clientRepository.findById(id);
    }

    public Optional<Client> getClientByMobile(String mobile) {
        return clientRepository.findByMobile(mobile);
    }

    public Client registerClient(Client client) {
        if (clientRepository.existsByMobile(client.getMobile())) {
            throw new IllegalArgumentException("Mobile number already registered.");
        }
        client.setPassword(passwordUtil.encode(client.getPassword()));
        return clientRepository.save(client);
    }

    public Optional<Client> loginClient(String mobile, String password) {
        return clientRepository.findByMobile(mobile)
            .filter(client -> passwordUtil.verify(password, client.getPassword()));
    }

    public Client updateStatus(@NonNull Long id, String status) {
        Client client = clientRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Client not found."));
        client.setStatus(status);
        return clientRepository.save(client);
    }

    public Client updateHandler(@NonNull Long id, String handler) {
        Client client = clientRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Client not found."));
        client.setHandler(handler);
        return clientRepository.save(client);
    }

    public void deleteClient(@NonNull Long id) {
        clientRepository.deleteById(id);
    }
}
