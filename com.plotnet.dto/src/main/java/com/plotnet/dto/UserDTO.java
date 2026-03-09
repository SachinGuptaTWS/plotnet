package com.plotnet.dto;

import com.plotnet.model.User;
import java.time.LocalDateTime;

public class UserDTO {

    private Long id;
    private String fullName;
    private String email;
    private String reraNumber;
    private String leaderName;
    private String teamName;
    private String role;
    private String status;
    private LocalDateTime createdAt;

    public UserDTO() {}

    public static UserDTO from(User user) {
        UserDTO dto = new UserDTO();
        dto.id          = user.getId();
        dto.fullName    = user.getFullName();
        dto.email       = user.getEmail();
        dto.reraNumber  = user.getReraNumber();
        dto.leaderName  = user.getLeaderName();
        dto.teamName    = user.getTeamName();
        dto.role        = user.getRole().name();
        dto.status      = user.getStatus().name();
        dto.createdAt   = user.getCreatedAt();
        return dto;
    }

    public Long getId() { return id; }
    public String getFullName() { return fullName; }
    public String getEmail() { return email; }
    public String getReraNumber() { return reraNumber; }
    public String getLeaderName() { return leaderName; }
    public String getTeamName() { return teamName; }
    public String getRole() { return role; }
    public String getStatus() { return status; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    public void setId(Long id) { this.id = id; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public void setEmail(String email) { this.email = email; }
    public void setReraNumber(String reraNumber) { this.reraNumber = reraNumber; }
    public void setLeaderName(String leaderName) { this.leaderName = leaderName; }
    public void setTeamName(String teamName) { this.teamName = teamName; }
    public void setRole(String role) { this.role = role; }
    public void setStatus(String status) { this.status = status; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
