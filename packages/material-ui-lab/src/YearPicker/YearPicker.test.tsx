import * as React from 'react';
import { spy } from 'sinon';
import { expect } from 'chai';
import { getClasses, createMount, fireEvent, screen, describeConformance } from 'test/utils';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import YearPicker from '@material-ui/lab/YearPicker';
import { adapterToUse, createPickerRender } from '../internal/pickers/test-utils';

describe('<YearPicker />', () => {
  const mount = createMount();
  const render = createPickerRender({ strict: false });
  let classes: Record<string, string>;

  const localizedMount = (node: React.ReactNode) => {
    return mount(<LocalizationProvider dateAdapter={AdapterDateFns}>{node}</LocalizationProvider>);
  };

  before(() => {
    classes = getClasses(
      <YearPicker
        minDate={adapterToUse.date('2019-01-01T00:00:00.000')}
        maxDate={adapterToUse.date('2029-01-01T00:00:00.000')}
        isDateDisabled={() => false}
        date={adapterToUse.date()}
        onChange={() => {}}
      />,
    );
  });

  describeConformance(
    <YearPicker
      minDate={adapterToUse.date('2019-01-01T00:00:00.000')}
      maxDate={adapterToUse.date('2029-01-01T00:00:00.000')}
      isDateDisabled={() => false}
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
      <YearPicker
        minDate={adapterToUse.date('2019-01-01T00:00:00.000')}
        maxDate={adapterToUse.date('2029-01-01T00:00:00.000')}
        isDateDisabled={() => false}
        date={adapterToUse.date('2019-02-02T00:00:00.000')}
        onChange={onChangeMock}
      />,
    );

    fireEvent.click(screen.getByText('2025', { selector: 'button' }));
    expect(onChangeMock.calledWith(adapterToUse.date('2025-02-02T00:00:00.000'))).to.equal(true);
  });
});
