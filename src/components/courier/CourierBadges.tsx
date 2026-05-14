import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SpeedIcon from '@mui/icons-material/Speed';
import { useTranslation } from 'react-i18next';
import { LanguageCode } from '@/types';

/**
 * Ranking badges shown on courier cards.
 *
 * "Cheapest" (green) and "Fastest" (info/blue) chips highlight the
 * best options for the user.  Alignment toggles between `flex-start`
 * and `flex-end` based on the active text direction.
 */
interface CourierBadgesProps {
  isCheapest: boolean;
  isFastest: boolean;
}

export default function CourierBadges({ isCheapest, isFastest }: CourierBadgesProps) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === LanguageCode.Arabic;

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        flexWrap: 'wrap',
        justifyContent: isRTL ? 'flex-end' : 'flex-start',
      }}
    >
      {isCheapest && (
        <Chip
          icon={<LocalShippingIcon />}
          label={t('courier.cheapest')}
          color="success"
          size="small"
          variant="filled"
          sx={{ px: 1.5 }}
          aria-label={`${t('courier.cheapest')} ${t('courier.price')}`}
        />
      )}
      {isFastest && (
        <Chip
          icon={<SpeedIcon />}
          label={t('courier.fastest')}
          color="info"
          size="small"
          variant="filled"
          sx={{ px: 1.5 }}
          aria-label={`${t('courier.fastest')} ${t('courier.deliveryDays')}`}
        />
      )}
    </Box>
  );
}
