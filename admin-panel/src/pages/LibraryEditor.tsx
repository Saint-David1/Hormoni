import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface ExternalLink {
  label: string;
  url: string;
}

function parseLinks(text: string): ExternalLink[] {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, url] = line.split('|').map((s) => s.trim());
      return { label: label || url, url: url || label };
    })
    .filter((l) => l.url);
}

function formatLinks(links: ExternalLink[]): string {
  return links.map((l) => `${l.label} | ${l.url}`).join('\n');
}

export function LibraryEditor() {
  const { id } = useParams<{ id: string }>();
  const isNew = id === 'new';
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [summary, setSummary] = useState('');
  const [tags, setTags] = useState('');
  const [linksText, setLinksText] = useState('');
  const [reviewStatus, setReviewStatus] = useState<'pending' | 'approved'>('pending');
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isNew) return;
    supabase
      .from('knowledge_base_entries')
      .select('title, category, summary, tags, external_links, review_status')
      .eq('id', id)
      .single()
      .then(({ data }) => {
        if (data) {
          setTitle(data.title);
          setCategory(data.category);
          setSummary(data.summary);
          setTags(Array.isArray(data.tags) ? data.tags.join(', ') : '');
          setLinksText(formatLinks(data.external_links ?? []));
          setReviewStatus(data.review_status);
        }
        setLoading(false);
      });
  }, [id, isNew]);

  const handleSave = async () => {
    setSaving(true);

    const payload = {
      title,
      category,
      summary,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      external_links: parseLinks(linksText),
      review_status: reviewStatus,
    };

    const { error } = isNew
      ? await supabase.from('knowledge_base_entries').insert(payload)
      : await supabase.from('knowledge_base_entries').update(payload).eq('id', id);

    setSaving(false);

    if (error) {
      alert(`Failed to save: ${error.message}`);
      return;
    }
    navigate('/library');
  };

  const handleDelete = async () => {
    if (isNew || !confirm('Delete this entry permanently?')) return;
    const { error } = await supabase.from('knowledge_base_entries').delete().eq('id', id);
    if (error) {
      alert(`Failed to delete: ${error.message}`);
      return;
    }
    navigate('/library');
  };

  if (loading) return <p>Loading…</p>;

  return (
    <div>
      <h1>{isNew ? 'New library entry' : 'Edit library entry'}</h1>
      <p className="hint">
        Keep the summary brief and factual — this is a quick-reference lookup, not an article. Link out to credible
        sources (health orgs, medical institutions) for anything that needs more depth.
      </p>

      <label>Title</label>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Ovulation" />

      <label>Category</label>
      <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. Cycle Basics" />

      <label>Summary</label>
      <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={5} />

      <label>Tags (comma-separated)</label>
      <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="ovulation, fertility, cycle" />

      <label>External links (one per line: Label | https://url)</label>
      <textarea
        value={linksText}
        onChange={(e) => setLinksText(e.target.value)}
        rows={4}
        placeholder={'Mayo Clinic — Ovulation | https://mayoclinic.org/...'}
      />

      <label>Status</label>
      <select value={reviewStatus} onChange={(e) => setReviewStatus(e.target.value as 'pending' | 'approved')}>
        <option value="pending">Pending (hidden from app)</option>
        <option value="approved">Approved (visible in app)</option>
      </select>

      <div className="actions">
        <button onClick={handleSave} disabled={saving || !title.trim() || !summary.trim()}>
          {saving ? 'Saving…' : 'Save'}
        </button>
        {!isNew && <button className="danger" onClick={handleDelete}>Delete</button>}
      </div>
    </div>
  );
}
