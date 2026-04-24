import { appConfig } from '../config/appConfig';
import type { AuthUser } from '../types/auth.types';

interface CustomerLoginRequest {
  username: string;
  password: string;
}

interface CustomerLoginResponse {
  customerId: number;
  fullName: string;
  loyaltyPoints: number;
  role: string;
  token: string;
}

interface CustomerRegisterRequest {
  username: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  email: string;
}

interface CustomerRegisterResponse {
  message: string;
}

interface LoginResult {
  token: string;
  user: AuthUser;
}

interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ChangePasswordResponse {
  message: string;
  token: string;
}

const resolveApiUrl = (path: string) => `${appConfig.apiBaseUrl}${path}`;

export const authService = {
  async login(input: CustomerLoginRequest): Promise<LoginResult> {
    const response = await fetch(resolveApiUrl('/api/Auth/customer/login'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input)
    });

    if (!response.ok) {
      throw new Error('Login failed. Please check your credentials.');
    }

    const data = (await response.json()) as CustomerLoginResponse;

    return {
      token: data.token,
      user: {
        customerId: data.customerId,
        fullName: data.fullName,
        loyaltyPoints: data.loyaltyPoints,
        role: data.role
      }
    };
  },

  async register(input: CustomerRegisterRequest): Promise<CustomerRegisterResponse> {
    const response = await fetch(resolveApiUrl('/api/Auth/customer/register'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input)
    });

    if (!response.ok) {
      throw new Error('Register failed. Please try again.');
    }

    return (await response.json()) as CustomerRegisterResponse;
  },

  async changePassword(
    token: string,
    input: ChangePasswordRequest
  ): Promise<ChangePasswordResponse> {
    const response = await fetch(resolveApiUrl('/api/Auth/change-password'), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(input)
    });

    if (!response.ok) {
      throw new Error('Change password failed. Please try again.');
    }

    return (await response.json()) as ChangePasswordResponse;
  }
};
