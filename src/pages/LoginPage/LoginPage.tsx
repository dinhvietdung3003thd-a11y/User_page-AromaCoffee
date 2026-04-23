import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm/LoginForm';
import { authService } from '../../services/authService';
import { useAuthStore } from '../../store/authStore';
import './LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (username: string, password: string) => {
    setErrorMessage('');

    try {
      const authPayload = await authService.login({ username, password });
      login(authPayload.token, authPayload.user);
      navigate('/profile');
    } catch (error) {
      const fallback = 'Unable to login. Please try again.';
      setErrorMessage(error instanceof Error ? error.message : fallback);
    }
  };

  return (
    <main className="login-page">
      <h1>Login</h1>
      <LoginForm onSubmit={handleSubmit} />
      {errorMessage ? <p>{errorMessage}</p> : null}
    </main>
  );
}

export default LoginPage;
