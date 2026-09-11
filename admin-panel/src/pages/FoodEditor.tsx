import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export function FoodEditor() {
  const { id } = useParams<{ id: string }>();
  const isNew = id === 'new';
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [category, setCategory] = useState<'explore' | 'limit'>('explore');
  const [description, setDescription] = useState('');
  const [glycemicNote, setGlycemicNote] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isNew) return;
    supabase
      .from('foods')
      .select('name, category, description, glycemic_note, tags')
      .eq('id', id)
      .single()
      .then(({ data }) => {
        if (data) {
          setName(data.name);
          setCategory(data.category);
          setDescription(data.description ?? '');
          setGlycemicNote(data.glycemic_note ?? '');
          setTags(Array.isArray(data.tags) ? data.tags.join(', ') : '');
        }
        setLoading(false);
      });
  }, [id, isNew]);

  const handleSave = async () => {
    setSaving(true);

    const payload = {
      name,
      category,
      description,
      glycemic_note: glycemicNote || null,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
    };

    const { error } = isNew
      ? await supabase.from('foods').insert(payload)
      : await supabase.from('foods').update(payload).eq('id', id);

    setSaving(false);

    if (error) {
      alert(`Failed to save: ${error.message}`);
      return;
    }
    navigate('/foods');
  };

  const handleDelete = async () => {
    if (isNew || !confirm('Delete this food permanently?')) return;
    const { error } = await supabase.from('foods').delete().eq('id', id);
    if (error) {
      alert(`Failed to delete: ${error.message}`);
      return;
    }
    navigate('/foods');
  };

  if (loading) return <p>Loading…</p>;

  return (
    <div>
      <h1>{isNew ? 'New food' : 'Edit food'}</h1>
      <p className="hint">
        Keep claims qualitative and honest — e.g. "lower glycemic impact than X", never precise fabricated
        numbers, never "cures" or "causes" language. Saving a new food notifies users immediately.
      </p>

      <label>Name</label>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Unripe plantain" />

      <label>Category</label>
      <select value={category} onChange={(e) => setCategory(e.target.value as 'explore' | 'limit')}>
        <option value="explore">Explore</option>
        <option value="limit">Limit</option>
      </select>

      <label>Description</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />

      <label>Glycemic note (optional)</label>
      <input value={glycemicNote} onChange={(e) => setGlycemicNote(e.target.value)} placeholder="Qualitative only, e.g. 'Lower glycemic impact than white rice'" />

      <label>Tags (comma-separated)</label>
      <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="fiber, swallow" />

      <div className="actions">
        <button onClick={handleSave} disabled={saving || !name.trim()}>{saving ? 'Saving…' : 'Save'}</button>
        {!isNew && <button className="danger" onClick={handleDelete}>Delete</button>}
      </div>
    </div>
  );
}
