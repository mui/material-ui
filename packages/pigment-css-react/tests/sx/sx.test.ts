import path from 'node:path';
import { extendTheme } from '@pigment-css/react/utils';
import { runTransformation, expect } from '../testUtils';

const theme = extendTheme({
  palette: {
    primary: {
      main: 'red',
    },
  },
  size: {
    font: {
      h1: '3rem',
    },
  },
  components: {
    MuiSlider: {
      styleOverrides: {
        rail: {
          fontSize: '3rem',
        },
      },
    },
  },
});

describe('Pigment CSS - sx prop', () => {
  it('sx prop with logical and conditional expressions', async () => {
    const { output, fixture } = await runTransformation(
      path.join(__dirname, 'fixtures/sxProps.input.js'),
      {
        themeArgs: {
          theme,
        },
      },
    );

    expect(output.js).to.equal(fixture.js);
    expect(output.css).to.equal(fixture.css);
  });

  it('sx prop with theme spread', async () => {
    const { output, fixture } = await runTransformation(
      path.join(__dirname, 'fixtures/sxProps2.input.js'),
      {
        themeArgs: {
          theme,
        },
      },
    );

    expect(output.js).to.equal(fixture.js);
    expect(output.css).to.equal(fixture.css);
  });
});
