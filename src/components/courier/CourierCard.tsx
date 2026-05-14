import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { useTranslation } from 'react-i18next';
import CourierBadges from './CourierBadges';
import type { CourierWithMeta } from '@/types';

/**
 * Individual courier card with pricing breakdown and ranking badges.
 *
 * Displays the courier logo, name, per-kg rate, weight charge, tax,
 * and total, as well as estimated delivery days.  Cards use a subtle
 * hover lift effect (`translateY(-2px)`) for discoverability.
 */
interface CourierCardProps {
  courier: CourierWithMeta;
  weightKg: number;
}

export default function CourierCard({ courier, weightKg }: CourierCardProps) {
  const { t } = useTranslation();

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 0.2s, transform 0.2s',
        '&:hover': {
          boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            component="img"
            src={courier.logoUrl}
            alt={`${courier.name} logo`}
            loading="lazy"
            sx={{
              width: { xs: 40, sm: 48 },
              height: { xs: 40, sm: 48 },
              objectFit: 'contain',
              borderRadius: 1,
              bgcolor: 'grey.50',
              flexShrink: 0,
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" fill="%23f5f5f5"/><text x="24" y="28" text-anchor="middle" fill="%23999" font-size="10">Logo</text></svg>';
            }}
          />
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              fontSize: { xs: '0.9rem', sm: '1rem' },
              wordBreak: 'break-word',
            }}
          >
            {courier.name}
          </Typography>
        </Box>

        <CourierBadges isCheapest={courier.isCheapest} isFastest={courier.isFastest} />

        <Divider />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
            >
              {t('courier.ratePerKg')}:
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, whiteSpace: 'nowrap' }}
            >
              ${courier.basePrice.toFixed(2)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
            >
              {t('courier.shippingCost', { weight: weightKg })}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, whiteSpace: 'nowrap' }}
            >
              ${courier.weightCharge.toFixed(2)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
            >
              {t('courier.tax')} ({(courier.taxRate * 100).toFixed(0)}%):
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, whiteSpace: 'nowrap' }}
            >
              ${courier.tax.toFixed(2)}
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 600, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
            >
              {t('courier.total')}:
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '0.8rem', sm: '0.875rem' },
                whiteSpace: 'nowrap',
              }}
              color="primary.main"
            >
              ${courier.totalPrice.toFixed(2)}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 'auto' }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}
          >
            {t('courier.deliveryDays')}:{' '}
            <Typography
              component="span"
              variant="body2"
              sx={{ fontWeight: 500, fontSize: { xs: '0.7rem', sm: '0.875rem' } }}
            >
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
