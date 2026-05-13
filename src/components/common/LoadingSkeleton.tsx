import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';

export default function LoadingSkeleton() {
  const { t } = useTranslation();

  return (
    <Box role="status" aria-live="polite" aria-label={t('common.loading')}>
      <Grid container spacing={3}>
        {[1, 2, 3, 4].map((i) => (
          <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
            <Skeleton variant="rounded" height={220} />
            <Box sx={{ mt: 1 }}>
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="40%" />
              <Skeleton variant="text" width="80%" />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
