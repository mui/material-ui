import { afterAll, afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import * as React from 'react';
import { createRenderer, isJsdom, screen } from '@mui/internal-test-utils';
import { ThemeProvider } from '@mui/material/styles';
import PageContext from '../../PageContext';
import type { MuiPageContext } from '../../PageContext';
import { brandingLightTheme } from '../../branding';
import { UserLanguageProvider } from '../../i18n';
import { AppNavDrawer } from './AppNavDrawer';

vi.hoisted(() => vi.resetModules());
vi.mock('next/router', () => ({
  useRouter: () => ({ pathname: '/example/', asPath: '/example/' }),
}));

const noop = () => {};
const MOBILE_WIDTH = 412;
const DESKTOP_WIDTH = 1280;
const SAVED_SCROLL_TOP = 64;
const desktopQuery = brandingLightTheme.breakpoints.up('lg').replace('@media ', '');
const mobileQuery = brandingLightTheme.breakpoints.down('lg').replace('@media ', '');
const activePage = { pathname: '/example/', title: 'Example' };
const pageContext: MuiPageContext = {
  activePage,
  activePageParents: [activePage],
  pages: [activePage],
  productId: 'material-ui',
  productCategoryId: 'core',
  productIdentifier: { name: 'Material UI', metadata: '', versions: [] },
};
const scrollDescriptor = Object.getOwnPropertyDescriptor(Element.prototype, 'scrollIntoView');
const measure = vi.fn();
const scroll = vi.fn();
let viewportWidth = MOBILE_WIDTH;

function LayoutProbe({ onLayout }: { onLayout?: () => void }) {
  React.useLayoutEffect(() => {
    onLayout?.();
  }, [onLayout]);
  return null;
}

function drawer(open: 'closed' | 'open' = 'closed', onLayout?: () => void) {
  return (
    <UserLanguageProvider defaultUserLanguage="en">
      <ThemeProvider theme={brandingLightTheme}>
        <PageContext.Provider value={pageContext}>
          <AppNavDrawer
            disablePermanent={false}
            mobileOpen={open === 'open'}
            onClose={noop}
            onOpen={noop}
          />
          <LayoutProbe onLayout={onLayout} />
        </PageContext.Provider>
      </ThemeProvider>
    </UserLanguageProvider>
  );
}

beforeEach(() => {
  const queries = new Map<string, MediaQueryList>();
  vi.stubGlobal('matchMedia', (query: string) => {
    if (!queries.has(query)) {
      queries.set(query, {
        matches:
          query === desktopQuery
            ? viewportWidth >= brandingLightTheme.breakpoints.values.lg
            : query === mobileQuery && viewportWidth < brandingLightTheme.breakpoints.values.lg,
        media: query,
        onchange: null,
        addEventListener: noop,
        removeEventListener: noop,
        addListener: noop,
        removeListener: noop,
        dispatchEvent: () => true,
      });
    }
    return queries.get(query);
  });
  const getRect = Element.prototype.getBoundingClientRect;
  vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function getRectMock(
    this: Element,
  ) {
    if (this.classList.contains('app-drawer-active')) {
      measure();
      return {
        x: 0,
        y: -20,
        top: -20,
        bottom: 0,
        left: 0,
        right: 20,
        width: 20,
        height: 20,
        toJSON: noop,
      };
    }
    return getRect.call(this);
  });
  Object.defineProperty(Element.prototype, 'scrollIntoView', {
    configurable: true,
    value(this: Element) {
      if (this.classList.contains('app-drawer-active')) {
        scroll();
      }
    },
  });
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  measure.mockClear();
  scroll.mockClear();
  if (scrollDescriptor) {
    Object.defineProperty(Element.prototype, 'scrollIntoView', scrollDescriptor);
  } else {
    Reflect.deleteProperty(Element.prototype, 'scrollIntoView');
  }
});
afterAll(() => vi.resetModules());

describe.skipIf(!isJsdom())('AppNavDrawer scroll restoration', () => {
  const { render, renderToString } = createRenderer();

  it('waits until a closed mobile drawer opens before measuring the active link', () => {
    viewportWidth = MOBILE_WIDTH;
    const { hydrate } = renderToString(drawer());
    const { rerender } = hydrate();

    expect(measure).not.toHaveBeenCalled();
    expect(scroll).not.toHaveBeenCalled();

    rerender(drawer('open'));

    expect(measure).toHaveBeenCalled();
    expect(scroll).toHaveBeenCalled();
  });

  it('restores desktop scrolling and keeps the active link visible', () => {
    viewportWidth = DESKTOP_WIDTH;
    const layoutReads = vi.fn();
    const matchMedia = window.matchMedia;
    vi.stubGlobal('matchMedia', undefined);
    const { hydrate } = renderToString(
      drawer('closed', () => layoutReads(measure.mock.calls.length)),
    );
    vi.stubGlobal('matchMedia', matchMedia);
    const { unmount } = hydrate();

    expect(layoutReads.mock.calls[0][0]).toBeGreaterThan(0);

    const link = screen.getByRole('link', { name: 'Example' });
    const scroller = link.closest('ul')!.parentElement!.parentElement!;
    scroller.scrollTop = SAVED_SCROLL_TOP;
    unmount();
    measure.mockClear();
    scroll.mockClear();

    render(drawer());

    const restored = screen.getByRole('link', { name: 'Example' }).closest('ul')!.parentElement!
      .parentElement!;
    expect(restored.scrollTop).toBe(SAVED_SCROLL_TOP);
    expect(measure).toHaveBeenCalled();
    expect(scroll).toHaveBeenCalled();
  });
});
