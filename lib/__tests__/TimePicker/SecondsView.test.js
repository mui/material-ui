import React from 'react';
import moment from 'moment';
import { shallow } from '../test-utils';

import { SecondsView } from '../../src/TimePicker/SecondsView';

const date = process.env.UTILS === 'moment' ? moment() : new Date();

describe('SecondsView', () => {
  let component;

  beforeEach(() => {
    component = shallow(<SecondsView date={date} />);
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });
});
