import { useState } from 'react';
import './LoginForm.css';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}

function LoginForm({ onSubmit }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form
      className="login-form"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(email, password);
      }}
    >
      <label>
        Email
        <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      </label>

      <label>
        Password
        <input
          required
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>

      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
