import type { AuthState } from '../types/auth.types';

const mockAuthState: AuthState = {
  isLoggedIn: false,
  user: null
};

export const authService = {
  getAuthState(): AuthState {
    return mockAuthState;
  }
};
