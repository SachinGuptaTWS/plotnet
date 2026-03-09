package com.plotnet.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    private String email;
    private String passwordHash;
    private String reraNumber;
    private String leaderName;
    private String teamName;

    @Enumerated(EnumType.STRING)
    private Role role = Role.ASSOCIATE;

    @Enumerated(EnumType.STRING)
    private VerificationStatus status = VerificationStatus.PENDING_VERIFICATION;

    private LocalDateTime createdAt = LocalDateTime.now();

    // Enums
    public enum Role {
        ADMIN, ASSOCIATE
    }

    public enum VerificationStatus {
        PENDING_VERIFICATION, APPROVED, REJECTED
    }

    // === Getters ===

    public Long getId() {
        return id;
    }

    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public String getReraNumber() {
        return reraNumber;
    }

    public String getLeaderName() {
        return leaderName;
    }

    public String getTeamName() {
        return teamName;
    }

    public Role getRole() {
        return role;
    }

    public VerificationStatus getStatus() {
        return status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    // === Setters ===

    public void setId(Long id) {
        this.id = id;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public void setReraNumber(String reraNumber) {
        this.reraNumber = reraNumber;
    }

    public void setLeaderName(String leaderName) {
        this.leaderName = leaderName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public void setStatus(VerificationStatus status) {
        this.status = status;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
