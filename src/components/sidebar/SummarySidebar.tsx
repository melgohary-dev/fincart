import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import PublicIcon from '@mui/icons-material/Public';
import ScaleIcon from '@mui/icons-material/Scale';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useTranslation } from 'react-i18next';
import { useQuoteStore } from '@/store/quoteStore';
import { getCountryName, isValidCountryCode } from '@/utils/countryCodes';

/**
 * Sidebar summary card.
 *
 * Reads the current quote selections from the Zustand store and
 * displays them as a sticky summary card.  Icon colours mirror the
 * form fields (primary for origin, secondary for destination, action
 * for package dimensions) so the user can quickly map sidebar items
 * to their form inputs.
 */
export default function SummarySidebar() {
  const { t, i18n } = useTranslation();
  const origin = useQuoteStore((s) => s.origin);
  const destination = useQuoteStore((s) => s.destination);
  const weight = useQuoteStore((s) => s.weight);
  const volume = useQuoteStore((s) => s.volume);

  const hasData = origin || destination || weight !== null || volume !== null;

  return (
    <Card sx={{ position: { md: 'sticky' }, top: { md: 24 } }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {t('sidebar.title')}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {!hasData ? (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {t('sidebar.startSearch')}
          </Typography>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PublicIcon fontSize="small" color="primary" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  {t('sidebar.origin')}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {origin && isValidCountryCode(origin)
                    ? getCountryName(origin, i18n.language)
                    : t('sidebar.noSelection')}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PublicIcon fontSize="small" color="secondary" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  {t('sidebar.destination')}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {destination && isValidCountryCode(destination)
                    ? getCountryName(destination, i18n.language)
                    : t('sidebar.noSelection')}
                </Typography>
              </Box>
            </Box>

            <Divider />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ScaleIcon fontSize="small" color="action" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  {t('sidebar.weight')}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {weight ? `${weight} kg` : t('sidebar.notSpecified')}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <InventoryIcon fontSize="small" color="action" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  {t('sidebar.volume')}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {volume ? `${volume} m³` : t('sidebar.notSpecified')}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
