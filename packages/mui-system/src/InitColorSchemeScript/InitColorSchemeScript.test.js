/* eslint-disable no-eval */
import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import InitColorSchemeScript, {
  DEFAULT_ATTRIBUTE,
  DEFAULT_MODE_STORAGE_KEY,
  DEFAULT_COLOR_SCHEME_STORAGE_KEY,
} from './InitColorSchemeScript';

describe('InitColorSchemeScript', () => {
  const { render } = createRenderer();
  let originalMatchmedia;
  let storage = {};
  const createMatchMedia = (matches) => () => ({
    matches,
    addEventListener: () => {},
    removeEventListener: () => {},
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

    const { container } = render(<InitColorSchemeScript />);
    eval(container.firstChild.textContent);
    expect(document.documentElement.getAttribute(DEFAULT_ATTRIBUTE)).to.equal('foo');
  });

  it('should set `light` color scheme with class', () => {
    storage[DEFAULT_MODE_STORAGE_KEY] = 'light';
    storage[`${DEFAULT_COLOR_SCHEME_STORAGE_KEY}-light`] = 'foo';
    document.documentElement.classList.remove(...document.documentElement.classList);

    const { container } = render(<InitColorSchemeScript attribute="class" />);
    eval(container.firstChild.textContent);
    expect(document.documentElement.classList.value).to.equal('foo');
    document.documentElement.classList.remove('foo'); // cleanup
  });

  it('should set `light` color scheme with data', () => {
    storage[DEFAULT_MODE_STORAGE_KEY] = 'light';
    storage[`${DEFAULT_COLOR_SCHEME_STORAGE_KEY}-light`] = 'foo';

    const { container } = render(<InitColorSchemeScript attribute="data" />);
    eval(container.firstChild.textContent);
    expect(document.documentElement.getAttribute('data-foo')).to.equal('');
  });

  it('should set custom color scheme to body with custom attribute', () => {
    storage['mui-foo-mode'] = 'light';
    storage[`mui-bar-color-scheme-light`] = 'flash';

    const { container } = render(
      <InitColorSchemeScript
        modeStorageKey="mui-foo-mode"
        colorSchemeStorageKey="mui-bar-color-scheme"
        attribute="data-mui-baz-scheme"
      />,
    );
    eval(container.firstChild.textContent);
    expect(document.documentElement.getAttribute('data-mui-baz-scheme')).to.equal('flash');
  });

  it('should switch between light and dark with class attribute', () => {
    storage[DEFAULT_MODE_STORAGE_KEY] = 'light';
    storage[`${DEFAULT_COLOR_SCHEME_STORAGE_KEY}-light`] = 'foo';
    storage[`${DEFAULT_COLOR_SCHEME_STORAGE_KEY}-dark`] = 'bar';

    const { container, rerender } = render(<InitColorSchemeScript attribute=".mode-%s" />);
    eval(container.firstChild.textContent);
    expect(document.documentElement.classList.value).to.equal('mode-foo');

    storage[DEFAULT_MODE_STORAGE_KEY] = 'dark';
    rerender(<InitColorSchemeScript attribute=".mode-%s" />);
    eval(container.firstChild.textContent);
    expect(document.documentElement.classList.value).to.equal('mode-bar');

    document.documentElement.classList.remove('mode-bar'); // cleanup
  });

  it('should switch between light and dark with data-%s attribute', () => {
    storage[DEFAULT_MODE_STORAGE_KEY] = 'light';
    storage[`${DEFAULT_COLOR_SCHEME_STORAGE_KEY}-light`] = 'foo';
    storage[`${DEFAULT_COLOR_SCHEME_STORAGE_KEY}-dark`] = 'bar';

    const { container, rerender } = render(<InitColorSchemeScript attribute="[data-mode-%s]" />);
    eval(container.firstChild.textContent);
    expect(document.documentElement.getAttribute('data-mode-foo')).to.equal('');
    expect(document.documentElement.getAttribute('data-mode-bar')).to.equal(null);

    storage[DEFAULT_MODE_STORAGE_KEY] = 'dark';
    rerender(<InitColorSchemeScript attribute="[data-mode-%s]" />);
    eval(container.firstChild.textContent);
    expect(document.documentElement.getAttribute('data-mode-bar')).to.equal('');
    expect(document.documentElement.getAttribute('data-mode-foo')).to.equal(null);
  });

  it('should switch between light and dark with data="%s" attribute', () => {
    storage[DEFAULT_MODE_STORAGE_KEY] = 'light';
    storage[`${DEFAULT_COLOR_SCHEME_STORAGE_KEY}-light`] = 'foo';
    storage[`${DEFAULT_COLOR_SCHEME_STORAGE_KEY}-dark`] = 'bar';

    const { container, rerender } = render(<InitColorSchemeScript attribute="[data-mode='%s']" />);
    eval(container.firstChild.textContent);
    expect(document.documentElement.getAttribute('data-mode')).to.equal('foo');

    storage[DEFAULT_MODE_STORAGE_KEY] = 'dark';
    rerender(<InitColorSchemeScript attribute="[data-mode='%s']" />);
    eval(container.firstChild.textContent);
    expect(document.documentElement.getAttribute('data-mode')).to.equal('bar');
  });

  it('should set `dark` color scheme to body', () => {
    storage[DEFAULT_MODE_STORAGE_KEY] = 'dark';
    storage[`${DEFAULT_COLOR_SCHEME_STORAGE_KEY}-dark`] = 'bar';

    const { container } = render(<InitColorSchemeScript />);
    eval(container.firstChild.textContent);
    expect(document.documentElement.getAttribute(DEFAULT_ATTRIBUTE)).to.equal('bar');
  });

  it('should set dark color scheme to body, given prefers-color-scheme is `dark`', () => {
    storage[DEFAULT_MODE_STORAGE_KEY] = 'system';
    storage[`${DEFAULT_COLOR_SCHEME_STORAGE_KEY}-dark`] = 'dim';
    window.matchMedia = createMatchMedia(true);

    const { container } = render(<InitColorSchemeScript />);
    eval(container.firstChild.textContent);
    expect(document.documentElement.getAttribute(DEFAULT_ATTRIBUTE)).to.equal('dim');
  });

  it('should set light color scheme to body, given prefers-color-scheme is NOT `dark`', () => {
    storage[DEFAULT_MODE_STORAGE_KEY] = 'system';
    storage[`${DEFAULT_COLOR_SCHEME_STORAGE_KEY}-light`] = 'bright';
    window.matchMedia = createMatchMedia(false);

    const { container } = render(<InitColorSchemeScript />);
    eval(container.firstChild.textContent);
    expect(document.documentElement.getAttribute(DEFAULT_ATTRIBUTE)).to.equal('bright');
  });

  describe('system preference', () => {
    it('should set dark color scheme to body, given prefers-color-scheme is `dark`', () => {
      window.matchMedia = createMatchMedia(true);

      const { container } = render(<InitColorSchemeScript defaultDarkColorScheme="trueDark" />);
      eval(container.firstChild.textContent);
      expect(document.documentElement.getAttribute(DEFAULT_ATTRIBUTE)).to.equal('trueDark');
    });

    it('should set light color scheme to body, given prefers-color-scheme is NOT `dark`', () => {
      window.matchMedia = createMatchMedia(false);

      const { container } = render(<InitColorSchemeScript defaultLightColorScheme="yellow" />);
      eval(container.firstChild.textContent);
      expect(document.documentElement.getAttribute(DEFAULT_ATTRIBUTE)).to.equal('yellow');
    });
  });
});
