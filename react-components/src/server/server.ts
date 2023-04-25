import path from 'path';
import open, { apps } from 'open';
import { fileURLToPath } from 'url';

import express from 'express';
import { ViteDevServer } from 'vite';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const isVitest = process.env.VITEST;
const isE2E = process.env.NODE_TEST === 'e2e';

const PORT = 5173;

export async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === 'production'
) {
  const resolve = (p: string) => path.resolve(dirname, p);
  const app = express();
  let vite: ViteDevServer;
  if (isProd) {
    app.use(
      (await import('serve-static')).default(resolve('../../dist/client'), {
        index: false,
      })
    );
  } else {
    vite = await (
      await import('vite')
    ).createServer({
      root,
      logLevel: isVitest ? 'error' : 'info',
      server: {
        middlewareMode: true,
        watch: {
          usePolling: true,
          interval: 100,
        },
        hmr: true,
      },
      appType: 'custom',
    });

    app.use(vite.middlewares);
  }

  app.use('*', async (req, res) => {
    try {
      if (!isProd) {
        const render = (await vite.ssrLoadModule('src/server/components/app.tsx')).render;
        const assetMap = { script: 'src/main.tsx' };
        render(req, res, assetMap);
      }
    } catch (e) {
      const err = e as Error;
      !isProd && vite.ssrFixStacktrace(err);
      res.status(500).end(err.stack);
    }
  });

  return { app };
}

if (!isVitest) {
  createServer()
    .then(({ app }) =>
      app.listen(PORT, () => {
        if (!isE2E) {
          const url = `http://localhost:${PORT}`;
          console.log('Started server.');
          console.log(`Available on ${url}`);
          open(url, {
            app: {
              name: apps.chrome,
            },
          });
        }
      })
    )
    .catch((e) => console.error(e));
}
