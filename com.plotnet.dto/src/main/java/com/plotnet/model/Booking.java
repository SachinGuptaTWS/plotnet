package com.plotnet.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "plot_id", nullable = false)
    private Plot plot;

    @Column(nullable = false)
    private LocalDateTime bookingDate = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BookingStatus status = BookingStatus.PENDING;

    public enum BookingStatus {
        PENDING, CONFIRMED, CANCELLED
    }

    // === Getters ===

    public Long getId() { return id; }
    public User getUser() { return user; }
    public Plot getPlot() { return plot; }
    public LocalDateTime getBookingDate() { return bookingDate; }
    public BookingStatus getStatus() { return status; }

    // === Setters ===

    public void setId(Long id) { this.id = id; }
    public void setUser(User user) { this.user = user; }
    public void setPlot(Plot plot) { this.plot = plot; }
    public void setBookingDate(LocalDateTime bookingDate) { this.bookingDate = bookingDate; }
    public void setStatus(BookingStatus status) { this.status = status; }
}
