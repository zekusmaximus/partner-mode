import React, { useState, useEffect } from 'react';
import { db, Reflection as ReflectionEntry } from '../db/partnerDB';

const Reflection: React.FC = () => {
  const [entries, setEntries] = useState<ReflectionEntry[]>([]);
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    const allEntries = await db.reflections.orderBy('date').reverse().toArray();
    setEntries(allEntries);
    
    const todayEntry = allEntries.find(entry => entry.date === today);
    if (todayEntry) {
      setContent(todayEntry.content);
      setMood(todayEntry.mood || '');
      setEditingId(todayEntry.id!);
    }
  };

  const saveEntry = async () => {
    if (!content.trim()) return;
    
    if (editingId) {
      await db.reflections.update(editingId, { 
        content: content.trim(), 
        mood: mood || undefined 
      });
    } else {
      await db.reflections.add({
        date: today,
        content: content.trim(),
        mood: mood || undefined
      });
    }
    
    setContent('');
    setMood('');
    setEditingId(null);
    loadEntries();
  };

  const startNewEntry = () => {
    setContent('');
    setMood('');
    setEditingId(null);
  };

  const moodOptions = ['peaceful', 'grateful', 'connected', 'challenged', 'hopeful', 'reflective'];

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-serif text-beige">Quiet Reflection</h1>
        <p className="text-beige/70">A space for daily contemplation</p>
      </div>

      {/* Writing Space */}
      <div className="card space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-beige/60">
            {editingId ? 'Editing today\'s reflection' : 'Today\'s reflection'}
          </p>
          {editingId && (
            <button
              onClick={startNewEntry}
              className="text-sm text-beige/60 hover:text-beige transition-consciousness"
            >
              Start new
            </button>
          )}
        </div>
        
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your heart today?"
          className="input-soft h-32 resize-none"
        />
        
        <div className="space-y-2">
          <p className="text-sm text-beige/60">Mood (optional):</p>
          <div className="flex flex-wrap gap-2">
            {moodOptions.map((moodOption) => (
              <button
                key={moodOption}
                onClick={() => setMood(mood === moodOption ? '' : moodOption)}
                className={`px-3 py-1 rounded-full text-sm border transition-consciousness ${
                  mood === moodOption
                    ? 'bg-seafoam/30 border-seafoam text-beige'
                    : 'border-white/20 text-beige/70 hover:border-white/40'
                }`}
              >
                {moodOption}
              </button>
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <button
            onClick={saveEntry}
            className="button-soft bg-seafoam/30 hover:bg-seafoam/40 transition-consciousness"
            disabled={!content.trim()}
          >
            {editingId ? 'Update Reflection' : 'Save Reflection'}
          </button>
        </div>
      </div>

      {/* Past Reflections */}
      {entries.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-serif text-beige/90">Past Reflections</h2>
          <div className="space-y-3">
            {entries.map((entry) => (
              <div key={entry.id} className="card bg-slate-800/20 space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-xs text-beige/50">
                    {new Date(entry.date).toLocaleDateString()}
                  </span>
                  {entry.mood && (
                    <span className="text-xs px-2 py-1 rounded-full bg-seafoam/20 text-seafoam">
                      {entry.mood}
                    </span>
                  )}
                </div>
                <p className="text-beige/90 whitespace-pre-wrap">{entry.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Reflection;
