import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useLanguage } from '@/hooks/useLanguage';
import { LanguageCode } from '@/types';

/**
 * Language toggle button.
 *
 * Shows the flag of the *target* language (i.e. the language the user
 * will switch to) and the language name in its own script, making the
 * button self-explanatory regardless of the current locale.
 */
export default function LanguageToggle() {
  const { currentLang, toggleLanguage } = useLanguage();

  return (
    <IconButton
      onClick={toggleLanguage}
      color="primary"
      aria-label="Language"
      sx={{ display: 'flex', gap: 0.5, px: { xs: 1, sm: 1.5 }, borderRadius: 1 }}
    >
      <Box
        component="img"
        src={currentLang === LanguageCode.English ? '/flags/sa.svg' : '/flags/us.svg'}
        alt={currentLang === LanguageCode.English ? 'Saudi Arabia flag' : 'United States flag'}
        sx={{ width: 24, height: 16, borderRadius: '2px' }}
      />
      <Typography variant="button" sx={{ fontWeight: 600, display: { xs: 'none', sm: 'block' } }}>
        {currentLang === LanguageCode.English ? 'العربية' : 'English'}
      </Typography>
    </IconButton>
  );
}
