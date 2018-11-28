import { ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { YearSelection, YearSelectionProps } from '../../DatePicker/components/YearSelection';
import { shallow, utilsToUse } from '../test-utils';

describe('YearSelection', () => {
  let component: ShallowWrapper<YearSelectionProps>;

  beforeEach(() => {
    component = shallow(
      <YearSelection
        classes={{} as any}
        date={utilsToUse.date('01-01-2017')}
        onChange={jest.fn()}
        utils={utilsToUse}
      />
    );
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });
});
