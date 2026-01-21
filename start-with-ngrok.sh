#!/bin/bash

# Start the server in background
echo "Starting Claude API Proxy..."
node server.js &
SERVER_PID=$!

# Wait for server to start
sleep 2

# Check if ngrok is installed
if ! command -v ngrok &> /dev/null; then
    echo "ngrok not found. Install it with: brew install ngrok"
    echo "Or download from: https://ngrok.com/download"
    echo ""
    echo "Server is running locally at http://localhost:${PORT:-3456}"
    wait $SERVER_PID
    exit 0
fi

# Start ngrok
echo "Starting ngrok tunnel..."
ngrok http ${PORT:-3456}

# Cleanup on exit
trap "kill $SERVER_PID 2>/dev/null" EXIT
