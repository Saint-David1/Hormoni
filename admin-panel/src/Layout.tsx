
import { NavLink, Outlet } from 'react-router-dom';
import { supabase } from './lib/supabase';

export function Layout() {
  return (
    <div className="app-shell">
      <nav className="sidebar">
        <h2>Hormoni Admin</h2>
        <NavLink to="/" end>Dashboard</NavLink>
        <NavLink to="/articles">Articles</NavLink>
        <NavLink to="/foods">Foods</NavLink>
        <NavLink to="/library">Library</NavLink>
        <NavLink to="/requests">Requests</NavLink>
        <button className="signout" onClick={() => supabase.auth.signOut()}>Sign out</button>
      </nav>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
