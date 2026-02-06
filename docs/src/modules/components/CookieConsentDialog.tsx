import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useLocalStorageState from '@mui/utils/useLocalStorageState';
import { alpha } from '@mui/system';
import TrapFocus from '@mui/material/Unstable_TrapFocus';
import CookieOutlinedIcon from '@mui/icons-material/CookieOutlined';
import { useDoNotTrack } from './AnalyticsProvider';

export default function CookieConsentDialog() {
  const [consentStatus, setConsentStatus] = useLocalStorageState('docs-cookie-consent', null);
  const doNotTrack = useDoNotTrack();

  const open = consentStatus === null && !doNotTrack;

  if (!open) {
    return null;
  }

  const handleAnalytics = () => {
    setConsentStatus('analytics');
  };

  const handleEssential = () => {
    setConsentStatus('essential');
  };

  return (
    <TrapFocus open disableAutoFocus disableEnforceFocus>
      <Fade appear={false} in={open}>
        <Paper
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-consent-dialog-title"
          aria-describedby="cookie-consent-dialog-description"
          variant="outlined"
          tabIndex={-1}
          sx={{
            position: 'fixed',
            bottom: 0,
            right: 0,
            p: 2,
            borderWidth: 0,
            borderTopWidth: 1,
            m: 2,
            maxWidth: 340,
            pointerEvents: 'auto',
            zIndex: 99999,
          }}
        >
          <Stack direction="column" spacing={3} sx={{ justifyContent: 'flex-start' }}>
            <Stack
              spacing={1}
              sx={{ flexShrink: 1, alignSelf: { xs: 'flex-start', sm: 'center' } }}
            >
              <Box
                sx={(theme) => ({
                  borderRadius: '50%',
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  p: 1,
                  display: 'inline-block',
                  width: 40,
                  height: 40,
                  mb: -1,
                  alignSelf: { xs: 'center', sm: 'flex-start' },
                })}
              >
                <CookieOutlinedIcon color="primary" strokeWidth={1.5} />
              </Box>
              <Stack spacing={0.5}>
                <Typography
                  variant="subtitle2"
                  id="cookie-consent-dialog-title"
                  textAlign={{ xs: 'center', sm: 'start' }}
                >
                  Cookie Preferences
                </Typography>
                <Typography
                  id="cookie-consent-dialog-description"
                  variant="body2"
                  textAlign={{ xs: 'center', sm: 'start' }}
                >
                  mui.com relies on cookies to improve your experience.
                </Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-start' }}>
              <Button onClick={handleAnalytics} variant="contained" size="small">
                Allow analytics
              </Button>
              <Button onClick={handleEssential} size="small">
                Essential only
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Fade>
    </TrapFocus>
  );
}
