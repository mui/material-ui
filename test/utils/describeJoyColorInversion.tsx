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
    wrapper?: (node: React.ReactElement) => React.ReactElement;
    portalSlot?: string;
  },
) {
  const { classes, muiName, wrapper = (node) => node, portalSlot } = options;
  const { render } = createRenderer();
  const getTestElement = (result: MuiRenderResult, id = '') => {
    const { container, queryByTestId } = result;
    let testElement = queryByTestId('test-element') ?? container.firstChild?.firstChild;
    if (id) {
      testElement = queryByTestId(id) ?? testElement;
    }
    return testElement;
  };
  describe('Color Inversion', () => {
    describe('Feature enabled', () => {
      it('implicit color value', () => {
        const result = render(
          <ThemeProvider>
            <Sheet invertedColors variant="solid" color="primary">
              {wrapper(element)}
            </Sheet>
          </ThemeProvider>,
        );
        expect(getTestElement(result)).to.have.class(classes.colorContext);
      });

      it('implicit color with theme default color', () => {
        const result = render(
          <ThemeProvider
            theme={{
              components: {
                [muiName]: {
                  defaultProps: {
                    color: 'success',
                  },
                },
              },
            }}
          >
            <Sheet invertedColors variant="solid" color="primary">
              {wrapper(element)}
            </Sheet>
          </ThemeProvider>,
        );
        expect(getTestElement(result)).to.have.class(classes.colorContext);
      });
    });

    describe('Portal slot', () => {
      if (!portalSlot) {
        return;
      }

      const getProps = (disablePortal: boolean) =>
        portalSlot === 'root'
          ? {
              disablePortal,
              ...(!element.props.slotProps?.root?.['data-testid'] && {
                'data-testid': 'test-portal',
              }),
            }
          : {
              slotProps: {
                ...element.props.slotProps,
                [portalSlot]: {
                  ...element.props.slotProps?.[portalSlot],
                  disablePortal,
                  'data-testid': 'test-portal',
                },
              },
            };

      it('If `disablePortal` is false, color inversion should NOT apply', () => {
        const result = render(
          <ThemeProvider>
            <Sheet invertedColors variant="solid" color="primary">
              {wrapper(React.cloneElement(element, getProps(false)))}
            </Sheet>
          </ThemeProvider>,
        );
        expect(getTestElement(result, 'test-portal')).not.to.have.class(classes.colorContext);
      });

      it('If `disablePortal` is true, color inversion should WORK', () => {
        const result = render(
          <ThemeProvider>
            <Sheet invertedColors variant="solid" color="primary">
              {wrapper(React.cloneElement(element, getProps(true)))}
            </Sheet>
          </ThemeProvider>,
        );
        expect(getTestElement(result, 'test-portal')).to.have.class(classes.colorContext);
      });
    });

    it('should use instance color', () => {
      const result = render(
        <ThemeProvider>
          <Sheet invertedColors variant="solid" color="primary">
            {wrapper(React.cloneElement(element, { color: 'primary' }))}
          </Sheet>
        </ThemeProvider>,
      );
      expect(getTestElement(result)).to.have.class(classes.colorPrimary);
    });
  });
}
