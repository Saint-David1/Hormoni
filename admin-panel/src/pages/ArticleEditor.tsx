import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { supabase } from '../lib/supabase';

const CATEGORIES = ['Diet', 'Stress', 'Cycle', 'General'];

export function ArticleEditor() {
  const { id } = useParams<{ id: string }>();
  const isNew = id === 'new';
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [body, setBody] = useState('');
  const [reviewStatus, setReviewStatus] = useState<'pending' | 'approved'>('pending');
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isNew) return;
    supabase
      .from('educational_content')
      .select('title, category, body, review_status')
      .eq('id', id)
      .single()
      .then(({ data }) => {
        if (data) {
          setTitle(data.title);
          setCategory(data.category ?? CATEGORIES[0]);
          setBody(data.body ?? '');
          setReviewStatus(data.review_status ?? 'pending');
        }
        setLoading(false);
      });
  }, [id, isNew]);

  const handleSave = async () => {
    setSaving(true);

    const payload = {
      title,
      category,
      body,
      review_status: reviewStatus,
      published_at: reviewStatus === 'approved' ? new Date().toISOString() : null,
    };

    const { error } = isNew
      ? await supabase.from('educational_content').insert(payload)
      : await supabase.from('educational_content').update(payload).eq('id', id);

    setSaving(false);

    if (error) {
      alert(`Failed to save: ${error.message}`);
      return;
    }
    navigate('/articles');
  };

  const handleDelete = async () => {
    if (isNew || !confirm('Delete this article permanently?')) return;
    const { error } = await supabase.from('educational_content').delete().eq('id', id);
    if (error) {
      alert(`Failed to delete: ${error.message}`);
      return;
    }
    navigate('/articles');
  };

  if (loading) return <p>Loading…</p>;

  return (
    <div>
      <h1>{isNew ? 'New article' : 'Edit article'}</h1>
      <p className="hint">
        Keep the same tone as existing content: informational, never diagnostic, never a fabricated claim
        ("supports management" not "cures PCOS"). Approving this (setting status to Published) makes it
        visible in the app immediately and sends a push notification to users.
      </p>

      <label>Title</label>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />

      <label>Category</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>

      <label>Status</label>
      <select value={reviewStatus} onChange={(e) => setReviewStatus(e.target.value as 'pending' | 'approved')}>
        <option value="pending">Pending review (hidden from users)</option>
        <option value="approved">Published (visible + notifies users)</option>
      </select>

      <label>Body (Markdown)</label>
      <div className="editor-split">
        <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={20} />
        <div className="preview">
          <ReactMarkdown>{body || '*Preview will appear here*'}</ReactMarkdown>
        </div>
      </div>

      <div className="actions">
        <button onClick={handleSave} disabled={saving || !title.trim()}>{saving ? 'Saving…' : 'Save'}</button>
        {!isNew && <button className="danger" onClick={handleDelete}>Delete</button>}
      </div>
    </div>
  );
}
