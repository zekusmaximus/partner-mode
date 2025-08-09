# Deployment Instructions

## Local Development
```bash
npm install
npm run dev
```

## Build for Production
```bash
npm run build
npm run preview  # Test the production build locally
```

## Deploy to Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy!

## Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy!

## PWA Features
- Offline support via service worker
- App-like experience when installed
- Local data storage with IndexedDB
- Export functionality for data backup

## Privacy Notes
- All data stored locally (IndexedDB)
- No external API calls
- No user accounts or authentication
- Data export available anytime
