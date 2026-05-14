import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';
import Search from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import { FormStep, LanguageCode } from '@/types';

/**
 * Multi-step wizard – navigation buttons (Back / Next / Search).
 *
 * MUI automatically respects the theme's `direction` setting, so
 * `startIcon` and `endIcon` positions swap under RTL. We keep the
 * *semantically correct* icon for each action (ArrowBack for "back",
 * ArrowForward for "next") in all locales — MUI's RTL handling flips
 * the icon's visual direction via the `html` dir attribute.
 */
interface FormNavigationProps {
  step: number;
  totalSteps: number;
  canNext: boolean;
  onNext: () => void;
  onBack: () => void;
  onSearch: () => void;
}

export default function FormNavigation({
  step,
  totalSteps,
  canNext,
  onNext,
  onBack,
  onSearch,
}: FormNavigationProps) {
  const { t, i18n } = useTranslation();
  const isLastStep = step === totalSteps - 1;
  const isRTL = i18n.language === LanguageCode.Arabic;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        mt: 4,
        gap: 2,
        flexDirection: { xs: 'column-reverse', sm: 'row' },
      }}
    >
      <Button
        variant="outlined"
        onClick={onBack}
        disabled={step === FormStep.Origin}
        aria-label={t('common.back')}
        startIcon={isRTL ? <ArrowForward /> : <ArrowBack />}
        fullWidth={true}
        sx={{ width: { xs: '100%', sm: 'auto' } }}
      >
        {t('common.back')}
      </Button>

      {isLastStep ? (
        <Button
          variant="contained"
          color="primary"
          onClick={onSearch}
          disabled={!canNext}
          endIcon={<Search />}
          fullWidth={true}
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          {t('common.search')}
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={onNext}
          disabled={!canNext}
          endIcon={isRTL ? <ArrowBack /> : <ArrowForward />}
          fullWidth={true}
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          {t('common.next')}
        </Button>
      )}
    </Box>
  );
}
