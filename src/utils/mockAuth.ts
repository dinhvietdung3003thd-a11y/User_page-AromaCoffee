import { authService } from '../services/authService';

export const getMockAuth = () => authService.getAuthState();
