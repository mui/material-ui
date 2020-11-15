import * as React from 'react';
import { spy } from 'sinon';
import { expect } from 'chai';
import { getClasses, createMount, fireEvent, screen, describeConformance } from 'test/utils';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DateFnsAdapter from '@material-ui/lab/dateAdapter/date-fns';
import MonthPicker from '@material-ui/lab/MonthPicker';
import { adapterToUse, createPickerRender } from '../internal/pickers/test-utils';

describe('<MonthPicker />', () => {
  const mount = createMount();
  const render = createPickerRender({ strict: false });
  let classes: Record<string, string>;

  const localizedMount = (node: React.ReactNode) => {
    return mount(<LocalizationProvider dateAdapter={DateFnsAdapter}>{node}</LocalizationProvider>);
  };

  before(() => {
    classes = getClasses(
      <MonthPicker
        minDate={adapterToUse.date('2019-01-01T00:00:00.000')}
        maxDate={adapterToUse.date('2029-01-01T00:00:00.000')}
        date={adapterToUse.date()}
        onChange={() => {}}
      />,
    );
  });

  describeConformance(
    <MonthPicker
      minDate={adapterToUse.date('2019-01-01T00:00:00.000')}
      maxDate={adapterToUse.date('2029-01-01T00:00:00.000')}
      date={adapterToUse.date()}
      onChange={() => {}}
    />,
    () => ({
      classes,
      inheritComponent: 'div',
      mount: localizedMount,
      refInstanceof: window.HTMLDivElement,
      // cannot test reactTestRenderer because of required context
      skip: ['componentProp', 'propsSpread', 'reactTestRenderer'],
    }),
  );

  it('allows to pick year standalone', () => {
    const onChangeMock = spy();
    render(
      <MonthPicker
        minDate={adapterToUse.date('2019-01-01T00:00:00.000')}
        maxDate={adapterToUse.date('2029-01-01T00:00:00.000')}
        date={adapterToUse.date('2019-02-02T00:00:00.000')}
        onChange={onChangeMock}
      />,
    );

    fireEvent.click(screen.getByText('May', { selector: 'button' }));
    expect((onChangeMock.args[0][0] as Date).getMonth()).to.equal(4); // month index starting from 0
  });
});
