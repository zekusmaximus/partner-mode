import React, { useState, useEffect } from 'react';
import { db, MemoryEntry } from '../db/partnerDB';
import { memoryPrompts } from '../data/prompts';

const Memory: React.FC = () => {
  const [entries, setEntries] = useState<MemoryEntry[]>([]);
  const [todayEntry, setTodayEntry] = useState<MemoryEntry | null>(null);
  const [response, setResponse] = useState('');

  const today = new Date().toISOString().split('T')[0];
  const todayPrompt = memoryPrompts[new Date().getDate() % memoryPrompts.length];

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    const allEntries = await db.memory.orderBy('date').reverse().toArray();
    setEntries(allEntries);
    
    const existingToday = allEntries.find(entry => entry.date === today);
    if (existingToday) {
      setTodayEntry(existingToday);
      setResponse(existingToday.response);
    }
  };

  const saveEntry = async () => {
    if (!response.trim()) return;
    
    if (todayEntry) {
      await db.memory.update(todayEntry.id!, { response: response.trim() });
    } else {
      await db.memory.add({
        date: today,
        prompt: todayPrompt,
        response: response.trim()
      });
    }
    
    loadEntries();
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-serif text-beige">Memory Loop</h1>
        <p className="text-beige/70">Daily reflections on connection</p>
      </div>

      {/* Today's Prompt */}
      <div className="card space-y-4">
        <div className="text-center">
          <p className="text-sm text-beige/60 mb-2">Today's Reflection</p>
          <p className="text-lg font-serif text-synthesis-gold italic">
            "{todayPrompt}"
          </p>
        </div>
        
        <textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="Take a moment to reflect..."
          className="input-soft h-32 resize-none"
        />
        
        <div className="text-center">
          <button
            onClick={saveEntry}
            className="button-soft bg-creative-purple/30 hover:bg-creative-purple/40 transition-consciousness"
            disabled={!response.trim()}
          >
            {todayEntry ? 'Update Reflection' : 'Save Reflection'}
          </button>
        </div>
      </div>

      {/* Past Entries */}
      {entries.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-serif text-beige/90">Past Reflections</h2>
          <div className="space-y-3">
            {entries.map((entry) => (
              <div key={entry.id} className="card bg-slate-800/20 space-y-2">
                <div className="flex justify-between items-start">
                  <p className="text-sm text-synthesis-gold italic">
                    "{entry.prompt}"
                  </p>
                  <span className="text-xs text-beige/50 ml-2">
                    {new Date(entry.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-beige/90">{entry.response}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Memory;
