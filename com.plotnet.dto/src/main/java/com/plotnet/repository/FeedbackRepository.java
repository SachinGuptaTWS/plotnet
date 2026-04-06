package com.plotnet.repository;

import com.plotnet.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.EntityGraph;

import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

    @EntityGraph(attributePaths = {"author"})
    List<Feedback> findAllByOrderByCreatedAtDesc();
}
