import path from 'node:path';
import { experimental_extendTheme as extendTheme } from '@mui/material/styles';
import { runTransformation, expect } from '../testUtils';

const theme = extendTheme();
theme.palette = theme.colorSchemes.light.palette;

const baseOptions = {
  outputDir: path.join(__dirname, 'fixtures'),
  themeArgs: {
    theme,
  },
  disableJs: true,
};

describe('Pigment CSS - Material UI', () => {
  it('Alert', async () => {
    const { output, fixture } = await runTransformation(
      path.join(process.cwd(), 'packages/mui-material/src/Alert/Alert.js'),
      baseOptions,
    );

    expect(output.css).to.equal(fixture.css);
  });

  it('Avatar', async () => {
    const { output, fixture } = await runTransformation(
      path.join(process.cwd(), 'packages/mui-material/src/Avatar/Avatar.js'),
      baseOptions,
    );

    expect(output.css).to.equal(fixture.css);
  });

  it('Badge', async () => {
    const { output, fixture } = await runTransformation(
      path.join(process.cwd(), 'packages/mui-material/src/Badge/Badge.js'),
      baseOptions,
    );

    expect(output.css).to.equal(fixture.css);
  });
});
