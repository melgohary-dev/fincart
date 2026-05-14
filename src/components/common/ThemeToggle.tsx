import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DarkMode from '@mui/icons-material/DarkMode';
import LightMode from '@mui/icons-material/LightMode';
import { useTranslation } from 'react-i18next';
import { ThemeMode } from '@/types';

/**
 * Dark / light mode toggle button.
 *
 * Shows the opposite mode's icon so the user knows what they'll
 * switch to.  The tooltip renders the localised label.
 */
interface ThemeToggleProps {
  mode: ThemeMode;
  toggleTheme: () => void;
}

export default function ThemeToggle({ mode, toggleTheme }: ThemeToggleProps) {
  const { t } = useTranslation();

  return (
    <Tooltip title={mode === ThemeMode.Light ? t('common.darkMode') : t('common.lightMode')}>
      <IconButton
        onClick={toggleTheme}
        color="primary"
        aria-label={mode === ThemeMode.Light ? t('common.darkMode') : t('common.lightMode')}
      >
        {mode === ThemeMode.Light ? <DarkMode /> : <LightMode />}
      </IconButton>
    </Tooltip>
  );
}
