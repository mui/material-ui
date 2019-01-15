import { ReactWrapper } from 'enzyme';
import * as React from 'react';
import DateTimePickerModal, {
  DateTimePickerModalProps,
} from '../../DateTimePicker/DateTimePickerModal';
import { mount, utilsToUse } from '../test-utils';

const format = process.env.UTILS === 'luxon' ? 'MM/dd/yyyy hh:mm' : 'MM/DD/YYYY HH:mm';

describe('e2e - DateTimePickerModal', () => {
  let component: ReactWrapper<DateTimePickerModalProps>;

  const onCloseMock = jest.fn();
  const onChangeMock = jest.fn();

  beforeEach(() => {
    component = mount(
      <DateTimePickerModal
        format={format}
        onClose={onCloseMock}
        onChange={onChangeMock}
        value={utilsToUse.date('2018-01-01T00:00:00.000Z')}
      />
    );
  });

  it('Should renders', () => {
    expect(component).toBeTruthy();
  });

  it('Should open modal with picker on click', () => {
    component.find('input').simulate('click');
    expect(component.find('Dialog').props().open).toBeTruthy();
  });

  it('Should update state when passing new value from outside', () => {
    component.setProps({ value: '2018-01-01T00:00:00.000Z' });
    component.update(); // make additional react tick to update text field

    const expectedString = utilsToUse.format(utilsToUse.date('2018-01-01T00:00:00.000Z'), format);

    expect(component.find('input').props().value).toBe(expectedString);
  });

  it('Should change internal state on update', () => {
    component.find('input').simulate('click');
    component
      .find('Day button')
      .at(3)
      .simulate('click');

    expect(
      component
        .find('ToolbarButton')
        .at(0)
        .text()
    ).toBe('2018');
    // expect(component.find('ToolbarButton').at(1).text()).toBe('Jan 3');
  });

  it('Should handle accept on enter', () => {
    component.find('input').simulate('click');
    const onKeyDown = component
      .find('EventListener')
      .at(0)
      .props().onKeyDown;

    if (!onKeyDown) {
      throw new Error('Expected onKeyDown to be non-null');
    }

    onKeyDown({
      key: 'Enter',
      preventDefault: jest.fn(),
    } as any);

    expect(onCloseMock).toHaveBeenCalled();
    expect(onChangeMock).toHaveBeenCalled();
  });
});

describe('e2e - DateTimePickerModal keyboard', () => {
  let component: ReactWrapper<DateTimePickerModalProps>;
  const onChangeMock = jest.fn();
  const onInputChangeMock = jest.fn();

  beforeEach(() => {
    component = mount(
      <DateTimePickerModal
        keyboard
        format={format}
        value={utilsToUse.date('2018-01-01T00:00:00.000+00:00')}
        onChange={onChangeMock}
        onInputChange={onInputChangeMock}
      />
    );
  });

  it('Should apply keyboard input', () => {
    component.find('input').simulate('change', { target: { value: '02/01/2018 00:00' } });
    component.find('input').simulate('blur');

    expect(onChangeMock).toHaveBeenCalled();
    expect(onInputChangeMock).toHaveBeenCalled();
  });
});
