import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface Entry {
  id: string;
  title: string;
  category: string;
  review_status: string;
}

export function Library() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('knowledge_base_entries')
      .select('id, title, category, review_status')
      .order('title', { ascending: true })
      .then(({ data }) => {
        setEntries(data ?? []);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="page-header">
        <h1>Library</h1>
        <Link to="/library/new" className="button">+ New entry</Link>
      </div>
      <p className="hint">
        Short, searchable reference entries with links to credible external sources — distinct from the long-form
        Articles. Keep summaries brief and factual; save the depth for the linked sources.
      </p>

      {loading ? (
        <p>Loading…</p>
      ) : (
        <table className="table">
          <thead>
            <tr><th>Title</th><th>Category</th><th>Status</th><th /></tr>
          </thead>
          <tbody>
            {entries.map((e) => (
              <tr key={e.id}>
                <td>{e.title}</td>
                <td>{e.category}</td>
                <td><span className={`badge badge-${e.review_status}`}>{e.review_status}</span></td>
                <td><Link to={`/library/${e.id}`}>Edit</Link></td>
              </tr>
            ))}
            {entries.length === 0 && (
              <tr><td colSpan={4}>No entries yet.</td></tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
