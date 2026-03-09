export type UserRole = 'ADMIN' | 'ASSOCIATE';
export type VerificationStatus = 'PENDING_VERIFICATION' | 'APPROVED' | 'REJECTED';

export interface User {
  id: number;
  fullName: string;
  email: string;
  reraNumber: string;
  leaderName: string;
  teamName: string;
  role: UserRole;
  status: VerificationStatus;
  createdAt: string;
}
