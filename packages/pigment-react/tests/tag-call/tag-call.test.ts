import path from 'node:path';
import { createTheme } from '@mui/material/styles';
import { runTransformation, expect } from '../testUtils';

const defaultTheme = createTheme();

const theme = {
  transitions: defaultTheme.transitions,
  opacity: {
    translucent: 0.3,
  },
};

describe('Pigment CSS - Tagged Template Call', () => {
  it('should transform correctly', async () => {
    const { output, fixture } = await runTransformation(
      path.join(__dirname, 'fixtures/tag-call.input.js'),
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
