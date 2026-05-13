import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { useCourierSearch } from '@/hooks/useCourierSearch';
import { enrichCouriersWithMeta } from '@/utils/pricingHelpers';
import CourierCard from './CourierCard';
import LoadingSkeleton from '@/components/common/LoadingSkeleton';
import ErrorState from '@/components/common/ErrorState';
import EmptyState from '@/components/common/EmptyState';

export default function CourierGrid() {
  const { t } = useTranslation();
  const { data, isLoading, error, refetch, isFetching } = useCourierSearch();

  if (isLoading || isFetching) {
    return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          {t('courier.title')}
        </Typography>
        <LoadingSkeleton />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 4 }}>
        <ErrorState onRetry={() => refetch()} />
      </Box>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Box sx={{ mt: 4 }}>
        <EmptyState />
      </Box>
    );
  }

  const couriers = enrichCouriersWithMeta(data);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        {t('courier.title')}
      </Typography>
      <Grid container spacing={3}>
        {couriers.map((courier) => (
          <Grid key={courier.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <CourierCard courier={courier} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
