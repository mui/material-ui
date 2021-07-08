import * as React from 'react';
import { createMount, createClientRender, describeConformanceUnstyled } from 'test/utils';
import SwitchUnstyled, {
  SwitchState,
  switchUnstyledClasses,
} from '@material-ui/unstyled/SwitchUnstyled';
import { expect } from 'chai';

describe('<SwitchUnstyled />', () => {
  const mount = createMount();
  const render = createClientRender();

  describeConformanceUnstyled(<SwitchUnstyled />, () => ({
    inheritComponent: 'span',
    render,
    mount,
    refInstanceof: window.HTMLSpanElement,
    testComponentPropWith: 'span',
    muiName: 'MuiSwitch',
    slots: {
      root: {
        expectedClassName: switchUnstyledClasses.root,
      },
      thumb: {
        expectedClassName: switchUnstyledClasses.thumb,
      },
      input: {
        testWithElement: 'input',
        expectedClassName: switchUnstyledClasses.input,
      },
    },
  }));

  describe('componentState', () => {
    it('passes the styleProps prop to all the slots', () => {
      interface CustomSlotProps {
        styleProps: SwitchState;
        children?: React.ReactNode;
      }

      const CustomSlot = React.forwardRef(
        ({ styleProps: sp, children }: CustomSlotProps, ref: React.Ref<any>) => {
          return (
            <div
              ref={ref}
              data-checked={sp.checked}
              data-disabled={sp.disabled}
              data-readonly={sp.readOnly}
              data-focusvisible={sp.focusVisible}
              data-testid="custom"
            >
              {children}
            </div>
          );
        },
      );

      const components = {
        Root: CustomSlot,
        Input: CustomSlot,
        Thumb: CustomSlot,
      };

      const { getAllByTestId } = render(
        <SwitchUnstyled defaultChecked disabled components={components} />,
      );
      const renderedComponents = getAllByTestId('custom');

      expect(renderedComponents.length).to.equal(3);
      for (let i = 0; i < renderedComponents.length; i += 1) {
        expect(renderedComponents[i]).to.have.attribute('data-checked', 'true');
        expect(renderedComponents[i]).to.have.attribute('data-disabled', 'true');
        expect(renderedComponents[i]).to.have.attribute('data-readonly', 'false');
        expect(renderedComponents[i]).to.have.attribute('data-focusvisible', 'false');
      }
    });
  });
});
