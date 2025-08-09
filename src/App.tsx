import React, { useState, useMemo } from 'react';
import Home from './pages/Home';
import Memory from './pages/Memory';
import Reflection from './pages/Reflection';
import Intentions from './pages/Intentions';
import PartnerBank from './pages/PartnerBank';
import Settings from './pages/Settings';

type TabId = 'Home' | 'Memory' | 'Reflection' | 'Intentions' | 'Partner Bank' | 'Settings';

const tabs: TabId[] = ['Home','Memory','Reflection','Intentions','Partner Bank','Settings'];

export default function App() {
  const [current, setCurrent] = useState<TabId>('Home');

  const Page = useMemo(() => {
    switch (current) {
      case 'Memory': return <Memory />;
      case 'Reflection': return <Reflection />;
      case 'Intentions': return <Intentions />;
      case 'Partner Bank': return <PartnerBank />;
      case 'Settings': return <Settings />;
      default: return <Home />;
    }
  }, [current]);

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="flex flex-wrap gap-2 p-3 bg-slate-900/60 border-b border-white/10 sticky top-0">
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => setCurrent(t)}
            className={`button-soft ${current === t ? 'bg-slate-700/70' : ''}`}
            aria-current={current === t ? 'page' : undefined}
          >
            {t}
          </button>
        ))}
      </nav>
      <main className="flex-1 p-4 overflow-y-auto transition-consciousness">
        {Page}
      </main>
    </div>
  );
}
