# Conduit

A lightweight proxy server that exposes your Claude Code subscription as an HTTP API.

**Use your Claude Pro/Max subscription instead of paying for API calls.**

## Prerequisites

- [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code) installed and logged in
- Node.js 18+

## Quick Start

```bash
# Clone
git clone https://github.com/yourusername/claude-code-proxy.git
cd claude-code-proxy

# Install
npm install

# Run
npm start
```

Server runs at `http://localhost:3456`

## Usage

```bash
curl -X POST http://localhost:3456/chat \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Hello!", "model": "sonnet"}'
```

### Response

```json
{
  "response": "Hi! How can I help you today?",
  "model": "claude-sonnet-4-5-20250929",
  "usage": { ... },
  "cost_usd": 0.003
}
```

## API

### `POST /chat`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `prompt` | string | Yes | Your message |
| `model` | string | No | `haiku`, `sonnet`, or `opus` (default: your Claude Code default) |
| `system` | string | No | System prompt |

### `GET /health`

Health check endpoint.

## Expose Publicly (ngrok)

```bash
# Set up ngrok (one-time)
ngrok config add-authtoken YOUR_TOKEN

# Run with tunnel
npm run tunnel
```

## Configuration

Create `.env` file:

```env
PORT=3456
PROXY_API_KEY=your-secret-key  # Optional: protect your proxy
```

## Security

- Only run this on your local machine
- Use `PROXY_API_KEY` if exposing via ngrok
- Never share your ngrok URL publicly

## License

MIT
