import React, { useState, useEffect } from 'react';
import { db, ConnectionMoment } from '../db/partnerDB';

const Home: React.FC = () => {
  const [connections, setConnections] = useState<ConnectionMoment[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newConnection, setNewConnection] = useState('');

  useEffect(() => {
    loadConnections();
  }, []);

  const loadConnections = async () => {
    const allConnections = await db.connections.orderBy('timestamp').reverse().limit(10).toArray();
    setConnections(allConnections);
  };

  const addConnection = async () => {
    if (!newConnection.trim()) return;
    
    await db.connections.add({
      timestamp: new Date().toISOString(),
      description: newConnection.trim()
    });
    
    setNewConnection('');
    setShowModal(false);
    loadConnections();
  };

  const lastConnection = connections[0];
  const daysSince = lastConnection 
    ? Math.floor((Date.now() - new Date(lastConnection.timestamp).getTime()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-serif text-beige">Attention Mirror</h1>
        <p className="text-beige/70">A gentle reflection of connection</p>
      </div>

      {/* Last Connection Card */}
      <div className="card text-center space-y-4">
        {lastConnection ? (
          <>
            <div className="text-4xl font-light text-synthesis-gold">
              {daysSince === 0 ? 'Today' : daysSince === 1 ? '1 day ago' : `${daysSince} days ago`}
            </div>
            <p className="text-beige/80 italic">"{lastConnection.description}"</p>
            <p className="text-sm text-beige/60">
              {new Date(lastConnection.timestamp).toLocaleDateString()}
            </p>
          </>
        ) : (
          <div className="text-beige/70">
            <p className="text-lg">No connections logged yet</p>
            <p className="text-sm">Begin your journey of mindful presence</p>
          </div>
        )}
      </div>

      {/* Log Connection Button */}
      <div className="text-center">
        <button
          onClick={() => setShowModal(true)}
          className="button-soft bg-legal-blue/30 hover:bg-legal-blue/40 transition-consciousness"
        >
          Log a Connection
        </button>
      </div>

      {/* Recent Connections */}
      {connections.length > 1 && (
        <div className="space-y-3">
          <h2 className="text-lg font-serif text-beige/90">Recent Moments</h2>
          <div className="space-y-2">
            {connections.slice(1, 6).map((connection) => (
              <div key={connection.id} className="card bg-slate-800/20 p-3">
                <p className="text-sm text-beige/90">{connection.description}</p>
                <p className="text-xs text-beige/50 mt-1">
                  {new Date(connection.timestamp).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="card bg-nexus-dark border-2 border-white/20 max-w-md w-full space-y-4">
            <h3 className="text-xl font-serif text-beige">Log a Connection</h3>
            <textarea
              value={newConnection}
              onChange={(e) => setNewConnection(e.target.value)}
              placeholder="Describe this moment of connection..."
              className="input-soft h-24 resize-none"
              autoFocus
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="button-soft"
              >
                Cancel
              </button>
              <button
                onClick={addConnection}
                className="button-soft bg-legal-blue/30 hover:bg-legal-blue/40"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
