package com.plotnet.service;

import com.plotnet.dto.LoginRequest;
import com.plotnet.dto.LoginResponse;
import com.plotnet.dto.SignUpRequest;
import com.plotnet.dto.UserDTO;
import com.plotnet.model.User;
import com.plotnet.repository.PlotRepository;
import com.plotnet.repository.UserRepository;
import com.plotnet.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PlotRepository plotRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public User registerUser(SignUpRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        String reraTrimmed = request.getReraNumber().trim();
        if (userRepository.existsByReraNumberIgnoreCase(reraTrimmed)) {
            throw new RuntimeException("RERA number already exists");
        }
        if (plotRepository.existsByReraNumberIgnoreCase(reraTrimmed)) {
            throw new RuntimeException("RERA number already exists");
        }

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setReraNumber(reraTrimmed);
        user.setLeaderName(request.getLeaderName());
        user.setTeamName(request.getTeamName());

        return userRepository.save(user);
    }

    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail());
        if (user == null || !passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Invalid email or password");
        }

        if (user.getStatus() == User.VerificationStatus.PENDING_VERIFICATION) {
            throw new RuntimeException("Your account is awaiting administrator verification. Please try again after approval.");
        }

        if (user.getStatus() == User.VerificationStatus.REJECTED) {
            throw new RuntimeException("Your account has been rejected. Please contact the administrator.");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        return new LoginResponse(token, UserDTO.from(user));
    }
}
