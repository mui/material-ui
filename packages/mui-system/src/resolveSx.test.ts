// src/system/resolveSx.test.ts

import { expect } from 'chai';
import { resolveSx } from './sx';
import { createTheme } from '@mui/material/styles';

describe('resolveSx', () => {
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
    containerQueries: {
      up: (key: string) => `@container ${key}`,
    },
  });

  it('should resolve normal sx properties', () => {
    const inputSx = { color: 'red', padding: '10px' };
    const output = resolveSx(theme, inputSx);

    expect(output).to.deep.equal({
      color: 'red',
      padding: '10px',
    });
  });

  it('should resolve container queries using breakpoints', () => {
    const inputSx = {
      color: 'blue',
      sm: {
        color: 'green',
      },
      md: {
        padding: '20px',
      },
    };
    const output = resolveSx(theme, inputSx);

    expect(output).to.deep.equal({
      color: 'blue',
      '@container sm': {
        color: 'green',
      },
      '@container md': {
        padding: '20px',
      },
    });
  });

  it('should handle nested container queries', () => {
    const inputSx = {
      sm: {
        md: {
          color: 'yellow',
        },
      },
    };
    const output = resolveSx(theme, inputSx);

    expect(output).to.deep.equal({
      '@container sm': {
        '@container md': {
          color: 'yellow',
        },
      },
    });
  });

  it('should warn if containerQueries.up is not available', () => {
    const faultyTheme = createTheme({
      breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 900,
        },
      },
    });

    const inputSx = {
      sm: {
        color: 'pink',
      },
    };

    const consoleWarnStub = sinon.stub(console, 'warn');
    resolveSx(faultyTheme, inputSx);

    expect(consoleWarnStub.calledOnce).to.be.true;
    expect(consoleWarnStub.firstCall.args[0]).to.include('MUI: containerQueries.up("sm") not available on the theme.');

    consoleWarnStub.restore();
  });
});
