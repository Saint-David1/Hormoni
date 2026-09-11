import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

type Status = 'loading' | 'unauthenticated' | 'not-admin' | 'admin';

export function RequireAdmin() {
  const [status, setStatus] = useState<Status>('loading');
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function check() {
      const { data: { session } } = await supabase.auth.getSession();
      if (cancelled) return;

      if (!session) {
        setStatus('unauthenticated');
        return;
      }
      setSession(session);

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', session.user.id)
        .single();

      if (cancelled) return;
      if (error || !profile?.is_admin) {
        setStatus('not-admin');
        return;
      }
      setStatus('admin');
    }

    check();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => check());
    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  if (status === 'loading') {
    return <div className="centered">Loading…</div>;
  }

  if (status === 'unauthenticated') {
    return <Navigate to="/login" replace />;
  }

  if (status === 'not-admin') {
    return (
      <div className="centered">
        <h2>Not authorized</h2>
        <p>{session?.user.email} doesn't have admin access to Hormoni content.</p>
        <button onClick={() => supabase.auth.signOut()}>Sign out</button>
      </div>
    );
  }

  return <Outlet />;
}
