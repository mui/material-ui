import path from 'node:path';
import { runTransformation, expect } from '../testUtils';

const theme = {
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
};

describe('Pigment CSS - css', () => {
  it('basics', async () => {
    const { output, fixture } = await runTransformation(
      path.join(__dirname, 'fixtures/css.input.js'),
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
