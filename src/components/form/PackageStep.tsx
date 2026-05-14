import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Scale from '@mui/icons-material/Scale';
import Inventory from '@mui/icons-material/Inventory';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { Control, FieldErrors } from 'react-hook-form';
import type { QuoteFormData } from '@/types';

/**
 * Multi-step wizard – Package weight & volume step.
 *
 * Two numeric fields (weight required, volume optional) with inline icon
 * adornments that remain visible at all times. Icons use `disabled` colour
 * while the field is empty and switch to `primary` once the user enters
 * a value, giving a clear filled-state signal.
 *
 * Uses `null` (not empty string) to represent an unset numeric value,
 * consistent with the `QuoteFormData` type.
 */
interface PackageStepProps {
  control: Control<QuoteFormData, any>;
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
                  startAdornment: (
                    <InputAdornment position="start">
                      <Scale
                        fontSize="small"
                        color={typeof field.value === 'number' ? 'primary' : 'disabled'}
                      />
                    </InputAdornment>
                  ),
                  inputProps: { min: 0, step: 0.1 },
                },
              }}
              error={!!errors.weight}
              helperText={errors.weight?.message || ' '}
              value={field.value ?? ''}
              onChange={(e) => {
                const val = e.target.value;
                field.onChange(val === '' ? null : Number(val));
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
                  startAdornment: (
                    <InputAdornment position="start">
                      <Inventory
                        fontSize="small"
                        color={typeof field.value === 'number' ? 'primary' : 'disabled'}
                      />
                    </InputAdornment>
                  ),
                  inputProps: { min: 0, step: 0.01 },
                },
              }}
              error={!!errors.volume}
              helperText={errors.volume?.message || ' '}
              value={field.value ?? ''}
              onChange={(e) => {
                const val = e.target.value;
                field.onChange(val === '' ? null : Number(val));
              }}
            />
          )}
        />
      </Box>
    </>
  );
}
