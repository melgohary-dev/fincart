import { Suspense, lazy, useCallback } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useThemeMode } from '@/hooks/useThemeMode';
import { useLanguage } from '@/hooks/useLanguage';
import { useQuoteForm } from '@/hooks/useQuoteForm';
import { useCourierSearch } from '@/hooks/useCourierSearch';
import Header from '@/components/common/Header';
import StepIndicator from '@/components/common/StepIndicator';
import OriginStep from '@/components/form/OriginStep';
import DestinationStep from '@/components/form/DestinationStep';
import PackageStep from '@/components/form/PackageStep';
import FormNavigation from '@/components/form/FormNavigation';
import { FormStep, BREAKPOINTS } from '@/types';

const CourierGrid = lazy(() => import('@/components/courier/CourierGrid'));
const SummarySidebar = lazy(() => import('@/components/sidebar/SummarySidebar'));

/**
 * Root application layout.
 *
 * Orchestrates the multi-step form wizard, the results grid, and the
 * summary sidebar within a responsive MUI grid.  The theme direction
 * (`rtl` / `ltr`) is driven by the active language so the entire UI
 * mirrors correctly for Arabic users.
 */
export default function App() {
  const { currentLang } = useLanguage();
  const { theme, mode, toggleTheme } = useThemeMode(currentLang);
  const { control, errors, canNext, step, handleNext, handleBack, handleSubmit, totalSteps } =
    useQuoteForm();
  const { refetch, canSearch } = useCourierSearch();

  const handleSearch = useCallback(() => {
    handleSubmit(() => {
      if (canSearch) refetch();
    })();
  }, [handleSubmit, canSearch, refetch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.default',
          py: { xs: 2, md: 4 },
        }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 1.5, sm: 2, md: 3 } }}>
          <Header mode={mode} toggleTheme={toggleTheme} />

          <Grid container spacing={{ xs: 2, md: 3 }}>
            <Grid size={BREAKPOINTS.sidebar} sx={{ order: { xs: 1, md: 0 } }}>
              <Suspense fallback={null}>
                <SummarySidebar />
              </Suspense>
            </Grid>
            <Grid size={BREAKPOINTS.content}>
              <Paper sx={{ p: { xs: 1.5, sm: 2, md: 4 } }}>
                <StepIndicator step={step} totalSteps={totalSteps} />
                {step === FormStep.Origin && <OriginStep control={control} errors={errors} />}
                {step === FormStep.Destination && (
                  <DestinationStep control={control} errors={errors} />
                )}
                {step === FormStep.Package && <PackageStep control={control} errors={errors} />}
                <FormNavigation
                  step={step}
                  totalSteps={totalSteps}
                  canNext={canNext}
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
    </ThemeProvider>
  );
}
