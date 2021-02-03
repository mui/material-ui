import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import TextField from '@material-ui/core/TextField';
import { act, fireEvent, screen } from 'test/utils';
import DesktopDatePicker from '@material-ui/lab/DesktopDatePicker';
import {
  createPickerRender,
  FakeTransitionComponent,
  adapterToUse,
  getByMuiTest,
} from '../internal/pickers/test-utils';

const UncontrolledOpenDesktopDatePicker = (({
  onClose = () => {},
  onOpen = () => {},
  open: openProp,
  defaultOpen,
  ...other
}: any) => {
  if (openProp != null) {
    throw new TypeError('Controlling `open` is not supported. Use `defaultOpen` instead.');
  }
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <DesktopDatePicker
      open={open}
      onClose={(...args) => {
        setOpen(false);
        onClose(...args);
      }}
      onOpen={(...args) => {
        setOpen(true);
        onOpen(...args);
      }}
      {...other}
    />
  );
}) as typeof DesktopDatePicker;

describe('<DesktopDatePicker />', () => {
  const render = createPickerRender({ strict: false });

  it('opens when "Choose date" is clicked', () => {
    const handleOpen = spy();
    render(
      <DesktopDatePicker
        value={adapterToUse.date('2019-01-01T00:00:00.000')}
        onChange={() => {}}
        onOpen={handleOpen}
        TransitionComponent={FakeTransitionComponent}
        renderInput={(params) => <TextField {...params} />}
      />,
    );

    act(() => {
      screen.getByLabelText(/Choose date/).click();
    });

    expect(handleOpen.callCount).to.equal(1);
    expect(screen.queryByRole('dialog')).not.to.equal(null);
  });

  it('closes on clickaway', () => {
    const handleClose = spy();
    render(
      <DesktopDatePicker
        onChange={() => {}}
        renderInput={(params) => <TextField {...params} />}
        value={null}
        open
        onClose={handleClose}
        TransitionComponent={FakeTransitionComponent}
      />,
    );

    fireEvent.click(document.body);

    expect(handleClose.callCount).to.equal(1);
  });

  it('does not close on clickaway when it is not open', () => {
    const handleClose = spy();
    render(
      <DesktopDatePicker
        onChange={() => {}}
        renderInput={(params) => <TextField {...params} />}
        value={null}
        onClose={handleClose}
      />,
    );

    fireEvent.click(document.body);

    expect(handleClose.callCount).to.equal(0);
  });

  it('does not close on click inside', () => {
    const handleClose = spy();
    render(
      <DesktopDatePicker
        onChange={() => {}}
        renderInput={(params) => <TextField {...params} />}
        value={null}
        open
        onClose={handleClose}
        TransitionComponent={FakeTransitionComponent}
      />,
    );

    fireEvent.click(screen.getByLabelText('Next month'));

    expect(handleClose.callCount).to.equal(0);
  });

  it('accepts date on day button click', () => {
    const onChangeMock = spy();
    render(
      <UncontrolledOpenDesktopDatePicker
        // @ts-expect-error internal prop
        defaultOpen
        value={adapterToUse.date('2019-01-01T00:00:00.000')}
        onChange={onChangeMock}
        TransitionComponent={FakeTransitionComponent}
        renderInput={(params) => <TextField {...params} />}
      />,
    );

    fireEvent.click(screen.getByLabelText('Jan 2, 2019'));

    expect(onChangeMock.callCount).to.equal(1);
    expect(screen.queryByRole('dialog')).to.equal(null);
  });

  it('closes on selection', () => {
    render(
      <UncontrolledOpenDesktopDatePicker
        // @ts-expect-error internal prop
        defaultOpen
        TransitionComponent={FakeTransitionComponent}
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
        onChange={() => {}}
        renderInput={(params) => <TextField {...params} />}
      />,
    );

    fireEvent.click(screen.getByLabelText('Jan 2, 2018'));

    expect(screen.queryByRole('dialog')).to.equal(null);
  });

  it("prop `disableCloseOnSelect` – if `true` doesn't close picker", () => {
    render(
      <UncontrolledOpenDesktopDatePicker
        // @ts-expect-error internal prop
        defaultOpen
        TransitionComponent={FakeTransitionComponent}
        disableCloseOnSelect
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
        onChange={() => {}}
        renderInput={(params) => <TextField {...params} />}
      />,
    );

    fireEvent.click(screen.getByLabelText('Jan 2, 2018'));

    expect(screen.queryByRole('dialog')).toBeVisible();
  });

  it('does not call onChange if same date selected', () => {
    const onChangeMock = spy();
    render(
      <DesktopDatePicker
        open
        TransitionComponent={FakeTransitionComponent}
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
        onChange={onChangeMock}
        renderInput={(params) => <TextField {...params} />}
      />,
    );

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

  describe('prop: PopperProps', () => {
    it('forwards onClick and onTouchStart', () => {
      const handleClick = spy();
      const handleTouchStart = spy();
      render(
        <DesktopDatePicker
          open
          onChange={() => {}}
          PopperProps={{
            onClick: handleClick,
            onTouchStart: handleTouchStart,
            // @ts-expect-error `data-*` attributes are not recognized in props objects
            'data-testid': 'popper',
          }}
          renderInput={(params) => <TextField {...params} />}
          value={null}
        />,
      );
      const popper = screen.getByTestId('popper');

      fireEvent.click(popper);
      fireEvent.touchStart(popper);

      expect(handleClick.callCount).to.equal(1);
      expect(handleTouchStart.callCount).to.equal(1);
    });
  });
});
