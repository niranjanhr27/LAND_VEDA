package com.landveda.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.landveda.backend.PasswordUtil;
import com.landveda.backend.entity.Admin;
import com.landveda.backend.repository.AdminRepository;

@Service
public class AdminService {

    private final AdminRepository adminRepository;
    private final PasswordUtil passwordUtil;

    public AdminService(AdminRepository adminRepository, PasswordUtil passwordUtil) {
        this.adminRepository = adminRepository;
        this.passwordUtil = passwordUtil;
    }

    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    public Optional<Admin> loginAdmin(String username, String password) {
        return adminRepository.findByUsername(username)
            .filter(admin -> passwordUtil.verify(password, admin.getPassword()));
    }

    public Admin saveAdmin(Admin admin) {
        admin.setPassword(passwordUtil.encode(admin.getPassword()));
        return adminRepository.save(admin);
    }
}
