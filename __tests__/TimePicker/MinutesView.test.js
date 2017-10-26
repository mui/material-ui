import React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';

import MinutesView from '../../src/TimePicker/MinutesView';

const date = moment();

describe('MinutesView', () => {
  let component;

  beforeEach(() => {
    component = shallow(<MinutesView date={date} />);
  });

  it('Should renders', () => {
    console.log(component.debug()); // TODO REMOVE ME
    expect(component).toBeTruthy();
  });
});
