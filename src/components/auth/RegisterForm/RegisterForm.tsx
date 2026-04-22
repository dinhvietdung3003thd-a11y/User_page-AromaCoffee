import { useState } from 'react';
import './RegisterForm.css';

interface RegisterFormProps {
  onSubmit: (displayName: string, email: string, password: string) => void;
}

function RegisterForm({ onSubmit }: RegisterFormProps) {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form
      className="register-form"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(displayName, email, password);
      }}
    >
      <label>
        Name
        <input required value={displayName} onChange={(event) => setDisplayName(event.target.value)} />
      </label>

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

      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterForm;
