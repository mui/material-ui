import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { getByMuiTest } from './test-utils';
import { screen, waitFor } from '@testing-library/react';
import { utilsToUse, FakeTransitionComponent } from './test-utils';
import { createClientRender, fireEvent } from './createClientRender';
import { DatePicker, MobileDatePicker, DesktopDatePicker } from '../index';

describe('<DatePicker />', () => {
  const render = createClientRender({ strict: false });

  it('Allows to select edge years from list', () => {
    render(
      <DatePicker
        open
        reduceAnimations
        value={null}
        onChange={jest.fn()}
        openTo="year"
        minDate={new Date('2000-01-01')}
        maxDate={new Date('2010-01-01')}
        renderInput={props => <TextField {...props} />}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: '2010' }));
    expect(getByMuiTest('datepicker-toolbar-date')).toHaveTextContent('Fri, Jan 1');
  });

  it("doesn't close picker on selection in Mobile mode", () => {
    render(
      <MobileDatePicker
        value={utilsToUse.date('2018-01-01T00:00:00.000Z')}
        onChange={jest.fn()}
        renderInput={props => <TextField {...props} />}
      />
    );

    fireEvent.click(screen.getByRole('textbox'));
    fireEvent.click(screen.getByLabelText('Jan 2, 2018'));

    expect(screen.queryByRole('dialog')).toBeInTheDocument();
  });

  it('Closes picker on selection in Desktop mode', async () => {
    render(
      <DesktopDatePicker
        TransitionComponent={FakeTransitionComponent}
        value={utilsToUse.date('2018-01-01T00:00:00.000Z')}
        onChange={jest.fn()}
        renderInput={props => <TextField {...props} />}
      />
    );

    fireEvent.click(screen.getByLabelText('Choose date, selected date is Jan 1, 2018'));

    await waitFor(() => screen.getByRole('dialog'));
    fireEvent.click(screen.getByLabelText('Jan 2, 2018'));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it("Prop `disableCloseOnSelect` – if `true` doesn't close picker", async () => {
    render(
      <DesktopDatePicker
        TransitionComponent={FakeTransitionComponent}
        disableCloseOnSelect
        value={utilsToUse.date('2018-01-01T00:00:00.000Z')}
        onChange={jest.fn()}
        renderInput={props => <TextField {...props} />}
      />
    );

    fireEvent.click(screen.getByLabelText('Choose date, selected date is Jan 1, 2018'));

    await waitFor(() => screen.getByRole('dialog'));
    fireEvent.click(screen.getByLabelText('Jan 2, 2018'));

    expect(screen.queryByRole('dialog')).toBeInTheDocument();
  });

  it('does not call onChange if same date selected', async () => {
    const onChangeMock = jest.fn();

    render(
      <DesktopDatePicker
        TransitionComponent={FakeTransitionComponent}
        value={utilsToUse.date('2018-01-01T00:00:00.000Z')}
        onChange={onChangeMock}
        renderInput={props => <TextField {...props} />}
      />
    );

    fireEvent.click(screen.getByLabelText('Choose date, selected date is Jan 1, 2018'));
    await waitFor(() => screen.getByRole('dialog'));

    fireEvent.click(screen.getByLabelText('Jan 1, 2018'));
    expect(onChangeMock).not.toHaveBeenCalled();
  });
});
