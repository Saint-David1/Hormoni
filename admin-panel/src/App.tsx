
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { RequireAdmin } from './auth/RequireAdmin';
import { Layout } from './Layout';
import { Login } from './pages/Login';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';
import { Dashboard } from './pages/Dashboard';
import { Articles } from './pages/Articles';
import { ArticleEditor } from './pages/ArticleEditor';
import { Foods } from './pages/Foods';
import { FoodEditor } from './pages/FoodEditor';
import { Requests } from './pages/Requests';
import { Library } from './pages/Library';
import { LibraryEditor } from './pages/LibraryEditor';

function PasswordRecoveryListener() {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        navigate('/reset-password');
      }
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <PasswordRecoveryListener />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route element={<RequireAdmin />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:id" element={<ArticleEditor />} />
            <Route path="/foods" element={<Foods />} />
            <Route path="/foods/:id" element={<FoodEditor />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/library" element={<Library />} />
            <Route path="/library/:id" element={<LibraryEditor />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
