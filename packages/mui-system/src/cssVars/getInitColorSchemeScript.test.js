/* eslint-disable no-eval */
import { expect } from 'chai';
import { createRenderer } from 'test/utils';
import getInitColorSchemeScript, {
  DEFAULT_ATTRIBUTE,
  DEFAULT_MODE_STORAGE_KEY,
  DEFAULT_COLOR_SCHEME_STORAGE_KEY,
} from './getInitColorSchemeScript';

describe('getInitColorSchemeScript', () => {
  const { render } = createRenderer();
  let originalMatchmedia;
  let storage = {};
  const createMatchMedia = (matches) => () => ({
    matches,
    addListener: () => {},
    removeListener: () => {},
  });

  beforeEach(() => {
    // Create mocks of localStorage getItem and setItem functions
    Object.defineProperty(global, 'localStorage', {
      value: {
        getItem: (key) => storage[key],
      },
      configurable: true,
    });

    // clear the localstorage
    storage = {};
    document.documentElement.removeAttribute(DEFAULT_ATTRIBUTE);
    window.matchMedia = createMatchMedia(false);
  });
  afterEach(() => {
    window.matchMedia = originalMatchmedia;
  });

  it('should set `light` color scheme to body', () => {
    storage[DEFAULT_MODE_STORAGE_KEY] = 'light';
    storage[`${DEFAULT_COLOR_SCHEME_STORAGE_KEY}-light`] = 'foo';

    const { container } = render(getInitColorSchemeScript());
    eval(container.firstChild.textContent);
    expect(document.documentElement.getAttribute(DEFAULT_ATTRIBUTE)).to.equal('foo');
  });

  it('should set custom color scheme to body with custom attribute', () => {
    storage['mui-foo-mode'] = 'light';
    storage[`mui-bar-color-scheme-light`] = 'flash';

    const { container } = render(
      getInitColorSchemeScript({
        modeStorageKey: 'mui-foo-mode',
        colorSchemeStorageKey: 'mui-bar-color-scheme',
        attribute: 'data-mui-baz-scheme',
      }),
    );
    eval(container.firstChild.textContent);
    expect(document.documentElement.getAttribute('data-mui-baz-scheme')).to.equal('flash');
  });

  it('should set `dark` color scheme to body', () => {
    storage[DEFAULT_MODE_STORAGE_KEY] = 'dark';
    storage[`${DEFAULT_COLOR_SCHEME_STORAGE_KEY}-dark`] = 'bar';

    const { container } = render(getInitColorSchemeScript());
    eval(container.firstChild.textContent);
    expect(document.documentElement.getAttribute(DEFAULT_ATTRIBUTE)).to.equal('bar');
  });

  it('should set dark color scheme to body, given prefers-color-scheme is `dark`', () => {
    storage[DEFAULT_MODE_STORAGE_KEY] = 'system';
    storage[`${DEFAULT_COLOR_SCHEME_STORAGE_KEY}-dark`] = 'dim';
    window.matchMedia = createMatchMedia(true);

    const { container } = render(getInitColorSchemeScript());
    eval(container.firstChild.textContent);
    expect(document.documentElement.getAttribute(DEFAULT_ATTRIBUTE)).to.equal('dim');
  });

  it('should set light color scheme to body, given prefers-color-scheme is NOT `dark`', () => {
    storage[DEFAULT_MODE_STORAGE_KEY] = 'system';
    storage[`${DEFAULT_COLOR_SCHEME_STORAGE_KEY}-light`] = 'bright';
    window.matchMedia = createMatchMedia(false);

    const { container } = render(getInitColorSchemeScript());
    eval(container.firstChild.textContent);
    expect(document.documentElement.getAttribute(DEFAULT_ATTRIBUTE)).to.equal('bright');
  });

  it('defaultMode: `dark`', () => {
    const { container } = render(
      getInitColorSchemeScript({
        defaultMode: 'dark',
      }),
    );
    eval(container.firstChild.textContent);
    expect(document.documentElement.getAttribute(DEFAULT_ATTRIBUTE)).to.equal('dark');
  });

  describe('defaultMode: `system`', () => {
    it('should set dark color scheme to body, given prefers-color-scheme is `dark`', () => {
      window.matchMedia = createMatchMedia(true);

      const { container } = render(
        getInitColorSchemeScript({
          defaultMode: 'system',
          defaultDarkColorScheme: 'trueDark',
        }),
      );
      eval(container.firstChild.textContent);
      expect(document.documentElement.getAttribute(DEFAULT_ATTRIBUTE)).to.equal('trueDark');
    });

    it('should set light color scheme to body, given prefers-color-scheme is NOT `dark`', () => {
      window.matchMedia = createMatchMedia(false);

      const { container } = render(
        getInitColorSchemeScript({
          defaultMode: 'system',
          defaultLightColorScheme: 'yellow',
        }),
      );
      eval(container.firstChild.textContent);
      expect(document.documentElement.getAttribute(DEFAULT_ATTRIBUTE)).to.equal('yellow');
    });
  });
});
