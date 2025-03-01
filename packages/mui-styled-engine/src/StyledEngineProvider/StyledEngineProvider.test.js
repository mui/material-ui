import * as React from 'react';
import { StyledEngineProvider, GlobalStyles } from '@mui/styled-engine';
import { createRenderer } from '@mui/internal-test-utils';
import { expect } from 'chai';
import { privateForTest } from './StyledEngineProvider';

describe('[Emotion] StyledEngineProvider', () => {
  const { render } = createRenderer();

  it('should create styles with @layer', () => {
    let rule;
    privateForTest.insert = (...args) => {
      rule = args[0];
    };
    render(
      <StyledEngineProvider enableCssLayer>
        <GlobalStyles styles={{ html: { color: 'red' } }} />
      </StyledEngineProvider>,
    );
    expect(rule).to.equal('@layer mui{html{color:red;}}');
    delete privateForTest.insert;
  });

  it('should do nothing if the styles already in a layer', () => {
    let rule;
    privateForTest.insert = (...args) => {
      rule = args[0];
    };
    render(
      <StyledEngineProvider enableCssLayer>
        <GlobalStyles styles={{ '@layer components': { html: { color: 'red' } } }} />
      </StyledEngineProvider>,
    );
    expect(rule).to.equal('@layer components{html{color:red;}}');
    delete privateForTest.insert;
  });

  it('able to config layer order through GlobalStyles', () => {
    let rule;
    privateForTest.insert = (...args) => {
      rule = args[0];
    };
    render(
      <StyledEngineProvider enableCssLayer>
        <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
      </StyledEngineProvider>,
    );
    expect(rule).to.equal('@layer theme,base,mui,components,utilities;');
    delete privateForTest.insert;
  });
});
