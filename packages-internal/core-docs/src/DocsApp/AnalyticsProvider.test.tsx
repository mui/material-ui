import * as React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, createRenderer, screen, waitFor } from '@mui/internal-test-utils';
import Router from 'next/router';
import { AnalyticsProvider } from './AnalyticsProvider';

vi.mock('../branding/BrandingCssVarsProvider', async (importOriginal) => ({
  ...(await importOriginal<typeof import('../branding/BrandingCssVarsProvider')>()),
  BrandingCssThemeProvider: ({ children }: { children: React.ReactNode }) => children,
}));

describe('AnalyticsProvider', () => {
  const { render } = createRenderer();
  const doNotTrackDescriptor = Object.getOwnPropertyDescriptor(navigator, 'doNotTrack');

  async function findDialog() {
    return waitFor(async () => {
      await act(async () => {
        await vi.advanceTimersByTimeAsync(32);
      });
      return screen.getByRole('dialog');
    });
  }

  beforeEach(() => {
    // Advance the opening animation explicitly, including in background browser tabs.
    vi.useFakeTimers({ toFake: ['requestAnimationFrame', 'cancelAnimationFrame'] });
    const storage = new Map<string, string>();
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => storage.set(key, value),
      removeItem: (key: string) => storage.delete(key),
    });
    Object.defineProperty(navigator, 'doNotTrack', { configurable: true, value: '0' });
    window.history.replaceState(null, '', '/');
    vi.stubGlobal('gtag', vi.fn());
  });

  afterEach(() => {
    window.localStorage.removeItem('docs-cookie-consent');
    window.history.replaceState(null, '', '/');
    if (doNotTrackDescriptor) {
      Object.defineProperty(navigator, 'doNotTrack', doNotTrackDescriptor);
    } else {
      Reflect.deleteProperty(navigator, 'doNotTrack');
    }
    vi.useRealTimers();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it.each(['analytics', 'essential'])('reopens saved %s consent on page load', async (consent) => {
    window.localStorage.setItem('docs-cookie-consent', consent);
    window.history.replaceState({ existing: true }, '', '/material-ui/?test=1#cookie-preferences');
    const { user } = render(<AnalyticsProvider>{null}</AnalyticsProvider>);

    await findDialog();
    expect(screen.getByRole('dialog')).toHaveAccessibleDescription(
      `We use cookies to understand site usage and improve our content. This includes third-party analytics. Current preference: ${consent === 'analytics' ? 'Analytics allowed' : 'Essential only'}`,
    );
    expect(window.localStorage.getItem('docs-cookie-consent')).to.equal(consent);
    await user.click(screen.getByRole('button', { name: 'Essential only' }));

    await waitFor(() => expect(screen.queryByRole('dialog')).to.equal(null));
    expect(window.localStorage.getItem('docs-cookie-consent')).to.equal('essential');
    expect(window.location.pathname + window.location.search).to.equal('/material-ui/?test=1');
    expect(window.location.hash).to.equal('');
    expect(window.history.state).to.deep.equal({ existing: true });
    expect(window.gtag).toHaveBeenLastCalledWith('consent', 'update', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
    });
  });

  it('does not show a current preference before the first choice', async () => {
    render(<AnalyticsProvider>{null}</AnalyticsProvider>);
    await findDialog();
    expect(screen.queryByText(/Current preference:/)).to.equal(null);
  });

  it('allows reopening repeatedly through a hash link', async () => {
    window.localStorage.setItem('docs-cookie-consent', 'essential');
    const { user } = render(
      <AnalyticsProvider>
        <a href="#cookie-preferences">Cookie settings</a>
      </AnalyticsProvider>,
    );
    expect(screen.queryByRole('dialog')).to.equal(null);

    const reopenAndAccept = async (currentPreference: string) => {
      await user.click(screen.getByRole('link', { name: 'Cookie settings' }));
      await findDialog();
      expect(screen.getByText(`Current preference: ${currentPreference}`)).not.to.equal(null);
      await user.click(screen.getByRole('button', { name: 'Allow analytics' }));
      await waitFor(() => expect(screen.queryByRole('dialog')).to.equal(null));
      expect(window.localStorage.getItem('docs-cookie-consent')).to.equal('analytics');
    };
    await reopenAndAccept('Essential only');
    await reopenAndAccept('Analytics allowed');
  });

  it.each(['hashChangeComplete', 'routeChangeComplete'] as const)(
    'opens after Next.js %s navigation',
    async (event) => {
      window.localStorage.setItem('docs-cookie-consent', 'essential');
      render(<AnalyticsProvider>{null}</AnalyticsProvider>);
      act(() => {
        window.history.pushState(null, '', '/#cookie-preferences');
        Router.events.emit(event, '/#cookie-preferences', { shallow: false });
      });
      await findDialog();
    },
  );

  it('ignores unrelated hashes', () => {
    window.localStorage.setItem('docs-cookie-consent', 'essential');
    window.history.replaceState(null, '', '/#other-section');
    render(<AnalyticsProvider>{null}</AnalyticsProvider>);
    expect(screen.queryByRole('dialog')).to.equal(null);
  });

  it('continues to respect Do Not Track', () => {
    Object.defineProperty(navigator, 'doNotTrack', { configurable: true, value: '1' });
    window.history.replaceState(null, '', '/#cookie-preferences');
    render(<AnalyticsProvider>{null}</AnalyticsProvider>);
    expect(screen.queryByRole('dialog')).to.equal(null);
    expect(window.gtag).toHaveBeenLastCalledWith('consent', 'update', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
    });
  });
});
