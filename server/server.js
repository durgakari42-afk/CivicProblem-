import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { runTriage } from './triageHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '20mb' }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'CivicResolve Backend',
    model: 'Gemini 2.5 Flash',
    timestamp: new Date().toISOString()
  });
});

// Triage API endpoint
app.post('/api/triage', async (req, res) => {
  try {
    const payload = req.body;
    const result = await runTriage(payload);
    res.json(result);
  } catch (error) {
    console.error('Error in /api/triage:', error);
    res.status(500).json({ error: error.message || 'Internal Triage Failure' });
  }
});

// Serve frontend static build in production
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// Fallback for SPA routing
app.use((req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`CivicResolve server listening on http://localhost:${PORT}`);
});
