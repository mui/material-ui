import * as React from 'react';
import { createMount, createRenderer, describeConformanceUnstyled } from 'test/utils';
import SwitchUnstyled, {
  SwitchUnstyledOwnerState,
  switchUnstyledClasses,
} from '@mui/base/SwitchUnstyled';
import { expect } from 'chai';

describe('<SwitchUnstyled />', () => {
  const mount = createMount();
  const { render } = createRenderer();

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
      track: {
        expectedClassName: switchUnstyledClasses.track,
        isOptional: true,
      },
    },
  }));

  describe('componentState', () => {
    it('passes the ownerState prop to all the slots', () => {
      interface CustomSlotProps {
        ownerState: SwitchUnstyledOwnerState;
        children?: React.ReactNode;
      }

      const CustomSlot = React.forwardRef(
        ({ ownerState: sp, children }: CustomSlotProps, ref: React.Ref<any>) => {
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
