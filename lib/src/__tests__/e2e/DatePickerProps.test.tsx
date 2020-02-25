import * as React from 'react';
import { mount, utilsToUse } from '../test-utils';
import { DatePicker, MobileDatePicker } from '../../DatePicker/DatePicker';

describe('DatePicker - different props', () => {
  it('Should not render toolbar if onlyCalendar = true', () => {
    const component = mount(
      <DatePicker
        open
        showToolbar
        onChange={jest.fn()}
        value={utilsToUse.date('2018-01-01T00:00:00.000Z')}
      />
    );

    expect(component.find('WithStyles(PickerToolbar)').length).toBe(0);
  });

  it('toolbarTitle – should render value from prop', () => {
    const component = mount(
      <MobileDatePicker
        open
        toolbarTitle="test"
        label="something"
        onChange={jest.fn()}
        value={utilsToUse.date('2018-01-01T00:00:00.000Z')}
      />
    );

    expect(component.find('span[data-mui-test="picker-toolbar-title"]').text()).toBe('test');
  });

  it('toolbarTitle – should use label if no toolbar title', () => {
    const component = mount(
      <MobileDatePicker
        open
        label="Default label"
        onChange={jest.fn()}
        value={utilsToUse.date('2018-01-01T00:00:00.000Z')}
      />
    );

    expect(component.find('span[data-mui-test="picker-toolbar-title"]').text()).toBe(
      'Default label'
    );
  });

  it('toolbarFormat – should format toolbar according to passed format', () => {
    const component = mount(
      <MobileDatePicker
        open
        onChange={jest.fn()}
        toolbarFormat="MMMM"
        value={utilsToUse.date('2018-01-01T00:00:00.000Z')}
      />
    );

    expect(component.find('h4[data-mui-test="datepicker-toolbar-date"]').text()).toBe('January');
  });
});
