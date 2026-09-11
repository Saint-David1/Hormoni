import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface Article {
  id: string;
  title: string;
  category: string | null;
  review_status: string;
  published_at: string | null;
}

export function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('educational_content')
      .select('id, title, category, review_status, published_at')
      .order('published_at', { ascending: false, nullsFirst: false })
      .then(({ data }) => {
        setArticles(data ?? []);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="page-header">
        <h1>Articles</h1>
        <Link to="/articles/new" className="button">+ New article</Link>
      </div>

      {loading ? (
        <p>Loading…</p>
      ) : (
        <table className="table">
          <thead>
            <tr><th>Title</th><th>Category</th><th>Status</th><th /></tr>
          </thead>
          <tbody>
            {articles.map((a) => (
              <tr key={a.id}>
                <td>{a.title}</td>
                <td>{a.category ?? '—'}</td>
                <td><span className={`badge badge-${a.review_status}`}>{a.review_status}</span></td>
                <td><Link to={`/articles/${a.id}`}>Edit</Link></td>
              </tr>
            ))}
            {articles.length === 0 && (
              <tr><td colSpan={4}>No articles yet.</td></tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
