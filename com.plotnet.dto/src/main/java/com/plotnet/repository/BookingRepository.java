package com.plotnet.repository;

import com.plotnet.model.Booking;
import com.plotnet.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByUserOrderByBookingDateDesc(User user);

    List<Booking> findAllByOrderByBookingDateDesc();

    boolean existsByUserAndPlot_Id(User user, Long plotId);
}
