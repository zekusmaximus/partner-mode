import React, { useState, useEffect } from 'react';
import { db, Intention } from '../db/partnerDB';

const Intentions: React.FC = () => {
  const [intentions, setIntentions] = useState<Intention[]>([]);
  const [newIntention, setNewIntention] = useState('');

  useEffect(() => {
    loadIntentions();
  }, []);

  const loadIntentions = async () => {
    const allIntentions = await db.intentions.orderBy('created').reverse().toArray();
    
    // Filter to show only intentions from the last 7 days
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const recentIntentions = allIntentions.filter(intention => 
      intention.created > weekAgo
    );
    
    setIntentions(recentIntentions);
  };

  const addIntention = async () => {
    if (!newIntention.trim()) return;
    
    await db.intentions.add({
      description: newIntention.trim(),
      created: new Date().toISOString()
    });
    
    setNewIntention('');
    loadIntentions();
  };

  const completeIntention = async (id: number) => {
    await db.intentions.update(id, { 
      completed: new Date().toISOString() 
    });
    loadIntentions();
  };

  const deleteIntention = async (id: number) => {
    await db.intentions.delete(id);
    loadIntentions();
  };

  const activeIntentions = intentions.filter(i => !i.completed);
  const completedIntentions = intentions.filter(i => i.completed);

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-serif text-beige">Intention Shelf</h1>
        <p className="text-beige/70">Weekly relationship goals that guide presence</p>
      </div>

      {/* Add New Intention */}
      <div className="card space-y-4">
        <p className="text-sm text-beige/60">Set a gentle intention for this week</p>
        <div className="flex gap-2">
          <input
            value={newIntention}
            onChange={(e) => setNewIntention(e.target.value)}
            placeholder="I intend to..."
            className="input-soft flex-1"
            onKeyPress={(e) => e.key === 'Enter' && addIntention()}
          />
          <button
            onClick={addIntention}
            className="button-soft bg-synthesis-gold/30 hover:bg-synthesis-gold/40 transition-consciousness"
            disabled={!newIntention.trim()}
          >
            Add
          </button>
        </div>
      </div>

      {/* Active Intentions */}
      {activeIntentions.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-serif text-beige/90">This Week's Intentions</h2>
          <div className="space-y-3">
            {activeIntentions.map((intention) => {
              const daysSince = Math.floor(
                (Date.now() - new Date(intention.created).getTime()) / (1000 * 60 * 60 * 24)
              );
              
              return (
                <div key={intention.id} className="card bg-slate-800/20 flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <p className="text-beige/90">{intention.description}</p>
                    <p className="text-xs text-beige/50 mt-1">
                      Set {daysSince === 0 ? 'today' : `${daysSince} days ago`}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => completeIntention(intention.id!)}
                      className="text-xs px-3 py-1 rounded-full bg-seafoam/30 text-seafoam hover:bg-seafoam/40 transition-consciousness"
                    >
                      Complete
                    </button>
                    <button
                      onClick={() => deleteIntention(intention.id!)}
                      className="text-xs px-3 py-1 rounded-full bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-consciousness"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Completed Intentions */}
      {completedIntentions.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-serif text-beige/90">Completed This Week</h2>
          <div className="space-y-2">
            {completedIntentions.map((intention) => (
              <div key={intention.id} className="card bg-seafoam/10 border-seafoam/20">
                <div className="flex justify-between items-start">
                  <p className="text-beige/70 line-through">{intention.description}</p>
                  <span className="text-xs text-seafoam ml-2">
                    ✓ {new Date(intention.completed!).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {intentions.length === 0 && (
        <div className="card text-center text-beige/60">
          <p>No intentions set for this week</p>
          <p className="text-sm mt-2">Begin by setting a gentle intention above</p>
        </div>
      )}
    </div>
  );
};

export default Intentions;
