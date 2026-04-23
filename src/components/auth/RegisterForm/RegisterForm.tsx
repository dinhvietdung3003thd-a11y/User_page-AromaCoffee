import { useState } from 'react';
import './RegisterForm.css';

interface RegisterFormProps {
  onSubmit: (input: {
    username: string;
    password: string;
    fullName: string;
    phoneNumber: string;
    email: string;
  }) => Promise<void>;
}

function RegisterForm({ onSubmit }: RegisterFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  return (
    <form
      className="register-form"
      onSubmit={async (event) => {
        event.preventDefault();
        await onSubmit({ username, password, fullName, phoneNumber, email });
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

      <label>
        Full Name
        <input required value={fullName} onChange={(event) => setFullName(event.target.value)} />
      </label>

      <label>
        Phone Number
        <input required value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} />
      </label>

      <label>
        Email
        <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      </label>

      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterForm;
