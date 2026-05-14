import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { DEFAULT_SKELETON_COUNT, BREAKPOINTS } from '@/types';

/**
 * Loading skeleton grid for the courier results section.
 *
 * Accessible via `role="status"` and `aria-live="polite"` so screen
 * readers announce the loading state.
 */
export default function LoadingSkeleton() {
  const { t } = useTranslation();
  const skeletonItems = Array.from({ length: DEFAULT_SKELETON_COUNT }, (_, i) => i);

  return (
    <Box role="status" aria-live="polite" aria-label={t('common.loading')}>
      <Grid container spacing={3}>
        {skeletonItems.map((i) => (
          <Grid key={i} size={BREAKPOINTS.cardGrid}>
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
