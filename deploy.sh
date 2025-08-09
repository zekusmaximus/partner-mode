#!/bin/bash
# Quick deployment script for Partner Mode

echo "🚀 Partner Mode Deployment Script"
echo "================================="

echo "📦 Installing dependencies..."
npm install

echo "🧪 Testing build..."
npm run build

echo "👀 Starting preview server..."
npm run preview

echo "✅ Partner Mode is ready for deployment!"
echo ""
echo "📋 Next Steps:"
echo "1. Push to GitHub repository"
echo "2. Connect to Netlify or Vercel"
echo "3. Set build command: npm run build"
echo "4. Set publish directory: dist"
echo "5. Deploy!"
echo ""
echo "🔗 Preview: http://localhost:4173"
echo "💾 All data stored locally with IndexedDB"
echo "🔒 Privacy-first: No external calls or tracking"
