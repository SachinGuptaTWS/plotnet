package com.plotnet.service;

import com.plotnet.dto.FeedbackDTO;
import com.plotnet.model.Feedback;
import com.plotnet.model.User;
import com.plotnet.repository.FeedbackRepository;
import com.plotnet.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FeedbackService {

    private static final int BODY_MIN = 10;
    private static final int BODY_MAX = 2000;
    private static final int REPLY_MAX = 2000;

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<FeedbackDTO> listPublic() {
        return feedbackRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(FeedbackDTO::fromPublic)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<FeedbackDTO> listForAdmin() {
        return feedbackRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(FeedbackDTO::fromAdmin)
                .collect(Collectors.toList());
    }

    @Transactional
    public FeedbackDTO create(String userEmail, String body) {
        User user = userRepository.findByEmail(userEmail);
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        if (user.getRole() != User.Role.ASSOCIATE) {
            throw new RuntimeException("Only associates can submit feedback");
        }
        if (user.getStatus() != User.VerificationStatus.APPROVED) {
            throw new RuntimeException("Only verified associates can submit feedback");
        }
        String normalized = normalizeBody(body);
        if (normalized.length() < BODY_MIN) {
            throw new RuntimeException("Feedback must be at least " + BODY_MIN + " characters");
        }
        if (normalized.length() > BODY_MAX) {
            throw new RuntimeException("Feedback must be at most " + BODY_MAX + " characters");
        }

        Feedback f = new Feedback();
        f.setAuthor(user);
        f.setBody(normalized);
        f.setCreatedAt(LocalDateTime.now());
        feedbackRepository.save(f);
        return FeedbackDTO.fromPublic(f);
    }

    @Transactional
    public FeedbackDTO addAdminReply(Long feedbackId, String replyText) {
        Feedback f = feedbackRepository.findById(feedbackId)
                .orElseThrow(() -> new RuntimeException("Feedback not found"));
        String reply = replyText == null ? "" : replyText.trim();
        if (reply.isEmpty()) {
            throw new RuntimeException("Reply cannot be empty");
        }
        if (reply.length() > REPLY_MAX) {
            throw new RuntimeException("Reply must be at most " + REPLY_MAX + " characters");
        }
        f.setAdminReply(reply);
        f.setAdminRepliedAt(LocalDateTime.now());
        feedbackRepository.save(f);
        return FeedbackDTO.fromAdmin(f);
    }

    private static String normalizeBody(String body) {
        if (body == null) return "";
        return body.trim();
    }
}
