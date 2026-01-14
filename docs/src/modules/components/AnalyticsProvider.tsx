import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useLocalStorageState from '@mui/utils/useLocalStorageState';

const COOKIE_CONSENT_KEY = 'docs-cookie-consent';

type ConsentStatus = 'analytics' | 'essential' | null;

function getDoNotTrack(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  // Check for Do Not Track (DNT)
  return navigator.doNotTrack === '1' || (window as { doNotTrack?: string }).doNotTrack === '1';
}

// DNT doesn't change during a session, so we can use a simple external store
const subscribeToNothing = () => () => {};
const getDoNotTrackSnapshot = () => getDoNotTrack();
const getDoNotTrackServerSnapshot = () => true; // Assume DNT until we know the actual value

function useDoNotTrack(): boolean {
  return React.useSyncExternalStore(
    subscribeToNothing,
    getDoNotTrackSnapshot,
    getDoNotTrackServerSnapshot,
  );
}

interface AnalyticsContextValue {
  consentStatus: ConsentStatus;
  hasAnalyticsConsent: boolean;
}

const AnalyticsContext = React.createContext<AnalyticsContextValue>({
  consentStatus: null,
  hasAnalyticsConsent: false,
});

export function useAnalyticsConsent() {
  return React.useContext(AnalyticsContext);
}

function CookieConsentDialog({
  open,
  onAnalytics,
  onEssential,
}: {
  open: boolean;
  onAnalytics: () => void;
  onEssential: () => void;
}) {
  if (!open) {
    return null;
  }

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
                  example.com relies on cookies to improve your experience.
                </Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-start' }}>
              <Button onClick={onAnalytics} variant="contained" size="small">
                Allow analytics
              </Button>
              <Button onClick={onEssential} size="small">
                Essential only
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Fade>
    </TrapFocus>
  );
}

function updateGoogleConsent(hasAnalytics: boolean) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: hasAnalytics ? 'granted' : 'denied',
    });

    // Initialize Apollo when analytics consent is granted
    const win = window as typeof window & { initApollo?: () => void };
    if (hasAnalytics && typeof win.initApollo === 'function') {
      win.initApollo();
    }
  }
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const [consentStatus, setConsentStatus] = useLocalStorageState(COOKIE_CONSENT_KEY, null);
  const doNotTrack = useDoNotTrack();

  // Respect Do Not Track - don't show dialog and treat as essential only
  const showDialog = consentStatus === null && !doNotTrack;

  // Update Google consent when status changes or on mount if already set
  React.useEffect(() => {
    if (doNotTrack) {
      // DNT is enabled - always deny analytics
      updateGoogleConsent(false);
    } else if (consentStatus !== null) {
      updateGoogleConsent(consentStatus === 'analytics');
    }
  }, [consentStatus, doNotTrack]);

  const handleAnalytics = () => {
    setConsentStatus('analytics');
  };

  const handleEssential = () => {
    setConsentStatus('essential');
  };

  const contextValue = React.useMemo<AnalyticsContextValue>(
    () => ({
      consentStatus: doNotTrack ? 'essential' : (consentStatus as ConsentStatus),
      hasAnalyticsConsent: !doNotTrack && consentStatus === 'analytics',
    }),
    [consentStatus, doNotTrack],
  );

  return (
    <AnalyticsContext.Provider value={contextValue}>
      {children}
      <CookieConsentDialog
        open={showDialog}
        onAnalytics={handleAnalytics}
        onEssential={handleEssential}
      />
    </AnalyticsContext.Provider>
  );
}
