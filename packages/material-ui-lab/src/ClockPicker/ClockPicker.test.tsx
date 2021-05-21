import * as React from 'react';
import { expect } from 'chai';
import { createMount, describeConformance, fireEvent, fireTouchChangedEvent } from 'test/utils';
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

    beforeEach(() => {
      render(
        <ClockPicker
          ampm={false}
          date={adapterToUse.date('2018-01-01T00:00:00.000')}
          minTime={adapterToUse.date('2018-01-01T12:15:00.000')}
          maxTime={adapterToUse.date('2018-01-01T15:45:30.000')}
          onChange={() => {}}
          views={['hours', 'minutes', 'seconds']}
        />,
      );
    });

    it('should select enabled hour', () => {
      fireTouchChangedEvent(getByMuiTest('clock'), 'touchmove', clockTouchEvent['13:--']);
      expect(getByMuiTest('hours')).to.have.text('13');
    });

    it('should select enabled minute', () => {
      fireTouchChangedEvent(getByMuiTest('clock'), 'touchmove', clockTouchEvent['13:--']);
      fireTouchChangedEvent(getByMuiTest('clock'), 'touchend', clockTouchEvent['13:--']);

      fireTouchChangedEvent(getByMuiTest('clock'), 'touchmove', clockTouchEvent['--:20']);

      expect(getByMuiTest('minutes')).to.have.text('20');
    });

    it('should not select minute when hour is disabled ', () => {
      fireTouchChangedEvent(getByMuiTest('clock'), 'touchmove', clockTouchEvent['20:--']);
      fireTouchChangedEvent(getByMuiTest('clock'), 'touchend', clockTouchEvent['20:--']);

      fireTouchChangedEvent(getByMuiTest('clock'), 'touchmove', clockTouchEvent['--:20']);
    });

    it('should not select disabled hour', () => {
      fireTouchChangedEvent(getByMuiTest('clock'), 'touchmove', clockTouchEvent['20:--']);
      expect(getByMuiTest('hours')).to.have.text('00');
    });

    it('should not select disabled second', () => {
      fireEvent.click(getByMuiTest('seconds'));
      fireTouchChangedEvent(getByMuiTest('clock'), 'touchmove', clockTouchEvent['--:20']);

      expect(getByMuiTest('seconds')).to.have.text('00');
    });

    it('should select enabled second', () => {
      fireTouchChangedEvent(getByMuiTest('clock'), 'touchmove', clockTouchEvent['13:--']);
      fireTouchChangedEvent(getByMuiTest('clock'), 'touchend', clockTouchEvent['13:--']);

      fireTouchChangedEvent(getByMuiTest('clock'), 'touchmove', clockTouchEvent['--:20']);
      fireTouchChangedEvent(getByMuiTest('clock'), 'touchend', clockTouchEvent['--:20']);

      fireTouchChangedEvent(getByMuiTest('clock'), 'touchmove', clockTouchEvent['--:10']);

      expect(getByMuiTest('seconds')).to.have.text('10');
    });
  });
});
