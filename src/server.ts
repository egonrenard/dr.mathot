import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

const supportedLanguages = ['nl', 'fr', 'en'] as const;
type SupportedLanguage = (typeof supportedLanguages)[number];

function resolvePreferredLanguage(acceptLanguageHeader: string | undefined): SupportedLanguage {
  const normalizedHeader = (acceptLanguageHeader || '').toLowerCase();

  if (normalizedHeader.includes('fr')) {
    return 'fr';
  }

  if (normalizedHeader.includes('en')) {
    return 'en';
  }

  return 'nl';
}

// Redirect root to the best language match, with Dutch as fallback.
app.get('/', (req, res) => {
  const preferredLanguage = resolvePreferredLanguage(req.headers['accept-language']);
  const queryIndex = req.originalUrl.indexOf('?');
  const query = queryIndex >= 0 ? req.originalUrl.slice(queryIndex) : '';
  res.setHeader('Vary', 'Accept-Language');
  res.redirect(302, `/${preferredLanguage}${query}`);
});

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
