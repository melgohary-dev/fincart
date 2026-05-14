import { LanguageCode, ThemeMode } from '@/types';
import { createTheme } from '@mui/material/styles';

/**
 * Font family presets for LTR (English) and RTL (Arabic) text rendering.
 *
 * Arabic fonts are selected for good legibility at small sizes and
 * wide Unicode glyph coverage (Cairo, Noto Kufi Arabic, Tajawal).
 */
const FONT_FAMILIES = {
  [LanguageCode.English]: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  [LanguageCode.Arabic]: '"Cairo", "Noto Kufi Arabic", "Tajawal", sans-serif',
} as const;

/** Shared component overrides applied to both light and dark themes. */
const commonComponents = {
  MuiButton: {
    styleOverrides: {
      root: { borderRadius: 8, padding: '10px 24px' },
    },
  },
  MuiTextField: {
    defaultProps: { variant: 'outlined' as const, fullWidth: true },
  },
};

interface ThemeOptions {
  mode: ThemeMode;
  lang: LanguageCode;
  primary?: {
    main: string;
    light?: string;
    dark?: string;
  };
}

/** Default brand colour – emerald green inspired by shipping / logistics. */
const DEFAULT_PRIMARY = {
  [ThemeMode.Light]: { main: '#0A5C4B', light: '#1A8A72', dark: '#063D31' },
  [ThemeMode.Dark]: { main: '#2ECC71', light: '#58D68D', dark: '#1A8A72' },
} as const;

/**
 * Builds a MUI theme for the given mode, language, and optional primary colour.
 *
 * The `direction` field is set to `'rtl'` for Arabic so that MUI
 * components (Select dropdowns, button groups, etc.) mirror correctly
 * without manual `sx` overrides.
 */
export function getTheme({ mode, lang, primary }: ThemeOptions) {
  const isDark = mode === ThemeMode.Dark;
  const defaultPalette = isDark ? DEFAULT_PRIMARY.dark : DEFAULT_PRIMARY.light;

  return createTheme({
    direction: lang === LanguageCode.Arabic ? 'rtl' : 'ltr',
    palette: {
      mode,
      primary: {
        main: primary?.main ?? defaultPalette.main,
        light: primary?.light ?? defaultPalette.light,
        dark: primary?.dark ?? defaultPalette.dark,
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#FFB347',
        light: '#FFC978',
        dark: '#E69530',
        contrastText: '#1A1A1A',
      },
      background: {
        default: isDark ? '#121212' : '#F5F7F6',
        paper: isDark ? '#1E1E1E' : '#FFFFFF',
      },
      text: {
        primary: isDark ? '#E0E0E0' : '#1A1A1A',
        secondary: isDark ? '#9E9E9E' : '#5A5A5A',
      },
      error: { main: isDark ? '#EF5350' : '#D32F2F' },
      success: { main: isDark ? '#66BB6A' : '#2E7D32' },
    },
    typography: {
      fontFamily: FONT_FAMILIES[lang],
      h4: { fontWeight: 700 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
      subtitle1: { fontWeight: 500 },
      button: { textTransform: 'none', fontWeight: 600 },
    },
    shape: { borderRadius: 8 },
    spacing: 8,
    components: {
      ...commonComponents,
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: isDark ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.08)',
          },
        },
      },
    },
  });
}

export { FONT_FAMILIES };
