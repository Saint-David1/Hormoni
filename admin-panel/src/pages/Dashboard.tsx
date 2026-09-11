import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface Counts {
  approvedArticles: number;
  pendingArticles: number;
  exploreFoods: number;
  limitFoods: number;
}

export function Dashboard() {
  const [counts, setCounts] = useState<Counts | null>(null);

  useEffect(() => {
    async function load() {
      const [approved, pending, explore, limit] = await Promise.all([
        supabase.from('educational_content').select('id', { count: 'exact', head: true }).eq('review_status', 'approved'),
        supabase.from('educational_content').select('id', { count: 'exact', head: true }).eq('review_status', 'pending'),
        supabase.from('foods').select('id', { count: 'exact', head: true }).eq('category', 'explore'),
        supabase.from('foods').select('id', { count: 'exact', head: true }).eq('category', 'limit'),
      ]);

      setCounts({
        approvedArticles: approved.count ?? 0,
        pendingArticles: pending.count ?? 0,
        exploreFoods: explore.count ?? 0,
        limitFoods: limit.count ?? 0,
      });
    }
    load();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Publishing here updates the Hormoni app live — no app update needed. Approving an article or adding a food also sends a push notification to everyone with notifications enabled.</p>

      <div className="stat-grid">
        <Link to="/articles" className="stat-card">
          <span className="stat-value">{counts?.approvedArticles ?? '—'}</span>
          <span className="stat-label">Published articles</span>
        </Link>
        <Link to="/articles" className="stat-card">
          <span className="stat-value">{counts?.pendingArticles ?? '—'}</span>
          <span className="stat-label">Pending review</span>
        </Link>
        <Link to="/foods" className="stat-card">
          <span className="stat-value">{counts?.exploreFoods ?? '—'}</span>
          <span className="stat-label">Foods to explore</span>
        </Link>
        <Link to="/foods" className="stat-card">
          <span className="stat-value">{counts?.limitFoods ?? '—'}</span>
          <span className="stat-label">Foods to limit</span>
        </Link>
      </div>
    </div>
  );
}
