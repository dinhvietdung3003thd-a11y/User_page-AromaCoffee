export interface UserProfile {
  id: string;
  displayName: string;
  avatarUrl: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  user: UserProfile | null;
}
