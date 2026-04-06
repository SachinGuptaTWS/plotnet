export interface FeedbackItem {
  id: number;
  authorName: string;
  authorEmail?: string | null;
  body: string;
  createdAt: string;
  adminReply?: string | null;
  adminRepliedAt?: string | null;
}
