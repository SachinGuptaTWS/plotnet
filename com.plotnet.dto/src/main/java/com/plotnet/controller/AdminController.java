package com.plotnet.controller;

import com.plotnet.dto.BookingDTO;
import com.plotnet.dto.DashboardStats;
import com.plotnet.dto.UserDTO;
import com.plotnet.service.AdminService;
import com.plotnet.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired private AdminService   adminService;
    @Autowired private BookingService bookingService;

    // ── Dashboard ────────────────────────────────────────────────────────────

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardStats> dashboard() {
        return ResponseEntity.ok(adminService.getDashboardStats());
    }

    // ── Bookings ─────────────────────────────────────────────────────────────

    @GetMapping("/bookings")
    public ResponseEntity<List<BookingDTO>> allBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    @PatchMapping("/bookings/{id}")
    public ResponseEntity<?> updateBookingStatus(@PathVariable Long id,
                                                  @RequestBody Map<String, String> body) {
        try {
            return ResponseEntity.ok(bookingService.updateStatus(id, body.get("status")));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ── Users ─────────────────────────────────────────────────────────────────

    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> allUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    @PatchMapping("/users/{id}/verify")
    public ResponseEntity<?> verifyUser(@PathVariable Long id,
                                         @RequestBody Map<String, String> body) {
        try {
            return ResponseEntity.ok(adminService.verifyUser(id, body.get("status")));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
