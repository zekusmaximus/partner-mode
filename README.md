# Partner Mode

**Partner Mode** is a private, offline-first Progressive W## 📁 Project Structure

```
partner-mode/
├── src/
│   ├── components/         # Reusable UI components
│   ├── pages/              # Main application views
│   │   ├── Home.tsx        # Attention Mirror (connection tracking)
│   │   ├── Memory.tsx      # Daily prompted reflections
│   │   ├── Reflection.tsx  # Free-form journaling
│   │   ├── Intentions.tsx  # Weekly relationship goals
│   │   ├── PartnerBank.tsx # Quick affirmation logging
│   │   └── Settings.tsx    # Export & preferences
│   ├── db/                 # Database schema & access layer
│   │   └── partnerDB.ts    # Dexie IndexedDB configuration
│   ├── data/               # Static data & prompts
│   │   └── prompts.ts      # Daily reflection prompt pool
│   ├── styles/             # Styling & theme
│   │   └── global.css      # Tailwind + custom consciousness theme
│   ├── App.tsx             # Root component with navigation
│   └── main.tsx            # Application entry point
├── public/                 # Static assets
├── dist/                   # Production build (generated)
└── test/                   # Simple database tests
```

---

## 🎨 Design Philosophy

Partner Mode embodies the philosophy of **"a quiet room"**—minimal UI, soft animations, and language that invites presence rather than performance.

### Visual Theme
- **Colors**: Nexus dark (#0a0e27), legal blue, creative purple, synthesis gold
- **Typography**: Serif fonts (EB Garamond) for contemplative reading
- **Animations**: Smooth "consciousness" transitions with breath-like timing
- **Layout**: Mobile-first, card-based design optimized for touch

### Interaction Principles
- No alerts, reminders, or push notifications
- Gentle prompts that invite rather than demand
- Quick-tap interactions for in-the-moment logging
- Export-first data ownership

---

## 🔐 Privacy & Data

- **100% Local Storage**: All data stored in your browser's IndexedDB
- **No External Calls**: Zero network requests after initial app load
- **No Tracking**: No analytics, no user identification, no data collection
- **Full Export**: Download complete data as Markdown journal or JSON backup
- **No Accounts**: No sign-up, no passwords, no user profiles
- **Offline First**: Works completely offline after first visit

### Data Export Options
- **Markdown Journal**: Combined memory entries and reflections by date
- **JSON Backup**: Complete structured data for migration or backup
- **Human-Readable**: All exports in accessible, standard formats

---

## 🧪 Testing

Basic database functionality can be tested:

```bash
# Run the simple database test
npm run dev
# Then open browser console and check for "Database test passed!"
```

The app includes:
- IndexedDB schema validation
- CRUD operations for all data types
- Export functionality testing
- PWA offline capability verification

---

## 📱 PWA Features

When installed as a native app:
- **Offline Support**: Full functionality without internet after first load
- **Native Feel**: App-like experience with proper icons and splash screens
- **Background Sync**: Service worker handles caching and updates
- **Cross-Platform**: Works on iOS, Android, Windows, macOS, Linuxd for one user—Jeffrey A. Zyjeski—to support mindful attention and emotional presence in his marriage. It is not a tracker, gamified app, or calendar—it is a digital mirror for reflection, intention, and quiet awareness.

This app was built with privacy, elegance, and minimalism in mind. It stores all data locally, requires no sign-in, and avoids push notifications or behavioral nudges.

---

## 🔧 Features

- **Attention Mirror**: Track when you last meaningfully connected with your partner (entirely self-logged)
- **Memory Loop**: Daily prompt-based reflection journal with rotating thoughtful prompts
- **Intention Shelf**: Weekly relationship goals that auto-reset every 7 days
- **Good Partner Bank**: Quick-tap affirmations to log small acts of presence and mindfulness
- **Quiet Reflection Space**: Daily journaling with optional emotion tagging and mood tracking
- **Data Export**: Download your complete data as Markdown journal or JSON backup anytime, fully offline
- **Motion Settings**: Accessibility support with reduced motion toggle for sensitive users
- **PWA Ready**: Install as native app on mobile/desktop with offline functionality

---

## 🧱 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS with custom consciousness-focused theme
- **Database**: Dexie.js (IndexedDB) for local storage
- **PWA**: Service worker, offline support, installable
- **Build**: Optimized Vite build with PWA plugin

No backend. No user accounts. No third-party data collection. No external API calls.

---

## 💻 Quick Start

```bash
# Clone the repository
git clone https://github.com/zekusmaximus/partner-mode.git
cd partner-mode

# Install dependencies
npm install

# Start development server
npm run dev
# ➜ Local: http://localhost:5173/

# Build for production
npm run build

# Preview production build
npm run preview
# ➜ Local: http://localhost:4173/
```

---

## 🚀 Deployment

### Netlify
1. Connect your GitHub repository to Netlify
2. **Build command**: `npm run build`
3. **Publish directory**: `dist`
4. Deploy!

### Vercel
1. Connect your GitHub repository to Vercel
2. **Framework preset**: Vite
3. **Build command**: `npm run build`
4. **Output directory**: `dist`
5. Deploy!

The app works offline after the first load and can be installed as a native app on mobile and desktop.

⸻

📁 Structure

```
src/
├── components/         # UI components
├── pages/              # Views
├── db/                 # Dexie schema & data access
├── data/               # Prompt pool, constants
├── styles/             # Tailwind & global CSS
└── App.tsx             # Root component
```

⸻

🔐 Privacy
  • All data stored locally (IndexedDB).
  • No external calls (except optional audio files you host yourself).
  • Export to Markdown/JSON at any time.

## ✨ Designed For

**Jeffrey A. Zyjeski** — attorney, author, contemplative technologist.

*A calm space for presence, not productivity.*

---

## 📄 License

This project is built for personal use. Feel free to adapt the concepts for your own mindful practice.

---

## 🤝 Contributing

This is a personal contemplative tool, but if you find inspiration in the approach, feel free to fork and adapt for your own relationship practices.

---

**Partner Mode** • *Version 0.1.0* • *Built with mindful presence*
