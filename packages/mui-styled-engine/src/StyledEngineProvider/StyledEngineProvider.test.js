import * as React from 'react';
import { __unsafe_useEmotionCache } from '@emotion/react';
import { StyledEngineProvider, GlobalStyles } from '@mui/styled-engine';
import { createRenderer } from '@mui/internal-test-utils';
import { expect } from 'chai';
import { TEST_INTERNALS_DO_NOT_USE } from './StyledEngineProvider';

describe('[Emotion] StyledEngineProvider', () => {
  const { render } = createRenderer();

  let rule;

  before(() => {
    TEST_INTERNALS_DO_NOT_USE.insert = (...args) => {
      rule = args[0];
    };
  });

  after(() => {
    delete TEST_INTERNALS_DO_NOT_USE.insert;
  });

  beforeEach(() => {
    rule = undefined;
  });

  it('should create styles with @layer', () => {
    render(
      <StyledEngineProvider enableCssLayer>
        <GlobalStyles styles={{ html: { color: 'red' } }} />
      </StyledEngineProvider>,
    );
    expect(rule).to.equal('@layer mui{html{color:red;}}');
  });

  it('should not do anything if the style is layer order', () => {
    render(
      <StyledEngineProvider enableCssLayer>
        <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
      </StyledEngineProvider>,
    );
    expect(rule).to.equal('@layer theme,base,mui,components,utilities;');
  });

  it('should wrap @layer rule', () => {
    render(
      <StyledEngineProvider enableCssLayer>
        <GlobalStyles styles={{ '@layer components': { html: { color: 'red' } } }} />
      </StyledEngineProvider>,
    );
    expect(rule).to.equal('@layer mui{@layer components{html{color:red;}}}');
  });

  it('able to config layer order through GlobalStyles', () => {
    render(
      <StyledEngineProvider enableCssLayer>
        <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
      </StyledEngineProvider>,
    );
    expect(rule).to.equal('@layer theme,base,mui,components,utilities;');
  });

  it('should reuse the same cache', () => {
    let upperCache;
    let innerCache;
    function Upper() {
      const cache = __unsafe_useEmotionCache();
      upperCache = cache;
      return (
        <StyledEngineProvider injectFirst>
          <Inner />
        </StyledEngineProvider>
      );
    }
    function Inner() {
      const cache = __unsafe_useEmotionCache();
      innerCache = cache;
      return null;
    }
    render(
      <StyledEngineProvider injectFirst>
        <Upper />
      </StyledEngineProvider>,
    );
    expect(innerCache).to.equal(upperCache);
  });
});
