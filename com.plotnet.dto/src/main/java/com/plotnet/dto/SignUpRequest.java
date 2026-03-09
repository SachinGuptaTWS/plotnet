package com.plotnet.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class SignUpRequest {

    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;

    @NotBlank(message = "RERA number is required")
    private String reraNumber;

    @NotBlank(message = "Leader name is required")
    private String leaderName;

    @NotBlank(message = "Team name is required")
    private String teamName;

    // ✅ Default constructor (required by Spring)
    public SignUpRequest() {
    }

    // ✅ Optional: All-args constructor
    public SignUpRequest(String fullName, String email, String password,
                         String reraNumber, String leaderName, String teamName) {
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.reraNumber = reraNumber;
        this.leaderName = leaderName;
        this.teamName = teamName;
    }

    // ✅ Getters and Setters
    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getReraNumber() {
        return reraNumber;
    }

    public void setReraNumber(String reraNumber) {
        this.reraNumber = reraNumber;
    }

    public String getLeaderName() {
        return leaderName;
    }

    public void setLeaderName(String leaderName) {
        this.leaderName = leaderName;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    // ✅ Optional: Convenience method
    public String summary() {
        return "SignupRequest{" +
                "fullName='" + fullName + '\'' +
                ", email='" + email + '\'' +
                ", reraNumber='" + reraNumber + '\'' +
                ", leaderName='" + leaderName + '\'' +
                ", teamName='" + teamName + '\'' +
                '}';
    }
}
