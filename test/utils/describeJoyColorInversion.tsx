import * as React from 'react';
import { expect } from 'chai';
import { ThemeProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import { createRenderer } from './createRenderer';

export default function describeJoyColorInversion(
  element: React.ReactElement,
  options: {
    muiName: string;
    classes: { colorContext: string; colorPrimary: string; colorSuccess: string };
  },
) {
  const { render } = createRenderer();
  describe('Joy Color Inversion', () => {
    describe('Feature enabled', () => {
      it('implicit color value', () => {
        const { container } = render(
          <ThemeProvider>
            <Sheet invertedColors variant="solid" color="primary">
              {element}
            </Sheet>
          </ThemeProvider>,
        );
        expect(container.firstChild?.firstChild).to.have.class(options.classes.colorContext);
      });

      it('implicit color with theme default color', () => {
        const { getByTestId } = render(
          <ThemeProvider
            theme={{
              components: {
                [options.muiName]: {
                  defaultProps: {
                    color: 'success',
                  },
                },
              },
            }}
          >
            {React.cloneElement(element, { color: 'success', 'data-testid': 'element' })}
            <Sheet data-testid="sheet" invertedColors variant="solid" color="primary">
              {React.cloneElement(element)}
            </Sheet>
          </ThemeProvider>,
        );
        expect(getByTestId('element')).to.have.class(options.classes.colorSuccess);
        expect(getByTestId('sheet')?.firstChild).to.have.class(options.classes.colorContext);
      });
    });

    it('should use instance color', () => {
      const { container } = render(
        <ThemeProvider>
          <Sheet invertedColors variant="solid" color="primary">
            {React.cloneElement(element, { color: 'primary' })}
          </Sheet>
        </ThemeProvider>,
      );
      expect(container.firstChild?.firstChild).to.have.class(options.classes.colorPrimary);
    });
  });
}
