package com.plotnet.config;

import com.plotnet.model.Plot;
import com.plotnet.model.Plot.PlotStatus;
import com.plotnet.model.User;
import com.plotnet.model.User.Role;
import com.plotnet.model.User.VerificationStatus;
import com.plotnet.repository.PlotRepository;
import com.plotnet.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements ApplicationRunner {

    @Autowired private UserRepository userRepository;
    @Autowired private PlotRepository plotRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    @Override
    public void run(ApplicationArguments args) {
        seedAdmin();
        seedPlots();
    }

    private void seedAdmin() {
        if (userRepository.existsByEmail("admin@plotnet.com")) return;

        User admin = new User();
        admin.setFullName("PlotNet Admin");
        admin.setEmail("admin@plotnet.com");
        admin.setPasswordHash(passwordEncoder.encode("Admin@1234"));
        admin.setReraNumber("ADMIN-0001");
        admin.setLeaderName("System");
        admin.setTeamName("PlotNet HQ");
        admin.setRole(Role.ADMIN);
        admin.setStatus(VerificationStatus.APPROVED);

        userRepository.save(admin);
        System.out.println("==============================================");
        System.out.println("  ADMIN SEEDED — email: admin@plotnet.com");
        System.out.println("             password: Admin@1234");
        System.out.println("==============================================");
    }

    private void seedPlots() {
        if (plotRepository.count() > 0) return;

        Object[][] data = {
            {"Sunrise Heights - Plot A1", "Jaipur, Rajasthan",   120, 2400000L,
             "East-facing corner plot in a gated township. Wide roads, 24/7 security, underground utilities.",
             "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800"},

            {"Green Valley - Plot B3", "Jodhpur, Rajasthan",    200, 3800000L,
             "Prime residential plot with mountain views. RERA registered, ready-to-build with all approvals.",
             "https://images.unsplash.com/photo-1502005097973-6a7082348e28?w=800"},

            {"Lakeview Estates - Plot C7", "Udaipur, Rajasthan",  150, 4500000L,
             "Premium lakeside plot with panoramic views. Walking distance to commercial district.",
             "https://images.unsplash.com/photo-1448630360428-65456885c650?w=800"},

            {"Tech City Plots - D12", "Kota, Rajasthan",         100, 1800000L,
             "Affordable residential plot near upcoming IT corridor. Excellent connectivity via NH-27.",
             "https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=800"},

            {"Silver Oak Township - E5", "Ajmer, Rajasthan",     180, 3200000L,
             "Spacious plot in an eco-friendly township. 60-ft wide roads, parks every 500m, CCTV surveillance.",
             "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800"},

            {"Heritage Gardens - F2", "Bikaner, Rajasthan",      250, 2900000L,
             "Large plot suited for villa/farmhouse construction. Near heritage zone with appreciation potential.",
             "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"},
        };

        for (Object[] row : data) {
            Plot p = new Plot();
            p.setTitle((String)  row[0]);
            p.setLocation((String) row[1]);
            p.setArea((Integer)  row[2]);
            p.setPrice((Long)    row[3]);
            p.setDescription((String) row[4]);
            p.setImageUrl((String) row[5]);
            p.setStatus(PlotStatus.AVAILABLE);
            plotRepository.save(p);
        }

        System.out.println("==============================================");
        System.out.println("  6 SAMPLE PLOTS SEEDED successfully.");
        System.out.println("==============================================");
    }
}
