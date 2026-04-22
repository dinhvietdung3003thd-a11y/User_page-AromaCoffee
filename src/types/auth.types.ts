export interface AuthUser {
  id: string;
  displayName: string;
  email: string;
  avatarUrl: string;
}

export interface AuthState {
  token: string | null;
  user: AuthUser | null;
}
