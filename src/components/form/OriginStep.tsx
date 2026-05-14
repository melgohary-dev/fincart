import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FlightTakeoff from '@mui/icons-material/FlightTakeoff';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { COUNTRIES, getCountryName } from '@/utils/countryCodes';
import type { Control, FieldErrors } from 'react-hook-form';
import type { QuoteFormData } from '@/types';

/**
 * Multi-step wizard – Origin country selector.
 *
 * Renders a labelled `<Select>` (React Hook Form controlled) with an
 * always-visible FlightTakeoff icon. The icon dims to `action` when no
 * country is selected and switches to `primary` once a value is picked.
 */
interface OriginStepProps {
  control: Control<QuoteFormData, any>;
  errors: FieldErrors<QuoteFormData>;
}

export default function OriginStep({ control, errors }: OriginStepProps) {
  const { t, i18n } = useTranslation();

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
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FlightTakeoff fontSize="small" color={selected ? 'primary' : 'disabled'} />
                  {selected ? (
                    getCountryName(selected, i18n.language)
                  ) : (
                    <Typography variant="body2" color="text.disabled">
                      {t('form.origin.placeholder')}
                    </Typography>
                  )}
                </Box>
              )}
            >
              <MenuItem value="" disabled>
                {t('form.origin.placeholder')}
              </MenuItem>
              {COUNTRIES.map((c) => (
                <MenuItem key={c.code} value={c.code}>
                  {getCountryName(c.code, i18n.language)}
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
