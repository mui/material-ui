import * as React from 'react';
import { createMount, createRenderer } from '@mui-internal/test-utils';
import { expect } from 'chai';
import { Checkbox, CheckboxOwnerState, checkboxClasses } from '@mui/base/Checkbox';
import { describeConformanceUnstyled } from '../../test/describeConformanceUnstyled';

describe('<Checkbox />', () => {
  const mount = createMount();
  const { render } = createRenderer();

  describeConformanceUnstyled(<Checkbox />, () => ({
    inheritComponent: 'span',
    render,
    mount,
    refInstanceof: window.HTMLSpanElement,
    testComponentPropWith: 'span',
    slots: {
      root: {
        expectedClassName: checkboxClasses.root,
      },
      thumb: {
        expectedClassName: checkboxClasses.thumb,
      },
      input: {
        testWithElement: 'input',
        expectedClassName: checkboxClasses.input,
      },
      track: {
        expectedClassName: checkboxClasses.track,
        isOptional: true,
      },
    },
    skip: ['componentProp'],
  }));

  describe('componentState', () => {
    it('passes the ownerState prop to all the slots', () => {
      interface CustomSlotProps {
        ownerState: CheckboxOwnerState;
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

      const slots = {
        root: CustomSlot,
        input: CustomSlot,
        thumb: CustomSlot,
      };

      const { getAllByTestId } = render(<Checkbox defaultChecked disabled slots={slots} />);
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
