import { configureEcho } from '@laravel/echo-react';

configureEcho({
  broadcaster: 'reverb',
  key: import.meta.env.VITE_REVERB_APP_KEY,
  wsHost: import.meta.env.VITE_REVERB_HOST || window.location.hostname,
  wsPort: Number(import.meta.env.VITE_REVERB_PORT) || 8080,
  forceTLS: import.meta.env.VITE_REVERB_SCHEME === 'https', // false si scheme === http
  enabledTransports: ['ws', 'wss'],
});
