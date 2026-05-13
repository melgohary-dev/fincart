import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const isLastStep = step === totalSteps - 1;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
      <Button
        variant="outlined"
        onClick={onBack}
        disabled={step === 0}
        aria-label={t('common.back')}
      >
        {t('common.back')}
      </Button>

      {isLastStep ? (
        <Button variant="contained" color="primary" onClick={onSearch} disabled={!canNext}>
          {t('common.search')}
        </Button>
      ) : (
        <Button variant="contained" onClick={onNext} disabled={!canNext}>
          {t('common.next')}
        </Button>
      )}
    </Box>
  );
}
