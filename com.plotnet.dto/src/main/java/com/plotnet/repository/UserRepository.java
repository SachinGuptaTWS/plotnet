package com.plotnet.repository;

import com.plotnet.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    boolean existsByEmail(String email);
    boolean existsByReraNumber(String reraNumber);

    boolean existsByReraNumberIgnoreCase(String reraNumber);
}
