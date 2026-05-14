import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FlightLand from '@mui/icons-material/FlightLand';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { COUNTRIES, getCountryName } from '@/utils/countryCodes';
import type { Control, FieldErrors } from 'react-hook-form';
import type { QuoteFormData } from '@/types';

/**
 * Multi-step wizard – Destination country selector.
 *
 * Mirrors the OriginStep pattern with a FlightLand icon that transitions
 * from `disabled` (empty) to `secondary` (selected) to give the user a
 * consistent visual cue across both country pickers.
 */
interface DestinationStepProps {
  control: Control<QuoteFormData, any>;
  errors: FieldErrors<QuoteFormData>;
}

export default function DestinationStep({ control, errors }: DestinationStepProps) {
  const { t, i18n } = useTranslation();

  return (
    <>
      <Typography variant="h5" gutterBottom>
        {t('form.destination.title')}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {t('form.destination.helperText')}
      </Typography>

      <Controller
        name="destination"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth error={!!errors.destination}>
            <InputLabel id="destination-label">{t('form.destination.label')}</InputLabel>
            <Select
              {...field}
              labelId="destination-label"
              label={t('form.destination.label')}
              value={field.value || ''}
              onChange={(e) => field.onChange(e.target.value)}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FlightLand fontSize="small" color={selected ? 'secondary' : 'disabled'} />
                  {selected ? (
                    getCountryName(selected, i18n.language)
                  ) : (
                    <Typography variant="body2" color="text.disabled">
                      {t('form.destination.placeholder')}
                    </Typography>
                  )}
                </Box>
              )}
            >
              <MenuItem value="" disabled>
                {t('form.destination.placeholder')}
              </MenuItem>
              {COUNTRIES.map((c) => (
                <MenuItem key={c.code} value={c.code}>
                  {getCountryName(c.code, i18n.language)}
                </MenuItem>
              ))}
            </Select>
            {errors.destination && <FormHelperText>{errors.destination.message}</FormHelperText>}
          </FormControl>
        )}
      />
    </>
  );
}
