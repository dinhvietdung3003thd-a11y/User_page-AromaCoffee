import { useState } from 'react';
import './LoginForm.css';

interface LoginFormProps {
  onSubmit: (username: string, password: string) => Promise<void>;
}

function LoginForm({ onSubmit }: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form
      className="login-form"
      onSubmit={async (event) => {
        event.preventDefault();
        await onSubmit(username, password);
      }}
    >
      <label>
        Username
        <input required value={username} onChange={(event) => setUsername(event.target.value)} />
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
