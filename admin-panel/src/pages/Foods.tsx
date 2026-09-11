import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface Food {
  id: string;
  name: string;
  category: 'explore' | 'limit';
}

export function Foods() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [filter, setFilter] = useState<'all' | 'explore' | 'limit'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let request = supabase.from('foods').select('id, name, category');
    if (filter !== 'all') request = request.eq('category', filter);
    request.order('name').then(({ data }) => {
      setFoods(data ?? []);
      setLoading(false);
    });
  }, [filter]);

  return (
    <div>
      <div className="page-header">
        <h1>Foods</h1>
        <Link to="/foods/new" className="button">+ New food</Link>
      </div>

      <div className="filter-row">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
        <button className={filter === 'explore' ? 'active' : ''} onClick={() => setFilter('explore')}>Explore</button>
        <button className={filter === 'limit' ? 'active' : ''} onClick={() => setFilter('limit')}>Limit</button>
      </div>

      {loading ? (
        <p>Loading…</p>
      ) : (
        <table className="table">
          <thead><tr><th>Name</th><th>Category</th><th /></tr></thead>
          <tbody>
            {foods.map((f) => (
              <tr key={f.id}>
                <td>{f.name}</td>
                <td><span className={`badge badge-${f.category}`}>{f.category}</span></td>
                <td><Link to={`/foods/${f.id}`}>Edit</Link></td>
              </tr>
            ))}
            {foods.length === 0 && <tr><td colSpan={3}>No foods yet.</td></tr>}
          </tbody>
        </table>
      )}
    </div>
  );
}
