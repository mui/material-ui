import * as React from 'react';
import { expect } from 'chai';
import fr from 'date-fns/locale/fr';
import TextField from '@material-ui/core/TextField';
import MobileDatePicker from '@material-ui/lab/MobileDatePicker';
import { fireEvent, screen } from 'test/utils';
import { adapterToUse, getByMuiTest, createPickerRender } from '../internal/pickers/test-utils';

describe('<MobileDatePicker /> localization', () => {
  const render = createPickerRender({ locale: fr });

  it('format for year view', () => {
    render(
      <MobileDatePicker
        renderInput={(params) => <TextField {...params} />}
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
        onChange={() => {}}
        views={['year']}
      />,
    );

    expect(screen.getByRole('textbox')).to.have.value('2018');

    fireEvent.click(screen.getByLabelText(/Choose date/));
    expect(getByMuiTest('datepicker-toolbar-date').textContent).to.equal('2018');
  });

  it('format for year+month view', () => {
    const value = adapterToUse.date(`2018-01-01T00:00:00.000`);
    render(
      <MobileDatePicker
        renderInput={(params) => <TextField {...params} />}
        value={value}
        onChange={() => {}}
        views={['year', 'month']}
      />,
    );

    expect(screen.getByRole('textbox')).to.have.value('janvier 2018');

    fireEvent.click(screen.getByLabelText(/Choose date/));
    expect(getByMuiTest('datepicker-toolbar-date').textContent).to.equal('janvier');
  });

  it('format for year+month+day view', () => {
    render(
      <MobileDatePicker
        onChange={() => {}}
        renderInput={(params) => <TextField {...params} />}
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
        views={['year', 'month', 'day']}
      />,
    );

    expect(screen.getByRole('textbox')).to.have.value('01/01/2018');

    fireEvent.click(screen.getByLabelText(/Choose date/));
    expect(getByMuiTest('datepicker-toolbar-date').textContent).to.equal('1 janvier');
  });
});
