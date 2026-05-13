import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { Control, FieldErrors } from 'react-hook-form';
import type { QuoteFormData } from '@/types';

interface PackageStepProps {
  control: Control<QuoteFormData>;
  errors: FieldErrors<QuoteFormData>;
}

export default function PackageStep({ control, errors }: PackageStepProps) {
  const { t } = useTranslation();

  return (
    <>
      <Typography variant="h5" gutterBottom>
        {t('form.package.title')}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Controller
          name="weight"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('form.package.weight.label')}
              placeholder={t('form.package.weight.placeholder')}
              type="number"
              slotProps={{
                input: {
                  inputProps: { min: 0, step: 0.1 },
                },
              }}
              error={!!errors.weight}
              helperText={errors.weight?.message || ' '}
              value={field.value === '' ? '' : field.value}
              onChange={(e) => {
                const val = e.target.value;
                field.onChange(val === '' ? '' : Number(val));
              }}
            />
          )}
        />

        <Controller
          name="volume"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('form.package.volume.label')}
              placeholder={t('form.package.volume.placeholder')}
              type="number"
              slotProps={{
                input: {
                  inputProps: { min: 0, step: 0.01 },
                },
              }}
              error={!!errors.volume}
              helperText={errors.volume?.message || ' '}
              value={field.value === '' ? '' : field.value}
              onChange={(e) => {
                const val = e.target.value;
                field.onChange(val === '' ? '' : Number(val));
              }}
            />
          )}
        />
      </Box>
    </>
  );
}
