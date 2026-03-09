package com.plotnet.controller;

import com.plotnet.dto.BookingDTO;
import com.plotnet.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Map<String, Object> body,
                                    @AuthenticationPrincipal UserDetails principal) {
        try {
            Long plotId = ((Number) body.get("plotId")).longValue();
            BookingDTO dto = bookingService.create(plotId, principal.getUsername());
            return ResponseEntity.ok(dto);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/my")
    public ResponseEntity<List<BookingDTO>> myBookings(
            @AuthenticationPrincipal UserDetails principal) {
        return ResponseEntity.ok(bookingService.getMyBookings(principal.getUsername()));
    }

    @PatchMapping("/{id}/cancel")
    public ResponseEntity<?> cancel(@PathVariable Long id,
                                    @AuthenticationPrincipal UserDetails principal) {
        try {
            return ResponseEntity.ok(bookingService.cancelMyBooking(id, principal.getUsername()));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
