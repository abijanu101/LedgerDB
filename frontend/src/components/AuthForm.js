import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthForm({ isSignup = false }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup && password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    alert(`${isSignup ? 'Signed up' : 'Logged in'} with ${email}`);
  };

  return (
    <div className="form-container">
      <h1>Ledger DB</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {isSignup && (
          <>
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </>
        )}
        <button type="submit">{isSignup ? 'Sign Up' : 'Log In'}</button>
      </form>
      <p>
        {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button type="button" onClick={() => navigate(isSignup ? '/' : '/signup')}>
          {isSignup ? 'Log in' : 'Sign up'}
        </button>
      </p>
    </div>
  );
}

export default AuthForm;  