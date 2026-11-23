import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { LanguageProvider } from './i18n/translations.ts';
import './index.css';

// Ignore unhandled errors injected by third-party browser extensions (e.g. MetaMask inpage.js)
const isBrowserExtensionError = (reason: unknown, filename?: string): boolean => {
  if (filename && (filename.startsWith('chrome-extension://') || filename.startsWith('moz-extension://'))) {
    return true;
  }
  const text =
    reason instanceof Error
      ? `${reason.message}\n${reason.stack ?? ''}`
      : typeof reason === 'string'
        ? reason
        : '';
  return (
    text.includes('chrome-extension://') ||
    text.includes('moz-extension://') ||
    text.includes('Failed to connect to MetaMask')
  );
};

window.addEventListener(
  'unhandledrejection',
  (event) => {
    if (isBrowserExtensionError(event.reason)) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  },
  true,
);

window.addEventListener(
  'error',
  (event) => {
    if (isBrowserExtensionError(event.error ?? event.message, event.filename)) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  },
  true,
);

createRoot(document.getElementById('root')!).render(
  <LanguageProvider>
    <App />
  </LanguageProvider>,
);
