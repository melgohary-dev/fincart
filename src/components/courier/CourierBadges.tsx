import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SpeedIcon from '@mui/icons-material/Speed';
import { useTranslation } from 'react-i18next';

interface CourierBadgesProps {
  isCheapest: boolean;
  isFastest: boolean;
}

export default function CourierBadges({ isCheapest, isFastest }: CourierBadgesProps) {
  const { t } = useTranslation();

  return (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
      {isCheapest && (
        <Chip
          icon={<LocalShippingIcon />}
          label={t('courier.cheapest')}
          color="success"
          size="small"
          variant="filled"
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
          aria-label={`${t('courier.fastest')} ${t('courier.deliveryDays')}`}
        />
      )}
    </Box>
  );
}
