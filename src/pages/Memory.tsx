import React, { useState, useEffect } from 'react';
import { memoryPrompts } from '../../data/prompts';
import { db } from '../../db/partnerDB';

interface MemoryEntry {
  id?: number;
  date: string;
  prompt: string;
  response: string;
}

const Memory: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [entries, setEntries] = useState<MemoryEntry[]>([]);

  useEffect(() => {
    const random = memoryPrompts[Math.floor(Math.random() * memoryPrompts.length)];
    setPrompt(random);
    db.memory.orderBy('date').reverse().toArray().then((data) => setEntries(data));
  }, []);

  const addEntry = async () => {
    if (!response.trim()) return;
    await db.memory.add({
      date: new Date().toISOString(),
      prompt,
      response,
    });
    setResponse('');
    const all = await db.memory.orderBy('date').reverse().toArray();
    setEntries(all);
  };

  return (
    <div>
      <h1 className="text-xl mb-4">Memory Loop</h1>
      <p className="mb-2">{prompt}</p>
      <textarea
        value={response}
        onChange={(e) => setResponse(e.target.value)}
        className="input-soft h-24"
      />
      <button onClick={addEntry} className="button-soft mt-2">
        Save Entry
      </button>
      <h2 className="text-lg mt-4">Past Entries</h2>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id} className="mb-2">
            <strong>{new Date(entry.date).toLocaleDateString()}:</strong> {entry.response}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Memory;
