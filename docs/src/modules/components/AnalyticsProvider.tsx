import * as React from 'react';
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

export function useDoNotTrack(): boolean {
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
  const [consentStatus] = useLocalStorageState(COOKIE_CONSENT_KEY, null);
  const doNotTrack = useDoNotTrack();

  // Update Google consent when status changes or on mount if already set
  React.useEffect(() => {
    if (doNotTrack) {
      // DNT is enabled - always deny analytics
      updateGoogleConsent(false);
    } else if (consentStatus !== null) {
      updateGoogleConsent(consentStatus === 'analytics');
    }
  }, [consentStatus, doNotTrack]);

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
    </AnalyticsContext.Provider>
  );
}
