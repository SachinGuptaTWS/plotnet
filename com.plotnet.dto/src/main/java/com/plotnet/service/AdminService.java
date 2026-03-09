package com.plotnet.service;

import com.plotnet.dto.DashboardStats;
import com.plotnet.dto.UserDTO;
import com.plotnet.model.Payment.PaymentStatus;
import com.plotnet.model.Plot.PlotStatus;
import com.plotnet.model.User;
import com.plotnet.model.User.VerificationStatus;
import com.plotnet.repository.BookingRepository;
import com.plotnet.repository.PaymentRepository;
import com.plotnet.repository.PlotRepository;
import com.plotnet.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AdminService {

    @Autowired private PlotRepository    plotRepository;
    @Autowired private BookingRepository bookingRepository;
    @Autowired private PaymentRepository paymentRepository;
    @Autowired private UserRepository    userRepository;

    @Transactional(readOnly = true)
    public DashboardStats getDashboardStats() {
        long totalPlots     = plotRepository.count();
        long availablePlots = plotRepository.countByStatus(PlotStatus.AVAILABLE);
        long totalBookings  = bookingRepository.count();
        Long revenue        = paymentRepository.sumAmountByStatus(PaymentStatus.SUCCESS);
        return new DashboardStats(totalPlots, availablePlots, totalBookings,
                                  revenue != null ? revenue : 0L);
    }

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream().map(UserDTO::from).toList();
    }

    public UserDTO verifyUser(Long userId, String statusStr) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setStatus(VerificationStatus.valueOf(statusStr));
        return UserDTO.from(userRepository.save(user));
    }
}
