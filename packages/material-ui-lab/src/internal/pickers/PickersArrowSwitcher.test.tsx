import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import ArrowSwitcher, {
  ExportedArrowSwitcherProps,
} from './PickersArrowSwitcher';

import { createPickerRender } from './test-utils'
import { fireEvent, screen, waitFor } from 'test/utils';
import ArrowLeftIcon from '../svg-icons/ArrowLeft';
import ArrowRightIcon from '../svg-icons/ArrowRight';
import CalendarIcon from '../svg-icons/Calendar';
import ClockIcon from '../svg-icons/Clock';
import PenIcon from '../svg-icons/Pen';

describe('<PickersArrowSwitcher />', () => {
  const render = createPickerRender({ strict: false });

  it('leftArrowCustom -> put in a custom component for the left scroll arrow', () => {
    render(
      <ArrowSwitcher
        onChange={() => {}}
        leftArrowCustom={<button>leftCustom</button>}
        // leftArrowButtonProps={leftArrowButtonProps}
        // rightArrowButtonProps={rightArrowButtonProps}
        // leftArrowButtonText={leftArrowButtonText}
        // rightArrowButtonText={rightArrowButtonText}
        // leftArrowIcon={leftArrowIcon}
        // rightArrowIcon={rightArrowIcon} 
        onLeftClick={() => console.log("")}
        onRightClick={() => console.log("")} 
        isLeftDisabled={false}
        isRightDisabled={false}
      />,
    );

    expect(screen.getByText('leftCustom')).toBeVisible();
  });

  it('rightArrowCustom -> put in a custom component for the right scroll arrow', () => {
    render(
      <ArrowSwitcher
        onChange={() => {}}
        rightArrowCustom={<button>rightCustom</button>}
        onLeftClick={() => console.log("")}
        onRightClick={() => console.log("")} 
        isLeftDisabled={false}
        isRightDisabled={false}
      />,
    );
    expect(screen.getByText('rightCustom')).toBeVisible();
  });

  it('leftArrowCustomIcon -> put in a custom icon for the left scroll arrow', () => {
    render(
      <ArrowSwitcher
        onChange={() => {}}
        leftArrowCustomIcon={<ClockIcon id="customIcon"/>}
        onLeftClick={() => console.log("")}
        onRightClick={() => console.log("")} 
        isLeftDisabled={false}
        isRightDisabled={false}
      />,
    );

    expect(screen.getByTestId('customIcon')).not.to.equal(null);
  });

  it('rightArrowCustomIcon -> put in a custom icon for the right scroll arrow', () => {
    render(
      <ArrowSwitcher
        onChange={() => {}}
        rightArrowCustomIcon={<ClockIcon id="customIcon"/>}
        onLeftClick={() => console.log("")}
        onRightClick={() => console.log("")} 
        isLeftDisabled={false}
        isRightDisabled={false}
      />,
    );

    expect(screen.getByTestId('customIcon')).not.to.equal(null);
  });

  it('leftArrowCustom and leftArrowCustomIcon -> custom component takes precedence over icon swap', () => {
    render(
      <ArrowSwitcher
        onChange={() => {}}
        leftArrowCustom={<button>leftCustom</button>}
        leftArrowCustomIcon={<ClockIcon id="customIcon"/>}
        onLeftClick={() => console.log("")}
        onRightClick={() => console.log("")} 
        isLeftDisabled={false}
        isRightDisabled={false}
      />,
    );

    expect(screen.getByText('leftCustom')).toBeVisible();
    expect(screen.getByTestId('customIcon')).to.equal(null);
  });

  it('rightArrowCustom and rightArrowCustomIcon -> custom component takes precedence over icon swap', () => {
    render(
      <ArrowSwitcher
        onChange={() => {}}
        rightArrowCustom={<button>rightCustom</button>}
        rightArrowCustomIcon={<ClockIcon id="customIcon"/>}
        onLeftClick={() => console.log("")}
        onRightClick={() => console.log("")} 
        isLeftDisabled={false}
        isRightDisabled={false}
      />,
    );

    expect(screen.getByText('rightCustom')).toBeVisible();
    expect(screen.getByTestId('customIcon')).to.equal(null);
  });

});