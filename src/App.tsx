import React, { useState } from 'react';
import Home from './pages/Home';
import Memory from './pages/Memory';
import Reflection from './pages/Reflection';
import Intentions from './pages/Intentions';
import PartnerBank from './pages/PartnerBank';
import Settings from './pages/Settings';

interface Tab {
  id: string;
  label: string;
}

const tabs: Tab[] = [
  { id: 'Home', label: 'Home' },
  { id: 'Memory', label: 'Memory' },
  { id: 'Reflection', label: 'Reflection' },
  { id: 'Intentions', label: 'Intentions' },
  { id: 'PartnerBank', label: 'Partner Bank' },
  { id: 'Settings', label: 'Settings' },
];

const App: React.FC = () => {
  const [current, setCurrent] = useState<string>('Home');

  const renderPage = () => {
    switch (current) {
      case 'Memory':
        return <Memory />;
      case 'Reflection':
        return <Reflection />;
      case 'Intentions':
        return <Intentions />;
      case 'PartnerBank':
        return <PartnerBank />;
      case 'Settings':
        return <Settings />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="flex flex-wrap justify-around bg-slate-900 text-beige p-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`button-soft ${current === tab.id ? 'bg-slate-700' : ''}`}
            onClick={() => setCurrent(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      <main className="flex-1 p-4 overflow-y-auto">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;
