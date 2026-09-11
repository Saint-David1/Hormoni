import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface DataSnapshot {
  reasons?: string[];
  message?: string;
  email?: string;
  health_summary?: unknown;
}

interface GuidanceRequest {
  id: string;
  status: string;
  submitted_at: string;
  data_snapshot: DataSnapshot | null;
}

const STATUSES = ['pending', 'contacted', 'resolved'];

export function Requests() {
  const [requests, setRequests] = useState<GuidanceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | string>('all');

  const load = () => {
    let query = supabase.from('guidance_requests').select('id, status, submitted_at, data_snapshot').order('submitted_at', { ascending: false });
    if (filter !== 'all') query = query.eq('status', filter);
    query.then(({ data }) => {
      setRequests((data as GuidanceRequest[]) ?? []);
      setLoading(false);
    });
  };

  useEffect(load, [filter]);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('guidance_requests').update({ status, responded_at: new Date().toISOString() }).eq('id', id);
    load();
  };

  return (
    <div>
      <div className="page-header">
        <h1>Consultation Requests</h1>
      </div>

      <div className="filter-row">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
        {STATUSES.map((s) => (
          <button key={s} className={filter === s ? 'active' : ''} onClick={() => setFilter(s)}>{s}</button>
        ))}
      </div>

      {loading ? (
        <p>Loading…</p>
      ) : requests.length === 0 ? (
        <p>No requests yet.</p>
      ) : (
        <div className="request-list">
          {requests.map((r) => (
            <div key={r.id} className="request-card">
              <div className="request-card-header">
                <div>
                  <strong>{r.data_snapshot?.email ?? 'Unknown user'}</strong>
                  <span className="request-date"> · {new Date(r.submitted_at).toLocaleString()}</span>
                </div>
                <span className={`badge badge-${r.status}`}>{r.status}</span>
              </div>

              {r.data_snapshot?.reasons && r.data_snapshot.reasons.length > 0 && (
                <div className="request-reasons">
                  {r.data_snapshot.reasons.map((reason) => (
                    <span key={reason} className="badge badge-explore">{reason}</span>
                  ))}
                </div>
              )}

              {r.data_snapshot?.message && (
                <p className="request-message">"{r.data_snapshot.message}"</p>
              )}

              {r.data_snapshot?.health_summary != null && (
                <details>
                  <summary>Health summary</summary>
                  <pre className="request-summary">{JSON.stringify(r.data_snapshot.health_summary, null, 2)}</pre>
                </details>
              )}

              <div className="request-actions">
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    className={s === r.status ? '' : 'secondary'}
                    disabled={s === r.status}
                    onClick={() => updateStatus(r.id, s)}
                  >
                    Mark {s}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
