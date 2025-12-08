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
    <Dialog
      open={open}
      hideBackdrop
      disableScrollLock
      disableEscapeKeyDown
      sx={{
        pointerEvents: 'none',
        '& .MuiDialog-container': {
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        },
        '& .MuiPaper-root': {
          pointerEvents: 'auto',
          m: 2,
          maxWidth: 340,
        },
      }}
      aria-labelledby="cookie-consent-dialog-title"
      aria-describedby="cookie-consent-dialog-description"
    >
      <DialogTitle id="cookie-consent-dialog-title" sx={{ pb: 1 }}>
        Cookie Preferences
      </DialogTitle>
      <DialogContent sx={{ pb: 1 }}>
        <DialogContentText id="cookie-consent-dialog-description" variant="body2">
          We use cookies to understand site usage and improve our content. This includes third-party
          analytics.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onEssential} color="inherit" size="small">
          Essential only
        </Button>
        <Button onClick={onAnalytics} variant="contained" size="small">
          Allow analytics
        </Button>
      </DialogActions>
    </Dialog>
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
