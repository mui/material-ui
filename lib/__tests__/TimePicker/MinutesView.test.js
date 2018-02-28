import React from 'react';
import moment from 'moment';
import { shallow } from '../test-utils';

import { MinutesView } from '../../src/TimePicker/MinutesView';

const date = process.env.UTILS === 'moment' ? moment() : new Date();

describe('MinutesView', () => {
  let component;

  beforeEach(() => {
    component = shallow(<MinutesView date={date} />);
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });
});
