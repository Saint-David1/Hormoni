import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

// Reached after clicking a password-reset email link — App.tsx's PASSWORD_RECOVERY
// listener routes here once Supabase has already exchanged the link for a session.
export function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) return setError('Password must be at least 6 characters');
    if (password !== confirmPassword) return setError("Passwords don't match");

    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }
    navigate('/');
  };

  return (
    <div className="centered">
      <form onSubmit={handleSubmit} className="card">
        <h1>Set a New Password</h1>
        <p>Choose a new password for your admin account.</p>
        <input
          type="password"
          placeholder="At least 6 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>{loading ? 'Updating…' : 'Update password'}</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
