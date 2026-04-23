import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../../components/auth/RegisterForm/RegisterForm';
import { authService } from '../../services/authService';
import './RegisterPage.css';

function RegisterPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (input: {
    username: string;
    password: string;
    fullName: string;
    phoneNumber: string;
    email: string;
  }) => {
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const result = await authService.register(input);
      setSuccessMessage(result.message || 'Register successful. Redirecting to login...');
      window.setTimeout(() => navigate('/login'), 1000);
    } catch (error) {
      const fallback = 'Unable to register. Please try again.';
      setErrorMessage(error instanceof Error ? error.message : fallback);
    }
  };

  return (
    <main className="register-page">
      <h1>Register</h1>
      <RegisterForm onSubmit={handleSubmit} />
      {successMessage ? <p>{successMessage}</p> : null}
      {errorMessage ? <p>{errorMessage}</p> : null}
    </main>
  );
}

export default RegisterPage;
