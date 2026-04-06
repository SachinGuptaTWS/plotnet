package com.plotnet.dto;

import com.plotnet.model.Feedback;

import java.time.LocalDateTime;

public class FeedbackDTO {

    private Long id;
    private String authorName;
    /** Set only for admin list; omitted on public API. */
    private String authorEmail;
    private String body;
    private LocalDateTime createdAt;
    private String adminReply;
    private LocalDateTime adminRepliedAt;

    public static FeedbackDTO fromPublic(Feedback f) {
        return from(f, false);
    }

    public static FeedbackDTO fromAdmin(Feedback f) {
        return from(f, true);
    }

    private static FeedbackDTO from(Feedback f, boolean includeEmail) {
        FeedbackDTO dto = new FeedbackDTO();
        dto.id = f.getId();
        dto.authorName = f.getAuthor().getFullName();
        if (includeEmail) {
            dto.authorEmail = f.getAuthor().getEmail();
        }
        dto.body = f.getBody();
        dto.createdAt = f.getCreatedAt();
        dto.adminReply = f.getAdminReply();
        dto.adminRepliedAt = f.getAdminRepliedAt();
        return dto;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getAuthorName() { return authorName; }
    public void setAuthorName(String authorName) { this.authorName = authorName; }
    public String getAuthorEmail() { return authorEmail; }
    public void setAuthorEmail(String authorEmail) { this.authorEmail = authorEmail; }
    public String getBody() { return body; }
    public void setBody(String body) { this.body = body; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public String getAdminReply() { return adminReply; }
    public void setAdminReply(String adminReply) { this.adminReply = adminReply; }
    public LocalDateTime getAdminRepliedAt() { return adminRepliedAt; }
    public void setAdminRepliedAt(LocalDateTime adminRepliedAt) { this.adminRepliedAt = adminRepliedAt; }
}
