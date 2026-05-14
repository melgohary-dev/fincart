import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Error from '@mui/icons-material/Error';
import { useTranslation } from 'react-i18next';

/**
 * Error state displayed when the courier API call fails.
 *
 * Includes a retry button that re-triggers the search.  The `role="alert"`
 * ensures assistive technology announces the error immediately.
 */
interface ErrorStateProps {
  onRetry: () => void;
}

export default function ErrorState({ onRetry }: ErrorStateProps) {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        textAlign: 'center',
      }}
      role="alert"
    >
      <Error sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
      <Typography variant="h6" color="text.primary" gutterBottom>
        {t('courier.fetchError')}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 400 }}>
        {t('courier.fetchErrorDesc')}
      </Typography>
      <Button variant="contained" color="primary" onClick={onRetry}>
        {t('common.retry')}
      </Button>
    </Box>
  );
}
