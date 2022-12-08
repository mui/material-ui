import * as React from 'react';
import { expect } from 'chai';
import { ThemeProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import { createRenderer, MuiRenderResult } from './createRenderer';

/**
 * Test suite for checking the color inversion conformance for a component.
 *
 * Specify the `data-testid="test-element"` to the slot that apply `colorContext` className
 * otherwise the root slot will be used as a test element.
 */
export default function describeJoyColorInversion(
  element: React.ReactElement,
  options: {
    muiName: string;
    classes: { colorContext: string; colorPrimary: string; colorSuccess: string };
  },
) {
  const { render } = createRenderer();
  const getTestElement = (result: MuiRenderResult) => {
    const { container, queryByTestId } = result;
    return queryByTestId('test-element') ?? container.firstChild?.firstChild;
  };
  describe('Joy Color Inversion', () => {
    describe('Feature enabled', () => {
      it('implicit color value', () => {
        const result = render(
          <ThemeProvider>
            <Sheet invertedColors variant="solid" color="primary">
              {element}
            </Sheet>
          </ThemeProvider>,
        );
        expect(getTestElement(result)).to.have.class(options.classes.colorContext);
      });

      it('implicit color with theme default color', () => {
        const result = render(
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
            <Sheet invertedColors variant="solid" color="primary">
              {React.cloneElement(element)}
            </Sheet>
          </ThemeProvider>,
        );
        expect(getTestElement(result)).to.have.class(options.classes.colorContext);
      });
    });

    it('should use instance color', () => {
      const result = render(
        <ThemeProvider>
          <Sheet invertedColors variant="solid" color="primary">
            {React.cloneElement(element, { color: 'primary' })}
          </Sheet>
        </ThemeProvider>,
      );
      expect(getTestElement(result)).to.have.class(options.classes.colorPrimary);
    });
  });
}
