import * as React from 'react';
import { expect } from 'chai';
import { ThemeProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import { createRenderer } from './createRenderer';

export default function describeJoyColorInversion(
  element: React.ReactElement,
  options: { classes: { colorContext: string } },
) {
  const { render } = createRenderer();
  describe('Joy Color Inversion', () => {
    it('should have color `context` if the feature is enabled with implicit color', () => {
      const { container } = render(
        <ThemeProvider>
          <Sheet invertedColors variant="solid" color="primary">
            {element}
          </Sheet>
        </ThemeProvider>,
      );
      expect(container.firstChild?.firstChild).to.have.class(options.classes.colorContext);
    });
  });
}
