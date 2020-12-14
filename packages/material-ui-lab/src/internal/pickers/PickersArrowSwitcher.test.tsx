import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import ArrowSwitcher, {
  ExportedArrowSwitcherProps,
} from './PickersArrowSwitcher';

import { createPickerRender } from './test-utils'
import { screen } from 'test/utils';
import ClockIcon from '../svg-icons/Clock';

describe('<PickersArrowSwitcher />', () => {
  const render = createPickerRender({ strict: false });

  it('leftArrowCustom -> put in a custom component for the left scroll arrow', () => {
    render(
      <ArrowSwitcher
        onChange={() => {}}
        leftArrowCustom={<button>leftCustom</button>}
        onLeftClick={() => {}}
        onRightClick={() => {}} 
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
        onLeftClick={() => {}}
        onRightClick={() => {}} 
        isLeftDisabled={false}
        isRightDisabled={false}
      />,
    );
    expect(screen.getByText('rightCustom')).toBeVisible();
  });

  it('leftArrowCustom and rightArrowCustom -> put in a custom components for the left and right scroll arrows', () => {
    render(
      <ArrowSwitcher
        onChange={() => {}}
        leftArrowCustom={<button>leftCustom</button>}
        rightArrowCustom={<button>rightCustom</button>}
        onLeftClick={() => {}}
        onRightClick={() => {}} 
        isLeftDisabled={false}
        isRightDisabled={false}
      />,
    );

    expect(screen.getByText('leftCustom')).toBeVisible();
    expect(screen.getByText('rightCustom')).toBeVisible();
  });

  it('leftArrowCustomIcon -> put in a custom icon for the left scroll arrow', () => {
    render(
      <ArrowSwitcher
        onChange={() => {}}
        leftArrowCustomIcon={<ClockIcon data-testid="customIcon"/>}
        onLeftClick={() => {}}
        onRightClick={() => {}} 
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
        rightArrowCustomIcon={<ClockIcon data-testid="customIcon"/>}
        onLeftClick={() => {}}
        onRightClick={() => {}} 
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
        leftArrowCustomIcon={<ClockIcon data-testid="customIcon"/>}
        onLeftClick={() => {}}
        onRightClick={() => {}} 
        isLeftDisabled={false}
        isRightDisabled={false}
      />,
    );

    expect(screen.getByText('leftCustom')).toBeVisible();
  });

  it('rightArrowCustom and rightArrowCustomIcon -> custom component takes precedence over icon swap', () => {
    render(
      <ArrowSwitcher
        onChange={() => {}}
        rightArrowCustom={<button>rightCustom</button>}
        rightArrowCustomIcon={<ClockIcon data-testid="customIcon"/>}
        onLeftClick={() => {}}
        onRightClick={() => {}} 
        isLeftDisabled={false}
        isRightDisabled={false}
      />,
    );

    expect(screen.getByText('rightCustom')).toBeVisible();
  });

});