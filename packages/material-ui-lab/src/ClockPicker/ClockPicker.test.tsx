import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createMount, describeConformance, fireTouchChangedEvent } from 'test/utils';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import ClockPicker from '@material-ui/lab/ClockPicker';
import {
  adapterToUse,
  AdapterClassToUse,
  createPickerRender,
  getByMuiTest,
} from '../internal/pickers/test-utils';

describe('<ClockPicker />', () => {
  const mount = createMount();
  const render = createPickerRender();

  const localizedMount = (node: React.ReactNode) => {
    return mount(
      <LocalizationProvider dateAdapter={AdapterClassToUse}>{node}</LocalizationProvider>,
    );
  };

  describeConformance(<ClockPicker date={adapterToUse.date()} onChange={() => {}} />, () => ({
    classes: {},
    inheritComponent: 'div',
    mount: localizedMount,
    refInstanceof: window.HTMLDivElement,
    // cannot test reactTestRenderer because of required context
    skip: ['componentProp', 'propsSpread', 'reactTestRenderer'],
  }));

  context('Time validation on touch ', () => {
    before(function beforeHook() {
      if (typeof window.Touch === 'undefined' || typeof window.TouchEvent === 'undefined') {
        this.skip();
      }
    });

    const clockTouchEvent = {
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

    it('should select enabled hour', () => {
      const handleChange = spy();
      const handleViewChange = spy();
      render(
        <ClockPicker
          ampm={false}
          date={adapterToUse.date('2018-01-01T00:00:00.000')}
          minTime={adapterToUse.date('2018-01-01T12:15:00.000')}
          maxTime={adapterToUse.date('2018-01-01T15:45:30.000')}
          onChange={handleChange}
          onViewChange={handleViewChange}
        />,
      );

      fireTouchChangedEvent(getByMuiTest('clock'), 'touchmove', clockTouchEvent['13:--']);

      expect(handleChange.callCount).to.equal(1);
      const [date, selectionState] = handleChange.firstCall.args;
      expect(date).toEqualDateTime(adapterToUse.date('2018-01-01T13:00:00.000'));
      expect(selectionState).to.equal('shallow');
      expect(handleViewChange.callCount).to.equal(0);
    });

    it('should select enabled minute', () => {
      const handleChange = spy();
      const handleViewChange = spy();
      render(
        <ClockPicker
          ampm={false}
          date={adapterToUse.date('2018-01-01T13:00:00.000')}
          minTime={adapterToUse.date('2018-01-01T12:15:00.000')}
          maxTime={adapterToUse.date('2018-01-01T15:45:30.000')}
          onChange={handleChange}
          onViewChange={handleViewChange}
          view="minutes"
        />,
      );

      fireTouchChangedEvent(getByMuiTest('clock'), 'touchmove', clockTouchEvent['--:20']);

      expect(handleChange.callCount).to.equal(1);
      const [date, selectionState] = handleChange.firstCall.args;
      expect(date).toEqualDateTime(adapterToUse.date('2018-01-01T13:20:00.000'));
      expect(selectionState).to.equal('shallow');
      expect(handleViewChange.callCount).to.equal(0);
    });

    it('should not select minute when time is disabled', () => {
      const handleChange = spy();
      render(
        <ClockPicker
          ampm={false}
          date={adapterToUse.date('2018-01-01T20:00:00.000')}
          minTime={adapterToUse.date('2018-01-01T12:15:00.000')}
          maxTime={adapterToUse.date('2018-01-01T15:45:30.000')}
          onChange={handleChange}
          view="minutes"
        />,
      );

      fireTouchChangedEvent(getByMuiTest('clock'), 'touchmove', clockTouchEvent['--:20']);

      expect(handleChange.callCount).to.equal(0);
    });

    it('should not select disabled hour', () => {
      const handleChange = spy();
      render(
        <ClockPicker
          ampm={false}
          date={adapterToUse.date('2018-01-01T13:00:00.000')}
          minTime={adapterToUse.date('2018-01-01T12:15:00.000')}
          maxTime={adapterToUse.date('2018-01-01T15:45:30.000')}
          onChange={handleChange}
          view="hours"
        />,
      );

      fireTouchChangedEvent(getByMuiTest('clock'), 'touchmove', clockTouchEvent['20:--']);

      expect(handleChange.callCount).to.equal(0);
    });

    it('should select enabled second', () => {
      const handleChange = spy();
      const handleViewChange = spy();
      render(
        <ClockPicker
          ampm={false}
          date={adapterToUse.date('2018-01-01T13:20:00.000')}
          minTime={adapterToUse.date('2018-01-01T12:15:00.000')}
          maxTime={adapterToUse.date('2018-01-01T15:45:30.000')}
          onChange={handleChange}
          onViewChange={handleViewChange}
          view="seconds"
        />,
      );

      fireTouchChangedEvent(getByMuiTest('clock'), 'touchmove', clockTouchEvent['--:10']);

      expect(handleChange.callCount).to.equal(1);
      const [date, selectionState] = handleChange.firstCall.args;
      expect(date).toEqualDateTime(adapterToUse.date('2018-01-01T13:20:10.000'));
      expect(selectionState).to.equal('shallow');
      expect(handleViewChange.callCount).to.equal(0);
    });

    it('should not select second when time is disabled', () => {
      const handleChange = spy();
      render(
        <ClockPicker
          ampm={false}
          date={adapterToUse.date('2018-01-01T00:00:00.000')}
          minTime={adapterToUse.date('2018-01-01T12:15:00.000')}
          maxTime={adapterToUse.date('2018-01-01T15:45:30.000')}
          onChange={handleChange}
          view="seconds"
        />,
      );

      fireTouchChangedEvent(getByMuiTest('clock'), 'touchmove', clockTouchEvent['--:20']);

      expect(handleChange.callCount).to.equal(0);
    });
  });
});
