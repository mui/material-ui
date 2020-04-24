import * as React from 'react';
import { TextField } from '@material-ui/core';
import { mount, utilsToUse } from './test-utils';
import { DatePicker, MobileDatePicker } from '../DatePicker/DatePicker';

describe('DatePicker - different props', () => {
  it('Should not render toolbar if onlyCalendar = true', () => {
    const component = mount(
      <DatePicker
        renderInput={props => <TextField {...props} />}
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
        renderInput={props => <TextField {...props} />}
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
        renderInput={props => <TextField {...props} />}
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
        renderInput={props => <TextField {...props} />}
        open
        onChange={jest.fn()}
        toolbarFormat="MMMM"
        value={utilsToUse.date('2018-01-01T00:00:00.000Z')}
      />
    );

    expect(component.find('h4[data-mui-test="datepicker-toolbar-date"]').text()).toBe('January');
  });

  it('showTodayLabel – accept current date when "today" button is clicked', () => {
    const onCloseMock = jest.fn();
    const onChangeMock = jest.fn();
    const component = mount(
      <MobileDatePicker
        renderInput={props => <TextField {...props} />}
        autoOk
        showTodayButton
        cancelLabel="stream"
        onClose={onCloseMock}
        onChange={onChangeMock}
        value={utilsToUse.date('2018-01-01T00:00:00.000Z')}
      />
    );

    component.find('input').simulate('click');
    component.find('button[data-mui-test="today-action-button"]').simulate('click');

    expect(onCloseMock).toHaveBeenCalled();
    expect(onChangeMock).toHaveBeenCalled();
  });

  // TODO rewrite test to be more linear
  it('ref - should forwardRef to text field', () => {
    const Component = () => {
      const ref = React.useRef<HTMLInputElement>(null);
      const focusPicker = () => {
        if (ref.current) {
          ref.current.focus();
          expect(ref.current.id).toBe('focusing-picker');
        } else {
          throw new Error('Ref must be available');
        }
      };

      return (
        <>
          <DatePicker
            ref={ref}
            value={null}
            onChange={jest.fn()}
            renderInput={props => <TextField id="focusing-picker" {...props} />}
          />

          <button id="focus-picker" onClick={focusPicker} />
        </>
      );
    };

    const component = mount(<Component />);
    component.find('#focus-picker').simulate('click');
  });
});
