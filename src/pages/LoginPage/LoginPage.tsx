import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm/LoginForm';
import { authService } from '../../services/authService';
import { useAuthStore } from '../../store/authStore';
import './LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleSubmit = (email: string, password: string) => {
    const authPayload = authService.login({ email, password });
    login(authPayload.token, authPayload.user);
    navigate('/profile');
  };

  return (
    <main className="login-page">
      <h1>Login</h1>
      <LoginForm onSubmit={handleSubmit} />
    </main>
  );
}

export default LoginPage;
