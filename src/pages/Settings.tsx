import React, { useState } from 'react';
import { db } from '../db/partnerDB';

const Settings: React.FC = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(
    localStorage.getItem('reduceMotion') === 'true'
  );

  const toggleMotion = () => {
    const newValue = !reduceMotion;
    setReduceMotion(newValue);
    localStorage.setItem('reduceMotion', newValue.toString());
    
    // Apply/remove motion reduction class to body
    if (newValue) {
      document.body.classList.add('reduce-motion');
    } else {
      document.body.classList.remove('reduce-motion');
    }
  };

  const exportToJSON = async () => {
    setIsExporting(true);
    
    try {
      const data = {
        memory: await db.memory.toArray(),
        intentions: await db.intentions.toArray(),
        reflections: await db.reflections.toArray(),
        partnerMoments: await db.partnerMoments.toArray(),
        connections: await db.connections.toArray(),
        exportedAt: new Date().toISOString()
      };
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `partner-mode-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const exportToMarkdown = async () => {
    setIsExporting(true);
    
    try {
      const memory = await db.memory.orderBy('date').toArray();
      const reflections = await db.reflections.orderBy('date').toArray();
      const connections = await db.connections.orderBy('timestamp').toArray();
      const intentions = await db.intentions.orderBy('created').toArray();
      const moments = await db.partnerMoments.orderBy('timestamp').toArray();
      
      let markdown = `# Partner Mode Export\n\n`;
      markdown += `Exported on ${new Date().toLocaleDateString()}\n\n`;
      
      // Group by date for journal-style export
      const allEntries = [
        ...memory.map(m => ({ date: m.date, type: 'memory', ...m })),
        ...reflections.map(r => ({ date: r.date, type: 'reflection', ...r }))
      ].sort((a, b) => b.date.localeCompare(a.date));
      
      if (allEntries.length > 0) {
        markdown += `## Journal Entries\n\n`;
        
        let currentDate = '';
        for (const entry of allEntries) {
          if (entry.date !== currentDate) {
            currentDate = entry.date;
            markdown += `### ${new Date(entry.date).toLocaleDateString()}\n\n`;
          }
          
          if (entry.type === 'memory') {
            markdown += `**Memory Prompt:** *${entry.prompt}*\n\n`;
            markdown += `${entry.response}\n\n`;
          } else if (entry.type === 'reflection') {
            markdown += `**Reflection**`;
            if (entry.mood) markdown += ` (${entry.mood})`;
            markdown += `\n\n${entry.content}\n\n`;
          }
          
          markdown += `---\n\n`;
        }
      }
      
      if (connections.length > 0) {
        markdown += `## Connection Moments\n\n`;
        connections.reverse().forEach(conn => {
          markdown += `- **${new Date(conn.timestamp).toLocaleDateString()}**: ${conn.description}\n`;
        });
        markdown += `\n`;
      }
      
      if (intentions.length > 0) {
        markdown += `## Intentions\n\n`;
        intentions.forEach(intention => {
          markdown += `- ${intention.description}`;
          if (intention.completed) {
            markdown += ` ✓ (completed ${new Date(intention.completed).toLocaleDateString()})`;
          }
          markdown += `\n`;
        });
        markdown += `\n`;
      }
      
      if (moments.length > 0) {
        markdown += `## Good Partner Moments\n\n`;
        const momentsByDate = moments.reduce((acc, moment) => {
          const date = new Date(moment.timestamp).toDateString();
          if (!acc[date]) acc[date] = [];
          acc[date].push(moment);
          return acc;
        }, {} as Record<string, typeof moments>);
        
        Object.entries(momentsByDate)
          .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
          .forEach(([date, dayMoments]) => {
            markdown += `**${new Date(date).toLocaleDateString()}**\n`;
            dayMoments.forEach(moment => {
              markdown += `- ${moment.label}\n`;
            });
            markdown += `\n`;
          });
      }
      
      const blob = new Blob([markdown], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `partner-mode-journal-${new Date().toISOString().split('T')[0]}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-serif text-beige">Settings</h1>
        <p className="text-beige/70">Privacy and preferences</p>
      </div>

      {/* Motion Settings */}
      <div className="card space-y-4">
        <h2 className="text-lg font-serif text-beige/90">Accessibility</h2>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-beige/90">Reduce motion</p>
            <p className="text-sm text-beige/60">Minimize animations and transitions</p>
          </div>
          <button
            onClick={toggleMotion}
            className={`w-12 h-6 rounded-full transition-consciousness ${
              reduceMotion ? 'bg-seafoam' : 'bg-slate-600'
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full transition-consciousness transform ${
                reduceMotion ? 'translate-x-6' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Export Data */}
      <div className="card space-y-4">
        <h2 className="text-lg font-serif text-beige/90">Export Data</h2>
        <p className="text-sm text-beige/60">
          Download your data for backup or migration. All data remains private and local.
        </p>
        
        <div className="space-y-3">
          <button
            onClick={exportToMarkdown}
            disabled={isExporting}
            className="w-full button-soft bg-synthesis-gold/30 hover:bg-synthesis-gold/40 transition-consciousness"
          >
            {isExporting ? 'Exporting...' : 'Export as Markdown Journal'}
          </button>
          
          <button
            onClick={exportToJSON}
            disabled={isExporting}
            className="w-full button-soft bg-legal-blue/30 hover:bg-legal-blue/40 transition-consciousness"
          >
            {isExporting ? 'Exporting...' : 'Export as JSON (Full Data)'}
          </button>
        </div>
      </div>

      {/* Privacy Info */}
      <div className="card bg-seafoam/10 border-seafoam/20 space-y-2">
        <h3 className="font-serif text-seafoam">Privacy Note</h3>
        <p className="text-sm text-beige/80">
          All your data is stored locally on this device. Partner Mode makes no external calls 
          and requires no account. Your reflections remain completely private.
        </p>
      </div>

      {/* App Info */}
      <div className="card bg-slate-800/20 text-center space-y-2">
        <p className="text-sm text-beige/60">Partner Mode</p>
        <p className="text-xs text-beige/50">
          Designed for Jeffrey A. Zyjeski • Built with mindful presence
        </p>
      </div>
    </div>
  );
};

export default Settings;
