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

describe('Pigment CSS - styled', () => {
  it('basics', async () => {
    const { output, fixture } = await runTransformation('./fixtures/keyframes.input.js', {
      themeArgs: {
        theme,
      },
    });

    expect(output.js, CUSTOM_ERROR).to.equal(fixture.js);
    expect(output.css, CUSTOM_ERROR).to.equal(fixture.css);
  });
});
