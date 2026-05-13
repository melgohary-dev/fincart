import { Suspense, lazy, useCallback } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'react-i18next';
import { useQuoteForm } from '@/hooks/useQuoteForm';
import { useCourierSearch } from '@/hooks/useCourierSearch';
import OriginStep from '@/components/form/OriginStep';
import DestinationStep from '@/components/form/DestinationStep';
import PackageStep from '@/components/form/PackageStep';
import FormNavigation from '@/components/form/FormNavigation';
import SummarySidebar from '@/components/sidebar/SummarySidebar';

const CourierGrid = lazy(() => import('@/components/courier/CourierGrid'));

export default function App() {
  const { t, i18n } = useTranslation();
  const { control, errors, isValid, step, handleNext, handleBack, handleSubmit, totalSteps } =
    useQuoteForm();

  const { refetch, canSearch } = useCourierSearch();

  const handleSearch = useCallback(() => {
    handleSubmit(() => {
      if (canSearch) refetch();
    })();
  }, [handleSubmit, canSearch, refetch]);

  const toggleLanguage = () => {
    const next = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(next);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        py: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
          <Typography variant="h4" color="primary.main">
            {t('common.appTitle')}
          </Typography>
          <Tooltip title={i18n.language === 'en' ? 'العربية' : 'English'}>
            <IconButton onClick={toggleLanguage} color="primary" aria-label={t('common.language')}>
              <Typography variant="button" sx={{ fontWeight: 600 }}>
                {i18n.language === 'en' ? 'AR' : 'EN'}
              </Typography>
            </IconButton>
          </Tooltip>
        </Box>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 3 }}>
            <SummarySidebar />
          </Grid>
          <Grid size={{ xs: 12, md: 9 }}>
            <Paper sx={{ p: { xs: 2, md: 4 } }}>
              {step === 0 && <OriginStep control={control} errors={errors} />}
              {step === 1 && <DestinationStep control={control} errors={errors} />}
              {step === 2 && <PackageStep control={control} errors={errors} />}

              <FormNavigation
                step={step}
                totalSteps={totalSteps}
                isValid={isValid}
                onNext={handleNext}
                onBack={handleBack}
                onSearch={handleSearch}
              />
            </Paper>

            <Suspense fallback={null}>
              <CourierGrid />
            </Suspense>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
