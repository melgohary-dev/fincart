import { useMemo, useState, useCallback } from 'react';
import { getTheme } from '@/theme/fincartTheme';
import type { Theme } from '@mui/material/styles';
import { LanguageCode, ThemeMode } from '@/types';

/**
 * Theme mode (light / dark) management hook.
 *
 * Memoizes the MUI theme object so that it is only rebuilt when the
 * mode or language changes.  The theme object includes the current
 * `direction` setting, which is how MUI components know to render RTL.
 */
export function useThemeMode(lang: LanguageCode) {
  const [mode, setMode] = useState<ThemeMode>(ThemeMode.Light);

  const theme: Theme = useMemo(
    () =>
      getTheme({
        mode,
        lang,
      }),
    [mode, lang],
  );

  const toggleTheme = useCallback(() => {
    setMode((prev) => (prev === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light));
  }, []);

  return { theme, mode, toggleTheme };
}
