package com.plotnet.service;

import com.plotnet.dto.PaymentRequest;
import com.plotnet.model.Booking;
import com.plotnet.model.Booking.BookingStatus;
import com.plotnet.model.Payment;
import com.plotnet.model.Payment.PaymentStatus;
import com.plotnet.model.Plot.PlotStatus;
import com.plotnet.repository.BookingRepository;
import com.plotnet.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PaymentService {

    @Autowired private PaymentRepository paymentRepository;
    @Autowired private BookingRepository bookingRepository;

    @Transactional
    public Payment processPayment(PaymentRequest request) {
        Booking booking = bookingRepository.findById(request.getBookingId())
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        paymentRepository.findByBooking_Id(booking.getId()).ifPresent(existing -> {
            throw new RuntimeException("Payment already processed for this booking");
        });

        Payment payment = new Payment();
        payment.setBooking(booking);
        payment.setTransactionId(request.getTransactionId());
        payment.setAmount(request.getAmount());

        String statusStr = request.getStatus();
        boolean isSuccess = "SUCCESS".equalsIgnoreCase(statusStr);
        payment.setStatus(isSuccess ? PaymentStatus.SUCCESS : PaymentStatus.FAILED);

        Payment saved = paymentRepository.save(payment);

        // Auto-confirm booking and mark plot as BOOKED on successful payment
        if (isSuccess) {
            booking.setStatus(BookingStatus.CONFIRMED);
            booking.getPlot().setStatus(PlotStatus.BOOKED);
            bookingRepository.save(booking);
        }

        return saved;
    }
}
