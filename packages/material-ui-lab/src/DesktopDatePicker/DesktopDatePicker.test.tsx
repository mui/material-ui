import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import TextField from '@material-ui/core/TextField';
import { fireEvent, screen, waitFor } from 'test/utils';
import DesktopDatePicker from '@material-ui/lab/DesktopDatePicker';
import {
  createPickerRender,
  FakeTransitionComponent,
  adapterToUse,
  getByMuiTest,
  openDesktopPicker,
} from '../internal/pickers/test-utils';

describe('<DesktopDatePicker />', () => {
  const render = createPickerRender({ strict: false });

  it('accepts date on day button click', () => {
    const onChangeMock = spy();

    render(
      <DesktopDatePicker
        value={adapterToUse.date('2019-01-01T00:00:00.000')}
        onChange={onChangeMock}
        TransitionComponent={FakeTransitionComponent}
        renderInput={(params) => <TextField {...params} />}
      />,
    );

    openDesktopPicker();

    fireEvent.click(screen.getByLabelText('Jan 2, 2019'));
    expect(onChangeMock.callCount).to.equal(1);

    expect(screen.queryByRole('dialog')).to.equal(null);
  });

  it('closes picker on selection in Desktop mode', async () => {
    render(
      <DesktopDatePicker
        TransitionComponent={FakeTransitionComponent}
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
        onChange={() => {}}
        renderInput={(params) => <TextField {...params} />}
      />,
    );

    fireEvent.click(screen.getByLabelText('Choose date, selected date is Jan 1, 2018'));

    await waitFor(() => screen.getByRole('dialog'));
    fireEvent.click(screen.getByLabelText('Jan 2, 2018'));

    expect(screen.queryByRole('dialog')).to.equal(null);
  });

  it("prop `disableCloseOnSelect` – if `true` doesn't close picker", () => {
    render(
      <DesktopDatePicker
        TransitionComponent={FakeTransitionComponent}
        disableCloseOnSelect
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
        onChange={() => {}}
        renderInput={(params) => <TextField {...params} />}
      />,
    );

    openDesktopPicker();
    fireEvent.click(screen.getByLabelText('Jan 2, 2018'));

    expect(screen.queryByRole('dialog')).toBeVisible();
  });

  it('does not call onChange if same date selected', async () => {
    const onChangeMock = spy();

    render(
      <DesktopDatePicker
        TransitionComponent={FakeTransitionComponent}
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
        onChange={onChangeMock}
        renderInput={(params) => <TextField {...params} />}
      />,
    );

    fireEvent.click(screen.getByLabelText('Choose date, selected date is Jan 1, 2018'));
    await waitFor(() => screen.getByRole('dialog'));

    fireEvent.click(screen.getByLabelText('Jan 1, 2018'));
    expect(onChangeMock.callCount).to.equal(0);
  });

  it('allows to change selected date from the input according to `format`', () => {
    const onChangeMock = spy();
    render(
      <DesktopDatePicker
        renderInput={(props) => <TextField placeholder="10/10/2018" {...props} />}
        label="Masked input"
        inputFormat="dd/MM/yyyy"
        value={adapterToUse.date('2018-01-01T00:00:00.000Z')}
        onChange={onChangeMock}
        InputAdornmentProps={{
          disableTypography: true,
        }}
      />,
    );

    fireEvent.change(screen.getByRole('textbox'), {
      target: {
        value: '10/11/2018',
      },
    });

    expect(screen.getByRole('textbox')).to.have.value('10/11/2018');
    expect(onChangeMock.callCount).to.equal(1);
  });

  it('prop `showToolbar` – renders toolbar in desktop mode', () => {
    render(
      <DesktopDatePicker
        open
        showToolbar
        onChange={() => {}}
        TransitionComponent={FakeTransitionComponent}
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
        renderInput={(params) => <TextField {...params} />}
      />,
    );

    expect(getByMuiTest('picker-toolbar')).toBeVisible();
  });
});
