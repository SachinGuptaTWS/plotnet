package com.plotnet.service;

import com.plotnet.dto.BookingDTO;
import com.plotnet.model.Booking;
import com.plotnet.model.Booking.BookingStatus;
import com.plotnet.model.Payment;
import com.plotnet.model.Plot;
import com.plotnet.model.Plot.PlotStatus;
import com.plotnet.model.User;
import com.plotnet.repository.BookingRepository;
import com.plotnet.repository.PaymentRepository;
import com.plotnet.repository.PlotRepository;
import com.plotnet.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired private BookingRepository bookingRepository;
    @Autowired private PlotRepository    plotRepository;
    @Autowired private UserRepository    userRepository;
    @Autowired private PaymentRepository paymentRepository;

    @Transactional
    public BookingDTO create(Long plotId, String userEmail) {
        User user = userRepository.findByEmail(userEmail);
        if (user == null) throw new RuntimeException("User not found");

        if (user.getStatus() != User.VerificationStatus.APPROVED) {
            throw new RuntimeException("Account not yet verified by administrator");
        }

        Plot plot = plotRepository.findById(plotId)
                .orElseThrow(() -> new RuntimeException("Plot not found"));

        if (plot.getStatus() != PlotStatus.AVAILABLE) {
            throw new RuntimeException("Plot is no longer available");
        }

        if (bookingRepository.existsByUserAndPlot_Id(user, plotId)) {
            throw new RuntimeException("You have already booked this plot");
        }

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setPlot(plot);
        booking.setStatus(BookingStatus.PENDING);

        plot.setStatus(PlotStatus.RESERVED);
        plotRepository.save(plot);

        Booking saved = bookingRepository.save(booking);
        return BookingDTO.from(saved, null);
    }

    @Transactional(readOnly = true)
    public List<BookingDTO> getMyBookings(String userEmail) {
        User user = userRepository.findByEmail(userEmail);
        if (user == null) throw new RuntimeException("User not found");

        return bookingRepository.findByUserOrderByBookingDateDesc(user)
                .stream()
                .map(b -> {
                    Optional<Payment> payment = paymentRepository.findByBooking_Id(b.getId());
                    return BookingDTO.from(b, payment.orElse(null));
                })
                .toList();
    }

    @Transactional
    public BookingDTO cancelMyBooking(Long bookingId, String userEmail) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (!booking.getUser().getEmail().equals(userEmail)) {
            throw new RuntimeException("Access denied");
        }

        if (booking.getStatus() != BookingStatus.PENDING) {
            throw new RuntimeException("Only PENDING bookings can be cancelled");
        }

        booking.setStatus(BookingStatus.CANCELLED);

        Plot plot = booking.getPlot();
        plot.setStatus(PlotStatus.AVAILABLE);
        plotRepository.save(plot);

        Booking saved = bookingRepository.save(booking);
        Optional<Payment> payment = paymentRepository.findByBooking_Id(saved.getId());
        return BookingDTO.from(saved, payment.orElse(null));
    }

    @Transactional(readOnly = true)
    public List<BookingDTO> getAllBookings() {
        return bookingRepository.findAllByOrderByBookingDateDesc()
                .stream()
                .map(b -> {
                    Optional<Payment> payment = paymentRepository.findByBooking_Id(b.getId());
                    return BookingDTO.from(b, payment.orElse(null));
                })
                .toList();
    }

    @Transactional
    public BookingDTO updateStatus(Long bookingId, String statusStr) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        BookingStatus newStatus = BookingStatus.valueOf(statusStr);
        booking.setStatus(newStatus);

        if (newStatus == BookingStatus.CONFIRMED) {
            booking.getPlot().setStatus(PlotStatus.BOOKED);
            plotRepository.save(booking.getPlot());
        } else if (newStatus == BookingStatus.CANCELLED) {
            booking.getPlot().setStatus(PlotStatus.AVAILABLE);
            plotRepository.save(booking.getPlot());
        }

        Booking saved = bookingRepository.save(booking);
        Optional<Payment> payment = paymentRepository.findByBooking_Id(saved.getId());
        return BookingDTO.from(saved, payment.orElse(null));
    }
}
