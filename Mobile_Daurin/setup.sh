#!/bin/bash

# Daurin Backend + Frontend Setup Script

echo "🚀 Daurin Backend Integration Setup"
echo "===================================="
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
  echo "❌ Node.js is not installed. Please install Node.js first."
  exit 1
fi

echo "✅ Node.js is installed"
echo "   Version: $(node --version)"
echo ""

# Backend Setup
echo "📦 Setting up Backend..."
cd backend

if [ ! -d node_modules ]; then
  echo "   Installing dependencies..."
  npm install
  if [ $? -ne 0 ]; then
    echo "❌ Backend npm install failed"
    exit 1
  fi
fi

# Check if .env exists
if [ ! -f .env ]; then
  echo "   Creating .env from .env.example..."
  cp .env.example .env
fi

echo "✅ Backend ready"
echo ""

# Frontend Setup
echo "📱 Setting up Frontend (daurin-app)..."
cd ../daurin-app

if [ ! -d node_modules ]; then
  echo "   Installing dependencies..."
  npm install
  if [ $? -ne 0 ]; then
    echo "❌ Frontend npm install failed"
    exit 1
  fi
fi

# Check if .env exists
if [ ! -f .env ]; then
  echo "   Creating .env..."
  cat > .env << EOF
REACT_APP_API_URL=http://127.0.0.1:3001
REACT_APP_ENV=development
EOF
fi

echo "✅ Frontend ready"
echo ""

# Return to root
cd ../..

echo "✨ Setup Complete!"
echo ""
echo "Next steps:"
echo ""
echo "  1. Start the Backend:"
echo "     cd backend && npm run dev"
echo ""
echo "  2. Start the Frontend (new terminal):"
echo "     cd daurin-app && npm start"
echo ""
echo "  3. Access the app:"
echo "     Frontend: http://127.0.0.1:19006 (expo web)"
echo "     Backend:  http://127.0.0.1:3001 (API)"
