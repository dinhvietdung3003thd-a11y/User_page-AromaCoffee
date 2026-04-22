import { useNavigate } from 'react-router-dom';
import RegisterForm from '../../components/auth/RegisterForm/RegisterForm';
import { authService } from '../../services/authService';
import { useAuthStore } from '../../store/authStore';
import './RegisterPage.css';

function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleSubmit = (displayName: string, email: string, password: string) => {
    const authPayload = authService.register({ displayName, email, password });
    login(authPayload.token, authPayload.user);
    navigate('/profile');
  };

  return (
    <main className="register-page">
      <h1>Register</h1>
      <RegisterForm onSubmit={handleSubmit} />
    </main>
  );
}

export default RegisterPage;
