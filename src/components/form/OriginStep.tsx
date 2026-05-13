import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { COUNTRIES } from '@/utils/countryCodes';
import type { Control, FieldErrors } from 'react-hook-form';
import type { QuoteFormData } from '@/types';

interface OriginStepProps {
  control: Control<QuoteFormData>;
  errors: FieldErrors<QuoteFormData>;
}

export default function OriginStep({ control, errors }: OriginStepProps) {
  const { t } = useTranslation();

  return (
    <>
      <Typography variant="h5" gutterBottom>
        {t('form.origin.title')}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {t('form.origin.helperText')}
      </Typography>

      <Controller
        name="origin"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth error={!!errors.origin}>
            <InputLabel id="origin-label">{t('form.origin.label')}</InputLabel>
            <Select
              {...field}
              labelId="origin-label"
              label={t('form.origin.label')}
              value={field.value || ''}
              onChange={(e) => field.onChange(e.target.value)}
            >
              <MenuItem value="" disabled>
                {t('form.origin.placeholder')}
              </MenuItem>
              {COUNTRIES.map((c) => (
                <MenuItem key={c.code} value={c.code}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>
            {errors.origin && <FormHelperText>{errors.origin.message}</FormHelperText>}
          </FormControl>
        )}
      />
    </>
  );
}
