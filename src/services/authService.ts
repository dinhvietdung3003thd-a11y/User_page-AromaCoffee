import type { AuthUser } from '../types/auth.types';

interface AuthPayload {
  token: string;
  user: AuthUser;
}

interface LoginInput {
  email: string;
  password: string;
}

interface RegisterInput {
  displayName: string;
  email: string;
  password: string;
}

const createMockUser = (displayName: string, email: string): AuthUser => ({
  id: `user-${email.toLowerCase()}`,
  displayName,
  email,
  avatarUrl: 'https://i.pravatar.cc/100?img=14'
});

export const authService = {
  login(input: LoginInput): AuthPayload {
    const normalizedEmail = input.email.trim().toLowerCase();

    return {
      token: `mock-token-${Date.now()}`,
      user: createMockUser(normalizedEmail.split('@')[0] || 'User', normalizedEmail)
    };
  },

  register(input: RegisterInput): AuthPayload {
    return {
      token: `mock-token-${Date.now()}`,
      user: createMockUser(input.displayName.trim() || 'User', input.email.trim().toLowerCase())
    };
  }
};
