import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import type { ThemeMode } from '@/types';

/**
 * Top navigation bar.
 *
 * Displays the app title (localised) alongside the theme and language
 * toggles.  Layout wraps gracefully on small screens.
 */
interface HeaderProps {
  mode: ThemeMode;
  toggleTheme: () => void;
}

export default function Header({ mode, toggleTheme }: HeaderProps) {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: { xs: 1, sm: 0 },
        mb: { xs: 2, md: 4 },
      }}
    >
      <Typography
        variant="h5"
        component="h1"
        color="primary.main"
        sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' } }}
      >
        {t('common.appTitle')}
      </Typography>
      <Box sx={{ display: 'flex', gap: { xs: 0.5, sm: 1 }, alignItems: 'center' }}>
        <ThemeToggle mode={mode} toggleTheme={toggleTheme} />
        <LanguageToggle />
      </Box>
    </Box>
  );
}
