import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin,
    });

    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    setSent(true);
  };

  if (sent) {
    return (
      <div className="centered">
        <div className="card">
          <h2>Check your email</h2>
          <p>If an admin account exists for {email}, a password reset link has been sent to it.</p>
          <p><Link to="/login">Back to sign in</Link></p>
        </div>
      </div>
    );
  }

  return (
    <div className="centered">
      <form onSubmit={handleSubmit} className="card">
        <h1>Reset Password</h1>
        <p>Enter your admin email and we'll send you a reset link.</p>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>{loading ? 'Sending…' : 'Send reset link'}</button>
        {error && <p className="error">{error}</p>}
        <p><Link to="/login">Back to sign in</Link></p>
      </form>
    </div>
  );
}
