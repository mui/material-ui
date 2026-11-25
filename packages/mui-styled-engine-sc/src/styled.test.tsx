import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { StyleSheetManager } from 'styled-components';
import { createRenderer, screen } from '@mui/internal-test-utils';
import styled, { internal_useStyleCache as useStyleCache } from '@mui/styled-engine-sc';

describe('styled', () => {
  const { render } = createRenderer();

  it('should help debug wrong args', () => {
    expect(() => {
      expect(() => {
        (styled('span') as any)();
        // Error message changes between browsers.
        // It's not relevant to the test anyway.
      }).to.throw();
    }).toErrorDev('MUI: Seems like you called `styled("span")()` without a `style` argument');

    expect(() => {
      expect(() => {
        (styled('span') as any)(undefined, { color: 'red' });
        // Error message changes between browsers.
        // It's not relevant to the test anyway.
      }).to.throw();
    }).toErrorDev('MUI: the styled("span")(...args) API requires all its args to be defined');
  });

  it('should respect the options', () => {
    const StyledComponent = (styled as any)('div', {
      shouldForwardProp: (prop: PropertyKey) => prop !== 'color',
      label: 'TestComponent',
    })({ color: 'red' }) as any;

    render(<StyledComponent data-testid="component" color="blue" />);

    expect(screen.getByTestId('component')).not.to.have.attribute('color');
    expect(screen.getByTestId('component').className).to.match(/^TestComponent-/);
  });

  it("should not allow styled-components's APIs: .attrs", () => {
    expect(typeof styled('span').attrs).to.equal('undefined');
  });

  // The babel-plugin-styled-components depends on the withConfig option to be defined
  it("should allow styled-components's APIs: .withConfig", () => {
    expect(typeof styled('span').withConfig).to.equal('function');
  });
});

describe('internal_useStyleCache', () => {
  const { render } = createRenderer();

  it('returns a cache for each style sheet and each way to compile the styles', () => {
    const caches: Record<string, object | null> = {};
    function Cache(props: { name: string }) {
      caches[props.name] = useStyleCache();
      return null;
    }
    const target = document.createElement('div');
    const { setProps } = render(
      <React.Fragment>
        <Cache name="page" />
        <Cache name="samePage" />
        <StyleSheetManager target={target}>
          <Cache name="target" />
        </StyleSheetManager>
        {/* It keeps the style sheet of the page and prefixes the selectors. */}
        <StyleSheetManager namespace="#widget">
          <Cache name="namespace" />
        </StyleSheetManager>
      </React.Fragment>,
    );
    const { page } = caches;
    expect(page).not.to.equal(null);
    expect(caches.samePage).to.equal(page);
    expect(caches.target).not.to.equal(page);
    expect(caches.namespace).not.to.equal(page);
    expect(caches.namespace).not.to.equal(caches.target);
    setProps({});
    expect(caches.page).to.equal(page);
  });
});
