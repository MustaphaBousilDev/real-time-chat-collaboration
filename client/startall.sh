#!/bin/bash

echo "🚀 Starting Angular Microfrontend Applications"
echo "=============================================="
echo ""
echo "📝 Instructions:"
echo "1. This will start BOTH applications"
echo "2. Remote will start on port 4201"
echo "3. Host will start on port 4200"
echo "4. Wait for both to compile before testing"
echo ""
echo "⚠️  Important: Keep this terminal open while developing"
echo ""
echo "=============================================="
echo ""

# Start remote in background
echo "🔵 Starting Remote Application (Port 4201)..."
cd /home/claude/mfe-remote && npm start &
REMOTE_PID=$!

# Wait a bit for remote to initialize
sleep 5

# Start host in background
echo "🟢 Starting Host Application (Port 4200)..."
cd /home/claude/mfe-host && npm start &
HOST_PID=$!

echo ""
echo "✅ Both applications are starting!"
echo ""
echo "📌 URLs:"
echo "   Host:   http://localhost:4200"
echo "   Remote: http://localhost:4201"
echo ""
echo "🛑 To stop both applications, press Ctrl+C"
echo ""

# Wait for both processes
wait $REMOTE_PID $HOST_PID