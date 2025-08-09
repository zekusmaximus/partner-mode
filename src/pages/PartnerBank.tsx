import React, { useState, useEffect } from 'react';
import { db, GoodPartnerMoment } from '../db/partnerDB';

const PartnerBank: React.FC = () => {
  const [moments, setMoments] = useState<GoodPartnerMoment[]>([]);

  const partnerActions = [
    'I listened deeply',
    'I made her laugh',
    'I was patient',
    'I showed appreciation',
    'I offered support',
    'I was fully present',
    'I shared affection',
    'I helped without being asked'
  ];

  useEffect(() => {
    loadMoments();
  }, []);

  const loadMoments = async () => {
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const recentMoments = await db.partnerMoments
      .where('timestamp')
      .above(weekAgo.toISOString())
      .reverse()
      .toArray();
    setMoments(recentMoments);
  };

  const logMoment = async (label: string) => {
    await db.partnerMoments.add({
      timestamp: new Date().toISOString(),
      label
    });
    loadMoments();
  };

  const groupedByDay = moments.reduce((acc, moment) => {
    const date = new Date(moment.timestamp).toDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(moment);
    return acc;
  }, {} as Record<string, GoodPartnerMoment[]>);

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-serif text-beige">Good Partner Bank</h1>
        <p className="text-beige/70">Celebrating small acts of presence</p>
      </div>

      {/* Quick Actions */}
      <div className="card space-y-4">
        <p className="text-sm text-beige/60 text-center">Tap to celebrate a moment</p>
        <div className="grid grid-cols-2 gap-3">
          {partnerActions.map((action) => (
            <button
              key={action}
              onClick={() => logMoment(action)}
              className="button-soft bg-creative-purple/20 hover:bg-creative-purple/30 text-left p-3 transition-consciousness transform hover:scale-105"
            >
              <span className="text-beige/90">{action}</span>
            </button>
          ))}
        </div>
      </div>

      {/* This Week's Summary */}
      <div className="card bg-creative-purple/10 border-creative-purple/20">
        <div className="text-center space-y-2">
          <p className="text-lg font-serif text-creative-purple">This Week</p>
          <p className="text-3xl font-light text-beige">{moments.length}</p>
          <p className="text-sm text-beige/60">moments of presence</p>
        </div>
      </div>

      {/* Daily History */}
      {Object.keys(groupedByDay).length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-serif text-beige/90">Recent Days</h2>
          <div className="space-y-3">
            {Object.entries(groupedByDay)
              .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
              .map(([date, dayMoments]) => (
                <div key={date} className="card bg-slate-800/20 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-beige/60">
                      {new Date(date).toLocaleDateString()}
                    </span>
                    <span className="text-xs text-creative-purple">
                      {dayMoments.length} moment{dayMoments.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {dayMoments.map((moment, index) => (
                      <span
                        key={`${moment.id}-${index}`}
                        className="text-xs px-2 py-1 rounded-full bg-creative-purple/20 text-creative-purple"
                      >
                        {moment.label}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {moments.length === 0 && (
        <div className="card text-center text-beige/60">
          <p>No moments logged this week</p>
          <p className="text-sm mt-2">Tap an action above when you notice yourself being present</p>
        </div>
      )}
    </div>
  );
};

export default PartnerBank;
