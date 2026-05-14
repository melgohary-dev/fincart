import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SearchOff from '@mui/icons-material/SearchOff';
import { useTranslation } from 'react-i18next';

/**
 * Empty state shown when no couriers match the selected route.
 *
 * Also serves as the default placeholder before any search is
 * performed (the text is visible but unobtrusive).
 */
export default function EmptyState() {
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
    >
      <SearchOff sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
      <Typography variant="h6" color="text.secondary" gutterBottom>
        {t('courier.noCouriers')}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {t('courier.noCouriersDesc')}
      </Typography>
    </Box>
  );
}
