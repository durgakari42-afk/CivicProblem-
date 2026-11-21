import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'api-server-middleware',
      configureServer(server) {
        // Handle API routes directly in Vite Dev Server for seamless full-stack dev
        server.middlewares.use(async (req, res, next) => {
          if (req.url?.startsWith('/api/triage') && req.method === 'POST') {
            try {
              let body = '';
              req.on('data', chunk => {
                body += chunk;
              });
              req.on('end', async () => {
                try {
                  const { runTriage } = await import('./server/triageHandler.js');
                  const parsed = JSON.parse(body || '{}');
                  const result = await runTriage(parsed);
                  res.setHeader('Content-Type', 'application/json');
                  res.statusCode = 200;
                  res.end(JSON.stringify(result));
                } catch (err) {
                  res.setHeader('Content-Type', 'application/json');
                  res.statusCode = 500;
                  res.end(JSON.stringify({ error: err.message || 'Triage processing failed' }));
                }
              });
            } catch (err) {
              next(err);
            }
          } else if (req.url === '/api/health') {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify({ status: 'ok', service: 'CivicResolve API' }));
          } else {
            next();
          }
        });
      }
    }
  ],
  server: {
    port: 5173,
    host: true
  }
});
