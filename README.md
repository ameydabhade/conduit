# Conduit

Expose your Claude Code subscription as an HTTP API.

## Prerequisites

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) installed and logged in
- Node.js 18+

## Setup

```bash
git clone https://github.com/ameydabhade/conduit.git
cd conduit
npm install
npm start
```

## Usage

```bash
curl -X POST http://localhost:3456/chat \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Hello!", "model": "sonnet"}'
```

### Response

```json
{
  "response": "Hi! How can I help you?",
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
| `model` | string | No | `haiku`, `sonnet`, or `opus` |
| `system` | string | No | System prompt |

### `GET /health`

Health check.

## License

MIT
