# Partner Mode

**Partner Mode** is a private, offline-first Progressive Web App (PWA) designed for one user—Jeffrey A. Zyjeski—to support mindful attention and emotional presence in his marriage. It is not a tracker, gamified app, or calendar—it is a digital mirror for reflection, intention, and quiet awareness.

This app was built with privacy, elegance, and minimalism in mind. It stores all data locally, requires no sign-in, and avoids push notifications or behavioral nudges.

---

## 🔧 Features

- **Attention Mirror**: Track when you last meaningfully connected with your partner (entirely self-logged)
- **Memory Loop**: Daily prompt-based reflection journal
- **Intention Shelf**: Weekly relationship goals that auto-reset
- **Good Partner Bank**: Quick-tap affirmations to log small acts of presence
- **Quiet Reflection Space**: Daily journaling with optional emotion tagging
- **Markdown/JSON Export**: Download your data anytime, fully offline

---

## 🧱 Tech Stack

- React 18, TypeScript, Vite
- Tailwind CSS
- Dexie.js (IndexedDB) for local storage

No backend. No user accounts. No third-party data collection.

---

## 💻 Setup

```bash
git clone https://github.com/your-username/partner-mode.git
cd partner-mode
npm install
npm run dev
npm run build
npm run preview
```

Deploy to Netlify or Vercel with defaults (static app).

⸻

📁 Structure

src/
├── components/         # UI components
├── pages/              # Views
├── db/                 # Dexie schema & data access
├── data/               # Prompt pool, constants
├── styles/             # Tailwind & global CSS
└── App.tsx             # Root component


⸻

🔐 Privacy
	•	All data stored locally (IndexedDB).
	•	No external calls (except optional audio files you host yourself).
	•	Export to Markdown/JSON at any time.

⸻

✨ Designed For

Jeffrey A. Zyjeski — attorney, author, contemplative technologist.
A calm space for presence, not productivity.
