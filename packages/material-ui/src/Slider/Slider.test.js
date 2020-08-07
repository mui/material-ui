import * as React from 'react';
import PropTypes from 'prop-types';
import { spy, stub } from 'sinon';
import { expect } from 'chai';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { createClientRender, fireEvent } from 'test/utils/createClientRender';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import Slider from './Slider';

function createTouches(touches) {
  return {
    changedTouches: touches.map(
      (touch) =>
        new Touch({
          target: document.body,
          ...touch,
        }),
    ),
  };
}

describe('<Slider />', () => {
  // Not support by IE 11
  if (typeof Touch === 'undefined') {
    return;
  }

  const mount = createMount();
  let classes;
  const render = createClientRender();

  before(() => {
    classes = getClasses(<Slider value={0} />);
  });

  describeConformance(<Slider value={0} />, () => ({
    classes,
    inheritComponent: 'span',
    mount,
    refInstanceof: window.HTMLSpanElement,
    testComponentPropWith: 'span',
  }));

  it('should call handlers', () => {
    const handleChange = spy();
    const handleChangeCommitted = spy();

    const { container, getByRole } = render(
      <Slider onChange={handleChange} onChangeCommitted={handleChangeCommitted} value={0} />,
    );
    const slider = getByRole('slider');

    fireEvent.mouseDown(container.firstChild);
    fireEvent.mouseUp(document.body);

    expect(handleChange.callCount).to.equal(1);
    expect(handleChangeCommitted.callCount).to.equal(1);

    slider.focus();
    fireEvent.keyDown(slider, {
      key: 'Home',
    });
    expect(handleChange.callCount).to.equal(2);
    expect(handleChangeCommitted.callCount).to.equal(2);
  });

  it('should only listen to changes from the same touchpoint', () => {
    const handleChange = spy();
    const handleChangeCommitted = spy();
    const { container } = render(
      <Slider onChange={handleChange} onChangeCommitted={handleChangeCommitted} value={0} />,
    );

    fireEvent.touchStart(container.firstChild, createTouches([{ identifier: 1 }]));
    expect(handleChange.callCount).to.equal(1);
    expect(handleChangeCommitted.callCount).to.equal(0);

    fireEvent.touchEnd(document.body, createTouches([{ identifier: 2 }]));
    expect(handleChange.callCount).to.equal(1);
    expect(handleChangeCommitted.callCount).to.equal(0);

    fireEvent.touchMove(document.body, createTouches([{ identifier: 1 }]));
    expect(handleChange.callCount).to.equal(2);
    expect(handleChangeCommitted.callCount).to.equal(0);

    fireEvent.touchMove(document.body, createTouches([{ identifier: 2 }]));
    expect(handleChange.callCount).to.equal(2);
    expect(handleChangeCommitted.callCount).to.equal(0);

    fireEvent.touchEnd(document.body, createTouches([{ identifier: 1 }]));
    expect(handleChange.callCount).to.equal(2);
    expect(handleChangeCommitted.callCount).to.equal(1);
  });

  describe('prop: orientation', () => {
    it('should render with the vertical classes', () => {
      const { container, getByRole } = render(<Slider orientation="vertical" value={0} />);
      expect(container.firstChild).to.have.class(classes.vertical);
      expect(getByRole('slider')).to.have.attribute('aria-orientation', 'vertical');
    });

    it('should report the right position', () => {
      const handleChange = spy();
      const { container } = render(
        <Slider orientation="vertical" defaultValue={20} onChange={handleChange} />,
      );
      stub(container.firstChild, 'getBoundingClientRect').callsFake(() => ({
        width: 10,
        height: 100,
        bottom: 100,
        left: 0,
      }));

      fireEvent.touchStart(
        container.firstChild,
        createTouches([{ identifier: 1, clientX: 0, clientY: 20 }]),
      );
      fireEvent.touchMove(
        document.body,
        createTouches([{ identifier: 1, clientX: 0, clientY: 22 }]),
      );

      expect(handleChange.callCount).to.equal(2);
      expect(handleChange.args[0][1]).to.equal(80);
      expect(handleChange.args[1][1]).to.equal(78);
    });
  });

  describe('range', () => {
    it('should support keyboard', () => {
      const { getAllByRole } = render(<Slider defaultValue={[20, 30]} />);
      const [thumb1, thumb2] = getAllByRole('slider');

      thumb1.focus();
      fireEvent.keyDown(thumb1, {
        key: 'ArrowRight',
      });
      expect(thumb1.getAttribute('aria-valuenow')).to.equal('21');

      thumb2.focus();
      fireEvent.keyDown(thumb2, {
        key: 'ArrowLeft',
      });
      expect(thumb2.getAttribute('aria-valuenow')).to.equal('29');
    });

    it('should focus the slider when dragging', () => {
      const { getByRole } = render(<Slider defaultValue={30} step={10} marks />);
      const thumb = getByRole('slider');
      fireEvent.mouseDown(thumb);
      expect(document.activeElement).to.equal(thumb);
    });

    it('should support mouse events', () => {
      const handleChange = spy();
      const { container } = render(<Slider defaultValue={[20, 30]} onChange={handleChange} />);
      stub(container.firstChild, 'getBoundingClientRect').callsFake(() => ({
        width: 100,
        height: 10,
        bottom: 10,
        left: 0,
      }));

      fireEvent.touchStart(
        container.firstChild,
        createTouches([{ identifier: 1, clientX: 21, clientY: 0 }]),
      );

      fireEvent.touchMove(
        document.body,
        createTouches([{ identifier: 1, clientX: 22, clientY: 0 }]),
      );
      fireEvent.touchMove(
        document.body,
        createTouches([{ identifier: 1, clientX: 22, clientY: 0 }]),
      );

      expect(handleChange.callCount).to.equal(3);
      expect(handleChange.args[0][1]).to.deep.equal([21, 30]);
      expect(handleChange.args[1][1]).to.deep.equal([22, 30]);
      expect(handleChange.args[2][1]).to.equal(handleChange.args[1][1]);
    });
  });

  describe('prop: step', () => {
    it('should handle a null step', () => {
      const { getByRole, container } = render(
        <Slider
          step={null}
          marks={[{ value: 0 }, { value: 20 }, { value: 30 }]}
          defaultValue={0}
        />,
      );
      stub(container.firstChild, 'getBoundingClientRect').callsFake(() => ({
        width: 100,
        height: 10,
        bottom: 10,
        left: 0,
      }));
      const thumb = getByRole('slider');

      fireEvent.touchStart(
        container.firstChild,
        createTouches([{ identifier: 1, clientX: 21, clientY: 0 }]),
      );
      expect(thumb).to.have.attribute('aria-valuenow', '20');

      thumb.focus();
      fireEvent.keyDown(thumb, {
        key: 'ArrowUp',
      });
      expect(thumb).to.have.attribute('aria-valuenow', '30');

      fireEvent.keyDown(thumb, {
        key: 'ArrowDown',
      });
      expect(thumb).to.have.attribute('aria-valuenow', '20');
    });
  });

  describe('prop: disabled', () => {
    it('should render the disabled classes', () => {
      const { container, getByRole } = render(<Slider disabled value={0} />);
      expect(container.firstChild).to.have.class(classes.disabled);
      expect(getByRole('slider')).to.not.have.attribute('tabIndex');
    });
  });

  describe('prop: track', () => {
    it('should render the track classes for false', () => {
      const { container } = render(<Slider track={false} value={50} />);
      expect(container.firstChild).to.have.class(classes.trackFalse);
    });

    it('should render the track classes for inverted', () => {
      const { container } = render(<Slider track="inverted" value={50} />);
      expect(container.firstChild).to.have.class(classes.trackInverted);
    });
  });

  describe('keyboard', () => {
    it('should handle all the keys', () => {
      const { getByRole } = render(<Slider defaultValue={50} />);
      const thumb = getByRole('slider');
      thumb.focus();

      fireEvent.keyDown(thumb, {
        key: 'Home',
      });
      expect(thumb).to.have.attribute('aria-valuenow', '0');

      fireEvent.keyDown(thumb, {
        key: 'End',
      });
      expect(thumb).to.have.attribute('aria-valuenow', '100');

      fireEvent.keyDown(thumb, {
        key: 'PageDown',
      });
      expect(thumb).to.have.attribute('aria-valuenow', '90');

      fireEvent.keyDown(thumb, {
        key: 'Escape',
      });
      expect(thumb).to.have.attribute('aria-valuenow', '90');

      fireEvent.keyDown(thumb, {
        key: 'PageUp',
      });
      expect(thumb).to.have.attribute('aria-valuenow', '100');
    });

    const moveLeftEvent = {
      key: 'ArrowLeft',
    };
    const moveRightEvent = {
      key: 'ArrowRight',
    };

    it('should use min as the step origin', () => {
      const { getByRole } = render(<Slider defaultValue={150} step={100} max={750} min={150} />);
      const thumb = getByRole('slider');
      thumb.focus();

      fireEvent.keyDown(thumb, moveRightEvent);
      expect(thumb).to.have.attribute('aria-valuenow', '250');

      fireEvent.keyDown(thumb, moveLeftEvent);
      expect(thumb).to.have.attribute('aria-valuenow', '150');
    });

    it('should reach right edge value', () => {
      const { getByRole } = render(<Slider defaultValue={90} min={6} max={108} step={10} />);
      const thumb = getByRole('slider');
      thumb.focus();

      fireEvent.keyDown(thumb, moveRightEvent);
      expect(thumb).to.have.attribute('aria-valuenow', '96');

      fireEvent.keyDown(thumb, moveRightEvent);
      expect(thumb).to.have.attribute('aria-valuenow', '106');

      fireEvent.keyDown(thumb, moveRightEvent);
      expect(thumb).to.have.attribute('aria-valuenow', '108');

      fireEvent.keyDown(thumb, moveLeftEvent);
      expect(thumb).to.have.attribute('aria-valuenow', '96');

      fireEvent.keyDown(thumb, moveLeftEvent);
      expect(thumb).to.have.attribute('aria-valuenow', '86');
    });

    it('should reach left edge value', () => {
      const { getByRole } = render(<Slider defaultValue={20} min={6} max={108} step={10} />);
      const thumb = getByRole('slider');
      thumb.focus();

      fireEvent.keyDown(thumb, moveLeftEvent);
      expect(thumb).to.have.attribute('aria-valuenow', '6');

      fireEvent.keyDown(thumb, moveRightEvent);
      expect(thumb).to.have.attribute('aria-valuenow', '16');

      fireEvent.keyDown(thumb, moveRightEvent);
      expect(thumb).to.have.attribute('aria-valuenow', '26');
    });

    it('should round value to step precision', () => {
      const { getByRole } = render(<Slider defaultValue={0.2} min={0} max={1} step={0.1} />);
      const thumb = getByRole('slider');
      thumb.focus();

      fireEvent.keyDown(thumb, moveRightEvent);
      expect(thumb).to.have.attribute('aria-valuenow', '0.3');
    });

    it('should not fail to round value to step precision when step is very small', () => {
      const { getByRole } = render(
        <Slider defaultValue={0.00000002} min={0} max={0.00000005} step={0.00000001} />,
      );
      const thumb = getByRole('slider');
      thumb.focus();

      fireEvent.keyDown(thumb, moveRightEvent);
      expect(thumb).to.have.attribute('aria-valuenow', '3e-8');
    });

    it('should not fail to round value to step precision when step is very small and negative', () => {
      const { getByRole } = render(
        <Slider defaultValue={-0.00000002} min={-0.00000005} max={0} step={0.00000001} />,
      );
      const thumb = getByRole('slider');
      thumb.focus();

      fireEvent.keyDown(thumb, moveLeftEvent);
      expect(thumb).to.have.attribute('aria-valuenow', '-3e-8');
    });

    it('should handle RTL', () => {
      const { getByRole } = render(
        <ThemeProvider
          theme={createMuiTheme({
            direction: 'rtl',
          })}
        >
          <Slider defaultValue={30} />
        </ThemeProvider>,
      );
      const thumb = getByRole('slider');
      thumb.focus();

      fireEvent.keyDown(thumb, moveLeftEvent);
      expect(thumb).to.have.attribute('aria-valuenow', '31');
      fireEvent.keyDown(thumb, moveRightEvent);
      expect(thumb).to.have.attribute('aria-valuenow', '30');
    });
  });

  describe('prop: valueLabelDisplay', () => {
    it('should always display the value label', () => {
      const { getByRole, setProps } = render(<Slider valueLabelDisplay="auto" value={50} />);
      const thumb = getByRole('slider');
      expect(thumb.textContent).to.equal('50');
      setProps({
        valueLabelDisplay: 'off',
      });
      expect(thumb.textContent).to.equal('');
    });
  });

  describe('markActive state', () => {
    function getActives(container) {
      return Array.from(container.querySelectorAll(`.${classes.mark}`)).map((node) =>
        node.classList.contains(classes.markActive),
      );
    }

    it('sets the marks active that are `within` the value', () => {
      const marks = [{ value: 5 }, { value: 10 }, { value: 15 }];

      const { container: container1 } = render(
        <Slider min={0} max={20} value={12} marks={marks} />,
      );
      expect(getActives(container1)).to.deep.equal([true, true, false]);

      const { container: container2 } = render(
        <Slider min={0} max={20} value={[8, 12]} marks={marks} />,
      );
      expect(getActives(container2)).to.deep.equal([false, true, false]);
    });

    it('uses closed intervals for the within check', () => {
      const { container: container1 } = render(
        <Slider value={10} min={0} max={10} marks step={5} />,
      );
      expect(getActives(container1)).to.deep.equal([true, true, true]);

      const { container: container2 } = render(
        <Slider value={9.99999} min={0} max={10} marks step={5} />,
      );
      expect(getActives(container2)).to.deep.equal([true, true, false]);
    });

    it('should support inverted track', () => {
      const marks = [{ value: 5 }, { value: 10 }, { value: 15 }];

      const { container: container1 } = render(
        <Slider min={0} max={20} value={12} marks={marks} track="inverted" />,
      );
      expect(getActives(container1)).to.deep.equal([false, false, true]);

      const { container: container2 } = render(
        <Slider min={0} max={20} value={[8, 12]} marks={marks} track="inverted" />,
      );
      expect(getActives(container2)).to.deep.equal([true, false, true]);
    });
  });

  it('should forward mouseDown', () => {
    const handleMouseDown = spy();
    const { container } = render(<Slider disabled onMouseDown={handleMouseDown} value={0} />);
    fireEvent.mouseDown(container.firstChild);
    expect(handleMouseDown.callCount).to.equal(1);
  });

  it('should handle RTL', () => {
    const handleChange = spy();
    const { container, getByRole } = render(
      <ThemeProvider
        theme={createMuiTheme({
          direction: 'rtl',
        })}
      >
        <Slider value={30} onChange={handleChange} />
      </ThemeProvider>,
    );
    const thumb = getByRole('slider');
    expect(thumb.style.right).to.equal('30%');

    stub(container.firstChild, 'getBoundingClientRect').callsFake(() => ({
      width: 100,
      height: 10,
      bottom: 10,
      left: 0,
    }));

    fireEvent.touchStart(
      container.firstChild,
      createTouches([{ identifier: 1, clientX: 20, clientY: 0 }]),
    );

    fireEvent.touchMove(document.body, createTouches([{ identifier: 1, clientX: 22, clientY: 0 }]));

    expect(handleChange.callCount).to.equal(2);
    expect(handleChange.args[0][1]).to.equal(80);
    expect(handleChange.args[1][1]).to.equal(78);
  });

  describe('warnings', () => {
    beforeEach(() => {
      consoleErrorMock.spy();
      PropTypes.resetWarningCache();
    });

    afterEach(() => {
      consoleErrorMock.reset();
    });

    it('should warn if aria-valuetext is provided', () => {
      PropTypes.checkPropTypes(
        Slider.Naked.propTypes,
        { classes: {}, value: [20, 50], 'aria-valuetext': 'hot' },
        'prop',
        'MockedSlider',
      );

      expect(consoleErrorMock.callCount()).to.equal(1);
      expect(consoleErrorMock.messages()[0]).to.include(
        'Material-UI: You need to use the `getAriaValueText` prop instead of',
      );
    });

    it('should warn if aria-label is provided', () => {
      PropTypes.checkPropTypes(
        Slider.Naked.propTypes,
        { classes: {}, value: [20, 50], 'aria-label': 'hot' },
        'prop',
        'MockedSlider',
      );

      expect(consoleErrorMock.callCount()).to.equal(1);
      expect(consoleErrorMock.messages()[0]).to.include(
        'Material-UI: You need to use the `getAriaLabel` prop instead of',
      );
    });

    it('should warn when switching from controlled to uncontrolled', () => {
      const { setProps } = render(<Slider value={[20, 50]} />);

      setProps({ value: undefined });
      expect(consoleErrorMock.messages()[0]).to.include(
        'Material-UI: A component is changing the controlled value state of Slider to be uncontrolled.',
      );
    });

    it('should warn when switching between uncontrolled to controlled', () => {
      const { setProps } = render(<Slider />);

      setProps({ value: [20, 50] });
      expect(consoleErrorMock.messages()[0]).to.include(
        'Material-UI: A component is changing the uncontrolled value state of Slider to be controlled.',
      );
    });
  });

  it('should support getAriaValueText', () => {
    const getAriaValueText = (value) => `${value}°C`;
    const { getAllByRole } = render(
      <Slider value={[20, 50]} getAriaValueText={getAriaValueText} />,
    );
    const sliders = getAllByRole('slider');

    expect(sliders[0]).to.have.attribute('aria-valuetext', '20°C');
    expect(sliders[1]).to.have.attribute('aria-valuetext', '50°C');
  });

  it('should support getAriaLabel', () => {
    const getAriaLabel = (index) => `Label ${index}`;
    const { getAllByRole } = render(<Slider value={[20, 50]} getAriaLabel={getAriaLabel} />);
    const sliders = getAllByRole('slider');

    expect(sliders[0]).to.have.attribute('aria-label', 'Label 0');
    expect(sliders[1]).to.have.attribute('aria-label', 'Label 1');
  });

  it('should allow customization of the marks', () => {
    const { container } = render(
      <Slider
        marks={[
          { value: 0, label: 0 },
          { value: 20, label: 20 },
          { value: 30, label: 30 },
        ]}
        defaultValue={0}
      />,
    );
    expect(container.querySelectorAll(`.${classes.markLabel}`).length).to.equal(3);
    expect(container.querySelectorAll(`.${classes.mark}`).length).to.equal(3);
    expect(container.querySelectorAll(`.${classes.markLabel}[data-index="2"]`).length).to.equal(1);
    expect(container.querySelectorAll(`.${classes.mark}[data-index="2"]`).length).to.equal(1);
  });

  describe('prop: ValueLabelComponent', () => {
    it('receives the formatted value', () => {
      function ValueLabelComponent(props) {
        const { value } = props;
        return <span data-testid="value-label">{value}</span>;
      }
      ValueLabelComponent.propTypes = { value: PropTypes.string };

      const { getByTestId } = render(
        <Slider
          value={10}
          ValueLabelComponent={ValueLabelComponent}
          valueLabelDisplay="on"
          valueLabelFormat={(n) => n.toString(2)}
        />,
      );

      expect(getByTestId('value-label')).to.have.text('1010');
    });
  });
});
