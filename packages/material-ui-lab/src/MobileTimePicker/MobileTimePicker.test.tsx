import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { spy } from 'sinon';
import { expect } from 'chai';
import { fireEvent, fireTouchChangedEvent } from 'test/utils';
import MobileTimePicker from '@material-ui/lab/MobileTimePicker';
import { createPickerRender, adapterToUse, getByMuiTest } from '../internal/pickers/test-utils';

describe('<MobileTimePicker />', () => {
  const render = createPickerRender({ strict: false });

  function createMouseEventWithOffsets(
    type: 'mousedown' | 'mousemove' | 'mouseup',
    { offsetX, offsetY, ...eventOptions }: { offsetX: number; offsetY: number } & MouseEventInit,
  ) {
    const event = new window.MouseEvent(type, {
      bubbles: true,
      cancelable: true,
      ...eventOptions,
    });

    Object.defineProperty(event, 'offsetX', { get: () => offsetX });
    Object.defineProperty(event, 'offsetY', { get: () => offsetY });

    return event;
  }

  it('accepts time on clock mouse move', () => {
    const onChangeMock = spy();
    render(
      <MobileTimePicker
        ampm
        open
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
        onChange={onChangeMock}
        renderInput={(props) => <TextField variant="outlined" {...props} />}
      />,
    );

    const fakeEventOptions = {
      buttons: 1,
      offsetX: 20,
      offsetY: 15,
    };

    fireEvent(getByMuiTest('clock'), createMouseEventWithOffsets('mousemove', fakeEventOptions));
    fireEvent(getByMuiTest('clock'), createMouseEventWithOffsets('mouseup', fakeEventOptions));

    expect(getByMuiTest('hours')).to.have.text('11');
    expect(onChangeMock.callCount).to.equal(1);
  });

  it('accepts time on clock touch move', function test() {
    if (typeof window.Touch === 'undefined' || typeof window.TouchEvent === 'undefined') {
      this.skip();
    }

    const onChangeMock = spy();
    render(
      <MobileTimePicker
        ampm
        open
        openTo="minutes"
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
        onChange={onChangeMock}
        renderInput={(params) => <TextField {...params} />}
      />,
    );

    fireTouchChangedEvent(getByMuiTest('clock'), 'touchmove', {
      changedTouches: [{ clientX: 20, clientY: 15 }],
    });
    expect(getByMuiTest('minutes')).to.have.text('53');
  });

  it('allows to select full date from empty', function test() {
    if (typeof window.Touch === 'undefined' || typeof window.TouchEvent === 'undefined') {
      this.skip();
    }

    function TimePickerWithState() {
      const [time, setTime] = React.useState(null);

      return (
        <MobileTimePicker
          open
          value={time}
          onChange={(newTime) => setTime(newTime)}
          renderInput={(params) => <TextField {...params} />}
        />
      );
    }

    render(<TimePickerWithState />);

    expect(getByMuiTest('hours')).to.have.text('--');
    expect(getByMuiTest('minutes')).to.have.text('--');

    fireTouchChangedEvent(getByMuiTest('clock'), 'touchmove', {
      changedTouches: [
        {
          clientX: 20,
          clientY: 15,
        },
      ],
    });

    expect(getByMuiTest('hours')).not.to.have.text('--');
    expect(getByMuiTest('minutes')).not.to.have.text('--');
  });

  context('Time validation on touch ', () => {
    before(function beforeHook() {
      if (typeof window.Touch === 'undefined' || typeof window.TouchEvent === 'undefined') {
        this.skip();
      }
    });

    const clockMouseEvent = {
      '13:--': {
        changedTouches: [
          {
            clientX: 150,
            clientY: 60,
          },
        ],
      },
      '20:--': {
        changedTouches: [
          {
            clientX: 66,
            clientY: 157,
          },
        ],
      },
      '--:10': {
        changedTouches: [
          {
            clientX: 190,
            clientY: 60,
          },
        ],
      },
      '--:20': {
        changedTouches: [
          {
            clientX: 222,
            clientY: 180,
          },
        ],
      },
    };

    beforeEach(() => {
      render(
        <MobileTimePicker
          renderInput={(params) => <TextField {...params} />}
          open
          ampm={false}
          onChange={() => {}}
          views={['hours', 'minutes', 'seconds']}
          value={adapterToUse.date('2018-01-01T00:00:00.000')}
          minTime={adapterToUse.date('2018-01-01T12:15:00.000')}
          maxTime={adapterToUse.date('2018-01-01T15:45:30.000')}
        />,
      );
    });

    it('should select enabled hour', () => {
      fireTouchChangedEvent(getByMuiTest('clock'), 'touchmove', clockMouseEvent['13:--']);
      expect(getByMuiTest('hours')).to.have.text('13');
    });

    it('should select enabled minute', () => {
      fireTouchChangedEvent(getByMuiTest('clock'), 'touchmove', clockMouseEvent['13:--']);
      fireTouchChangedEvent(getByMuiTest('clock'), 'touchend', clockMouseEvent['13:--']);

      fireTouchChangedEvent(getByMuiTest('clock'), 'touchmove', clockMouseEvent['--:20']);

      expect(getByMuiTest('minutes')).to.have.text('20');
    });

    it('should not select minute when hour is disabled ', () => {
      fireTouchChangedEvent(getByMuiTest('clock'), 'touchmove', clockMouseEvent['20:--']);
      fireTouchChangedEvent(getByMuiTest('clock'), 'touchend', clockMouseEvent['20:--']);

      fireTouchChangedEvent(getByMuiTest('clock'), 'touchmove', clockMouseEvent['--:20']);
    });

    it('should not select disabled hour', () => {
      fireTouchChangedEvent(getByMuiTest('clock'), 'touchmove', clockMouseEvent['20:--']);
      expect(getByMuiTest('hours')).to.have.text('00');
    });

    it('should not select disabled second', () => {
      fireEvent.click(getByMuiTest('seconds'));
      fireTouchChangedEvent(getByMuiTest('clock'), 'touchmove', clockMouseEvent['--:20']);

      expect(getByMuiTest('seconds')).to.have.text('00');
    });

    it('should select enabled second', () => {
      fireTouchChangedEvent(getByMuiTest('clock'), 'touchmove', clockMouseEvent['13:--']);
      fireTouchChangedEvent(getByMuiTest('clock'), 'touchend', clockMouseEvent['13:--']);

      fireTouchChangedEvent(getByMuiTest('clock'), 'touchmove', clockMouseEvent['--:20']);
      fireTouchChangedEvent(getByMuiTest('clock'), 'touchend', clockMouseEvent['--:20']);

      fireTouchChangedEvent(getByMuiTest('clock'), 'touchmove', clockMouseEvent['--:10']);

      expect(getByMuiTest('seconds')).to.have.text('10');
    });
  });
});
