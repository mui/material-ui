import path from 'node:path';
import { runTransformation, expect } from '../testUtils';

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
          theme: {
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
          },
        },
      },
    );

    expect(output.js).to.equal(fixture.js);
    expect(output.css).to.equal(fixture.css);
  });
});
