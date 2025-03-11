import * as React from 'react';
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

  it('should do nothing if the styles already in a layer', () => {
    render(
      <StyledEngineProvider enableCssLayer>
        <GlobalStyles styles={{ '@layer components': { html: { color: 'red' } } }} />
      </StyledEngineProvider>,
    );
    expect(rule).to.equal('@layer components{html{color:red;}}');
  });

  it('able to config layer order through GlobalStyles', () => {
    render(
      <StyledEngineProvider enableCssLayer>
        <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
      </StyledEngineProvider>,
    );
    expect(rule).to.equal('@layer theme,base,mui,components,utilities;');
  });
});
