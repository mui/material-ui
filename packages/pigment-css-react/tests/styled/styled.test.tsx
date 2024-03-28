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
          fontSize: '1.5rem',
        },
      },
    },
  },
};

describe('Pigment CSS - styled', () => {
  it('basics', async () => {
    const { output, fixture } = await runTransformation(
      path.join(__dirname, 'fixtures/styled.input.js'),
    );

    expect(output.js).to.equal(fixture.js);
    expect(output.css).to.equal(fixture.css);
  });

  it('should work with theme', async () => {
    const { output, fixture } = await runTransformation(
      path.join(__dirname, 'fixtures/styled-theme.input.js'),
      {
        themeArgs: {
          theme,
        },
      },
    );

    expect(output.js).to.equal(fixture.js);
    expect(output.css).to.equal(fixture.css);
  });

  it('should work with theme and rtl', async () => {
    const { output, fixture } = await runTransformation(
      path.join(__dirname, 'fixtures/styled-rtl.input.js'),
      {
        themeArgs: {
          theme,
        },
        css: {
          defaultDirection: 'ltr',
          generateForBothDir: true,
          getDirSelector(dir) {
            return `:dir(${dir})`;
          },
        },
      },
    );

    expect(output.js).to.equal(fixture.js);
    expect(output.css).to.equal(fixture.css);
  });

  it('should work with variants', async () => {
    const { output, fixture } = await runTransformation(
      path.join(__dirname, 'fixtures/styled-variants.input.js'),
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
