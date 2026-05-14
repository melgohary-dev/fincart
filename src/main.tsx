import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import '@/assets/fonts.css';
import i18n from '@/i18n';
import App from '@/App';
import { LanguageCode } from './types';

/**
 * Emotion cache instances for MUI style injection.
 *
 * Two caches are created once: `ltrCache` (English) and `rtlCache` (Arabic)
 * with the `stylis-plugin-rtl` auto-flipper.  The active cache is swapped
 * dynamically when the user toggles the language so that every MUI component
 * (and its `sx` styles) mirrors correctly without manual `left`/`right`
 * property overrides.
 */
const ltrCache = createCache({ key: 'muiltr' });
const rtlCache = createCache({ key: 'muirtl', stylisPlugins: [rtlPlugin] });

/**
 * Root component that reacts to i18n language changes.
 *
 * Listens to `i18n.on('languageChanged')` and re-renders so the correct
 * Emotion cache (LTR / RTL) is provided to MUI's `CacheProvider`.
 */
function Root() {
  const [lang, setLang] = useState(i18n.language);

  useEffect(() => {
    const handler = (lng: string) => setLang(lng);
    i18n.on('languageChanged', handler);
    return () => {
      i18n.off('languageChanged', handler);
    };
  }, []);

  const cache = lang === LanguageCode.Arabic ? rtlCache : ltrCache;

  return (
    <CacheProvider value={cache}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </CacheProvider>
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Root />
    </QueryClientProvider>
  </StrictMode>,
);
