package com.plotnet.dto;

import com.plotnet.model.Booking;
import com.plotnet.model.Payment;
import java.time.LocalDateTime;

public class BookingDTO {

    private Long id;
    private Long userId;
    private Long plotId;
    private String plotTitle;
    private String plotLocation;
    private Long plotPrice;
    private LocalDateTime bookingDate;
    private String status;
    private String paymentStatus;
    private String transactionId;
    private LocalDateTime paymentDate;
    private String userName;
    private String userEmail;

    public BookingDTO() {}

    public static BookingDTO from(Booking booking, Payment payment) {
        BookingDTO dto = new BookingDTO();
        dto.id            = booking.getId();
        dto.userId        = booking.getUser().getId();
        dto.plotId        = booking.getPlot().getId();
        dto.plotTitle     = booking.getPlot().getTitle();
        dto.plotLocation  = booking.getPlot().getLocation();
        dto.plotPrice     = booking.getPlot().getPrice();
        dto.bookingDate   = booking.getBookingDate();
        dto.status        = booking.getStatus().name();
        dto.userName      = booking.getUser().getFullName();
        dto.userEmail     = booking.getUser().getEmail();
        if (payment != null) {
            dto.paymentStatus  = payment.getStatus().name();
            dto.transactionId  = payment.getTransactionId();
            dto.paymentDate    = payment.getPaymentDate();
        }
        return dto;
    }

    public Long getId() { return id; }
    public Long getUserId() { return userId; }
    public Long getPlotId() { return plotId; }
    public String getPlotTitle() { return plotTitle; }
    public String getPlotLocation() { return plotLocation; }
    public Long getPlotPrice() { return plotPrice; }
    public LocalDateTime getBookingDate() { return bookingDate; }
    public String getStatus() { return status; }
    public String getPaymentStatus() { return paymentStatus; }
    public String getTransactionId() { return transactionId; }
    public LocalDateTime getPaymentDate() { return paymentDate; }
    public String getUserName() { return userName; }
    public String getUserEmail() { return userEmail; }

    public void setId(Long id) { this.id = id; }
    public void setUserId(Long userId) { this.userId = userId; }
    public void setPlotId(Long plotId) { this.plotId = plotId; }
    public void setPlotTitle(String plotTitle) { this.plotTitle = plotTitle; }
    public void setPlotLocation(String plotLocation) { this.plotLocation = plotLocation; }
    public void setPlotPrice(Long plotPrice) { this.plotPrice = plotPrice; }
    public void setBookingDate(LocalDateTime bookingDate) { this.bookingDate = bookingDate; }
    public void setStatus(String status) { this.status = status; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }
    public void setTransactionId(String transactionId) { this.transactionId = transactionId; }
    public void setPaymentDate(LocalDateTime paymentDate) { this.paymentDate = paymentDate; }
    public void setUserName(String userName) { this.userName = userName; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }
}
