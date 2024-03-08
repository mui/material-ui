import path from 'node:path';
import { expect } from 'chai';
import { runTransformation } from '../testUtils';

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

const CUSTOM_ERROR =
  'The file contents have changed. Run "test:update" command to update the file if this is expected.';

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

    expect(output.js, CUSTOM_ERROR).to.equal(fixture.js);
    expect(output.css, CUSTOM_ERROR).to.equal(fixture.css);
  });
});
