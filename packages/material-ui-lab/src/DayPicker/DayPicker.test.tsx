import * as React from 'react';
import { expect } from 'chai';
import { getClasses, createMount, fireEvent, screen, describeConformance } from 'test/utils';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DateFnsAdapter from '@material-ui/lab/dateAdapter/date-fns';
import DayPicker from '@material-ui/lab/DayPicker';
import { createPickerRender, getAllByMuiTest } from '../internal/pickers/test-utils';

describe('<DayPicker />', () => {
  const mount = createMount();
  const render = createPickerRender({ strict: false });
  let classes: Record<string, string>;

  const localizedMount = (node: React.ReactNode) => {
    return mount(<LocalizationProvider dateAdapter={DateFnsAdapter}>{node}</LocalizationProvider>);
  };

  before(() => {
    classes = getClasses(<DayPicker date={new Date()} onChange={() => {}} />);
  });

  describeConformance(<DayPicker date={new Date()} onChange={() => {}} />, () => ({
    classes,
    inheritComponent: 'div',
    mount: localizedMount,
    refInstanceof: window.HTMLDivElement,
    // cannot test reactTestRenderer because of required context
    skip: ['componentProp', 'propsSpread', 'reactTestRenderer'],
  }));

  // TODO
  // eslint-disable-next-line mocha/no-skipped-tests
  it.skip('renders calendar standalone', () => {
    render(<DayPicker date={new Date('2019-01-01T00:00:00.000')} onChange={() => {}} />);

    expect(screen.getByText('January')).toBeVisible();
    expect(screen.getByText('2019')).toBeVisible();
    expect(getAllByMuiTest('day')).to.have.length(31);
  });

  // TODO
  // eslint-disable-next-line mocha/no-skipped-tests
  it.skip('renders year selection  standalone', () => {
    render(
      <DayPicker date={new Date('2019-01-01T00:00:00.000')} openTo="year" onChange={() => {}} />,
    );

    expect(getAllByMuiTest('year')).to.have.length(200);
  });

  it('switches between views uncontrolled', () => {
    render(<DayPicker date={new Date('2019-01-01T00:00:00.000')} onChange={() => {}} />);

    fireEvent.click(screen.getByLabelText(/switch to year view/i));

    expect(screen.queryByLabelText(/switch to year view/i)).to.equal(null);
    expect(screen.getByLabelText('year view is open, switch to calendar view')).toBeVisible();
  });
});
