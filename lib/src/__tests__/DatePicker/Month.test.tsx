import { ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { Month, MonthProps } from '../../DatePicker/components/Month';
import { shallow, utilsToUse } from '../test-utils';

describe('Month', () => {
  let component: ShallowWrapper<MonthProps>;

  beforeEach(() => {
    component = shallow(
      <Month classes={{} as any} value={utilsToUse.date('01-01-2017')} onSelect={jest.fn()}>
        Oct
      </Month>
    );
  });

  it('Should render', () => {
    expect(component).toBeTruthy();
  });
});

describe('Month - disabled state', () => {
  let component: ShallowWrapper<MonthProps>;

  beforeEach(() => {
    component = shallow(
      <Month
        classes={{} as any}
        disabled
        value={utilsToUse.date('01-01-2017')}
        onSelect={jest.fn()}
      >
        Oct
      </Month>
    );
  });

  it('Should render in disabled state', () => {
    expect(component.prop('tabIndex')).toBe(-1);
  });
});
