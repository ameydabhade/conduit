require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { execSync } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3456;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Optional auth
const authenticate = (req, res, next) => {
  if (!process.env.PROXY_API_KEY) return next();
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.PROXY_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Main endpoint - just send a prompt, get a response
app.post('/chat', authenticate, (req, res) => {
  try {
    const { prompt, model, system } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'prompt is required' });
    }

    const args = ['--print', '--output-format', 'json', '--dangerously-skip-permissions'];

    if (model) args.push('--model', model);
    if (system) args.push('--system-prompt', JSON.stringify(system));

    const escapedPrompt = prompt.replace(/'/g, "'\\''");
    const command = `claude ${args.join(' ')} '${escapedPrompt}'`;

    console.log(`[${new Date().toISOString()}] Request: ${prompt.substring(0, 50)}...`);

    const result = execSync(command, {
      encoding: 'utf8',
      timeout: 300000,
      maxBuffer: 50 * 1024 * 1024,
    });

    const parsed = JSON.parse(result);

    res.json({
      response: parsed.result,
      model: Object.keys(parsed.modelUsage || {})[0] || model,
      usage: parsed.usage,
      cost_usd: parsed.total_cost_usd,
    });

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`\nClaude Code Proxy: http://localhost:${PORT}`);
  console.log(`\nPOST /chat { "prompt": "your message", "model": "sonnet" }\n`);
});
