import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { YearSelection } from '../../src/DatePicker/YearSelection';

describe('YearSelection', () => {
  let component;

  beforeEach(() => {
    component = shallow(<YearSelection classes={{}} date={moment('01-01-2017')} />);
  });

  it('Should renders', () => {
    console.log(component.debug()); // TODO REMOVE ME
    expect(component).toBeTruthy();
  });
});
