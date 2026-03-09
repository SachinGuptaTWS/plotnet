package com.plotnet.controller;

import com.plotnet.dto.ProfileUpdateRequest;
import com.plotnet.dto.UserDTO;
import com.plotnet.model.User;
import com.plotnet.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@Valid @RequestBody ProfileUpdateRequest request,
                                            @AuthenticationPrincipal UserDetails principal) {
        User user = userRepository.findByEmail(principal.getUsername());
        if (user == null) return ResponseEntity.notFound().build();

        user.setFullName(request.getFullName());
        user.setTeamName(request.getTeamName());
        user.setLeaderName(request.getLeaderName());

        return ResponseEntity.ok(UserDTO.from(userRepository.save(user)));
    }
}
