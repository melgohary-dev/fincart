import React from 'react';
import type { Preview } from '@storybook/react-vite';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { I18nextProvider } from 'react-i18next';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import i18n from '../src/i18n';
import { getTheme } from '../src/theme/fincartTheme';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

const ltrCache = createCache({ key: 'sb-muiltr' });
const theme = getTheme({ mode: 'light', lang: 'en' });
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <CacheProvider value={ltrCache}>
        <QueryClientProvider client={queryClient}>
          <I18nextProvider i18n={i18n}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Story />
            </ThemeProvider>
          </I18nextProvider>
        </QueryClientProvider>
      </CacheProvider>
    ),
  ],
};

export default preview;
