import path from 'node:path';
import { runTransformation, expect } from '../testUtils';

describe('Pigment CSS - keyframes', () => {
  it('basics', async () => {
    const { output, fixture } = await runTransformation(
      path.join(__dirname, 'fixtures/keyframes.input.js'),
    );

    expect(output.js).to.equal(fixture.js);
    expect(output.css).to.equal(fixture.css);
  });

  it('should transform correctly with theme', async () => {
    const { output, fixture } = await runTransformation(
      path.join(__dirname, 'fixtures/keyframes-theme.input.js'),
      {
        themeArgs: {
          theme: {
            palette: {
              primary: {
                main: 'red',
              },
              secondary: {
                main: 'blue',
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
