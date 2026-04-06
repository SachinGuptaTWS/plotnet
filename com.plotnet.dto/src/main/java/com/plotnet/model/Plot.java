package com.plotnet.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "plots")
public class Plot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private Integer area;

    @Column(nullable = false)
    private Long price;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String imageUrl;

    /** Project / listing RERA id; optional. Used for duplicate and conflict checks. */
    @Column(length = 64)
    private String reraNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PlotStatus status = PlotStatus.AVAILABLE;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public enum PlotStatus {
        AVAILABLE, RESERVED, BOOKED
    }

    // === Getters ===

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getLocation() { return location; }
    public Integer getArea() { return area; }
    public Long getPrice() { return price; }
    public String getDescription() { return description; }
    public String getImageUrl() { return imageUrl; }
    public String getReraNumber() { return reraNumber; }
    public PlotStatus getStatus() { return status; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    // === Setters ===

    public void setId(Long id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
    public void setLocation(String location) { this.location = location; }
    public void setArea(Integer area) { this.area = area; }
    public void setPrice(Long price) { this.price = price; }
    public void setDescription(String description) { this.description = description; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public void setReraNumber(String reraNumber) { this.reraNumber = reraNumber; }
    public void setStatus(PlotStatus status) { this.status = status; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
