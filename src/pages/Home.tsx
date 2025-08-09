import React, { useState, useEffect } from 'react';
import { db, type ConnectionMoment } from '../../db/partnerDB';

const Home: React.FC = () => {
  const [connections, setConnections] = useState<ConnectionMoment[]>([]);
  const [desc, setDesc] = useState('');

  const loadConnections = async () => {
    const data = await db.connections.orderBy('timestamp').reverse().limit(10).toArray();
    setConnections(data);
  };

  useEffect(() => {
    loadConnections();
  }, []);

  const addConnection = async () => {
    if (!desc.trim()) return;
    await db.connections.add({ timestamp: new Date().toISOString(), description: desc });
    setDesc('');
    loadConnections();
  };

  return (
    <div>
      <h1 className="text-xl mb-4">Attention Mirror</h1>
      <div className="mb-4">
        <input
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Describe your meaningful connection..."
          className="input-soft"
        />
        <button onClick={addConnection} className="button-soft mt-2">
          Log Connection
        </button>
      </div>
      <h2 className="text-lg mb-2">Last Connections</h2>
      <ul>
        {connections.map((c) => (
          <li key={c.id} className="mb-1">
            {new Date(c.timestamp).toLocaleString()} — {c.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
