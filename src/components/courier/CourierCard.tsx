import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { useTranslation } from 'react-i18next';
import CourierBadges from './CourierBadges';
import type { CourierWithMeta } from '@/types';

interface CourierCardProps {
  courier: CourierWithMeta;
}

export default function CourierCard({ courier }: CourierCardProps) {
  const { t } = useTranslation();

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 0.2s',
        '&:hover': {
          boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
        },
      }}
    >
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            component="img"
            src={courier.logoUrl}
            alt={`${courier.name} logo`}
            loading="lazy"
            sx={{
              width: 48,
              height: 48,
              objectFit: 'contain',
              borderRadius: 1,
              bgcolor: 'grey.50',
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" fill="%23f5f5f5"/><text x="24" y="28" text-anchor="middle" fill="%23999" font-size="10">Logo</text></svg>';
            }}
          />
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {courier.name}
          </Typography>
        </Box>

        <CourierBadges isCheapest={courier.isCheapest} isFastest={courier.isFastest} />

        <Divider />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              {t('courier.basePrice')}:
            </Typography>
            <Typography variant="body2">${courier.basePrice.toFixed(2)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              {t('courier.tax')} ({(courier.taxRate * 100).toFixed(0)}%):
            </Typography>
            <Typography variant="body2">${courier.tax.toFixed(2)}</Typography>
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              {t('courier.total')}:
            </Typography>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }} color="primary.main">
              ${courier.totalPrice.toFixed(2)}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 'auto' }}>
          <Typography variant="caption" color="text.secondary">
            {t('courier.deliveryDays')}:{' '}
            <Typography component="span" variant="body2" sx={{ fontWeight: 500 }}>
              {t('courier.daysRange', {
                min: courier.deliveryDays[0],
                max: courier.deliveryDays[1],
              })}
            </Typography>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
