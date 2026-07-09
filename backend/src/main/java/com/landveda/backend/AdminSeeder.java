package com.landveda.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.landveda.backend.entity.Admin;
import com.landveda.backend.repository.AdminRepository;
import com.landveda.backend.service.AdminService;

@Component
public class AdminSeeder implements CommandLineRunner {

    private final AdminRepository adminRepository;
    private final AdminService adminService;

    public AdminSeeder(AdminRepository adminRepository, AdminService adminService) {
        this.adminRepository = adminRepository;
        this.adminService = adminService;
    }

    @Override
    public void run(String... args) throws Exception {
        // Seed default fallback admin if not present
        seedAdmin("Admin", "SuperAdmin", "admin", "LV#admin@2026", "default_avatar.png");

        // Seed Team members
        seedAdmin("Niranjan H R", "Founder and CEO", "niranjan", "LV#niranjan@2026", "NHR");
        seedAdmin("Harsha", "Property Manager", "harsha", "LV#harsha@2026", "HA");
        seedAdmin("Keerthi", "Documentation Head", "keerthi", "LV#keerthi@2026", "KE");
        seedAdmin("Ramachandra", "Legal Advisor", "ramachandra", "LV#ramachandra@2026", "RA");
        seedAdmin("Bharath", "Field Executive", "bharath", "LV#bharath@2026", "BH");
        seedAdmin("Chethan", "Client Relations", "chethan", "LV#chethan@2026", "CH");
        seedAdmin("Harshith", "Survey and Inspection", "harshith", "LV#harshith@2026", "HT");
    }

    private void seedAdmin(String name, String role, String username, String password, String avatar) {
        if (adminRepository.findByUsername(username).isEmpty()) {
            Admin admin = new Admin();
            admin.setName(name);
            admin.setRole(role);
            admin.setUsername(username);
            admin.setPassword(password); // AdminService will automatically encode this
            admin.setAvatar(avatar);
            
            adminService.saveAdmin(admin);
            
            System.out.println("🌱 [DATABASE SEEDER] Seeded admin account: " + username + " (" + password + ")");
        }
    }
}
