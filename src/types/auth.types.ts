export interface AuthUser {
  customerId: number;
  fullName: string;
  loyaltyPoints: number;
  role: string;
  email?: string;
  avatarUrl?: string;
}

export interface AuthState {
  token: string | null;
  user: AuthUser | null;
}
