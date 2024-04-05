import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';

export const app = () => {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');
  const commonEngine = new CommonEngine({enablePerformanceProfiler: true});
  server.set('view engine', 'html');
  server.set('views', browserDistFolder);
  server.get('*.*', express.static(browserDistFolder, {maxAge: '1y'}));
  server.get('*', async (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;
    try {
      const html = await commonEngine.render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      });
      res.send(html);
    } catch (e) { next(e) }
  });
  return server;
}

const run = () => {
  const port = process.env['PORT'] || 4000;
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
