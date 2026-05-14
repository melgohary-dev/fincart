import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { FormStep } from '@/types';

/**
 * Multi-step progress indicator.
 *
 * Renders a segmented progress bar (filled segments for completed /
 * current steps) and a textual label showing which step the user is
 * on and what it's called.
 */
interface StepIndicatorProps {
  step: number;
  totalSteps: number;
}

const STEP_LABELS: Record<number, string> = {
  [FormStep.Origin]: 'form.steps.origin',
  [FormStep.Destination]: 'form.steps.destination',
  [FormStep.Package]: 'form.steps.package',
};

export default function StepIndicator({ step, totalSteps }: StepIndicatorProps) {
  const { t } = useTranslation();

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        {Array.from({ length: totalSteps }, (_, i) => (
          <Box
            key={i}
            sx={{
              flex: 1,
              height: 4,
              borderRadius: 2,
              bgcolor: i <= step ? 'primary.main' : 'grey.300',
              transition: 'background-color 0.3s',
            }}
          />
        ))}
      </Box>
      <Typography variant="caption" color="text.secondary">
        {t('form.steps.label', { current: step + 1, total: totalSteps })} &mdash;{' '}
        {t(STEP_LABELS[step] ?? '')}
      </Typography>
    </Box>
  );
}
