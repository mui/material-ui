import * as React from 'react';
import { expect } from 'chai';
import { stub } from 'sinon';
import { createRenderer, fireEvent, screen } from '@mui/internal-test-utils';
import { EnhancedSlider, sliderClasses as classes } from '@mui/material/Slider';
import describeConformance from '../../test/describeConformance';

describe('<EnhancedSlider />', () => {
  const { render } = createRenderer();

  describeConformance(
    <EnhancedSlider value={30} showMarks customMarks={[{ value: 30, label: '30' }]} />,
    () => ({
      classes,
      inheritComponent: 'span',
      render,
      refInstanceof: window.HTMLSpanElement,
      muiName: 'MuiSlider',
      testDeepOverrides: { slotName: 'thumb', slotClassName: classes.thumb },
      testVariantProps: { color: 'primary', orientation: 'vertical', size: 'small' },
      testStateOverrides: { prop: 'color', value: 'secondary', styleKey: 'colorSecondary' },
      testLegacyComponentsProp: true,
      slots: {
        root: {
          expectedClassName: classes.root,
        },
        thumb: {
          expectedClassName: classes.thumb,
        },
        track: {
          expectedClassName: classes.track,
        },
        rail: {
          expectedClassName: classes.rail,
        },
        input: {
          expectedClassName: classes.input,
        },
        mark: {
          expectedClassName: classes.mark,
        },
        markLabel: {
          expectedClassName: classes.markLabel,
        },
      },
      skip: [
        'slotPropsCallback', // not supported yet
        'slotPropsCallbackWithPropsAsOwnerState', // not supported yet
      ],
    }),
  );

  describe('enhanced features', () => {
    it('should render with auto-generated marks by default', () => {
      const { container } = render(<EnhancedSlider value={50} min={0} max={100} step={10} />);
      expect(container.querySelectorAll(`.${classes.mark}`)).to.have.length.greaterThan(0);
    });

    it('should support custom marks', () => {
      const customMarks = [
        { value: 0, label: 'Start' },
        { value: 50, label: 'Middle' },
        { value: 100, label: 'End' },
      ];
      render(
        <EnhancedSlider value={50} customMarks={customMarks} showMarks />
      );
      expect(screen.getByText('Start')).not.to.equal(null);
      expect(screen.getByText('Middle')).not.to.equal(null);
      expect(screen.getByText('End')).not.to.equal(null);
    });

    it('should support range selection', () => {
      const { container } = render(
        <EnhancedSlider value={[20, 80]} range min={0} max={100} />
      );
      const thumbs = container.querySelectorAll(`.${classes.thumb}`);
      expect(thumbs).to.have.length(2);
    });

    it('should support custom value formatting', () => {
      const formatValueLabel = (value) => `${value}%`;
      render(
        <EnhancedSlider
          value={75}
          formatValueLabel={formatValueLabel}
          showTooltips
        />
      );
      // The aria-valuetext should contain the formatted value
      const input = screen.getByRole('slider');
      expect(input).to.have.attribute('aria-valuetext', '75%');
    });

    it('should handle showMarks prop', () => {
      const { container, rerender } = render(<EnhancedSlider value={50} showMarks={false} />);
      expect(container.querySelectorAll(`.${classes.mark}`)).to.have.length(0);

      rerender(<EnhancedSlider value={50} showMarks />);
      expect(container.querySelectorAll(`.${classes.mark}`)).to.have.length.greaterThan(0);
    });

    it('should handle showTooltips prop', () => {
      const { container } = render(<EnhancedSlider value={50} showTooltips />);
      // Tooltips should be present when showTooltips is true
      const valueLabel = container.querySelector(`.${classes.valueLabel}`);
      expect(valueLabel).not.to.equal(null);
    });

    it('should call onChange with correct parameters', () => {
      const handleChange = (event, value, activeThumb) => {
        expect(typeof value).to.equal('number');
        expect(typeof activeThumb).to.equal('number');
      };

      const { container } = render(
        <EnhancedSlider value={50} onChange={handleChange} />
      );

      stub(container.firstChild, 'getBoundingClientRect').callsFake(() => ({
        width: 100,
        left: 0,
      }));

      fireEvent.mouseDown(container.firstChild, {
        buttons: 1,
        clientX: 75,
      });
    });

    it('should support range onChange with array values', () => {
      const handleChange = (event, value, activeThumb) => {
        expect(Array.isArray(value)).to.equal(true);
        expect(value).to.have.length(2);
        expect(typeof activeThumb).to.equal('number');
      };

      const { container } = render(
        <EnhancedSlider value={[20, 80]} range onChange={handleChange} />
      );

      stub(container.firstChild, 'getBoundingClientRect').callsFake(() => ({
        width: 100,
        left: 0,
      }));

      fireEvent.mouseDown(container.firstChild, {
        buttons: 1,
        clientX: 50,
      });
    });
  });

  describe('backward compatibility', () => {
    it('should work with standard Slider props', () => {
      const { container } = render(
        <EnhancedSlider
          value={30}
          min={0}
          max={100}
          step={5}
          disabled
          orientation="vertical"
          color="secondary"
        />
      );

      const root = container.firstChild;
      expect(root).to.have.class(classes.root);
      expect(root).to.have.class(classes.disabled);
      expect(root).to.have.class(classes.vertical);
      expect(root).to.have.class(classes.colorSecondary);
    });

    it('should support all standard Slider event handlers', () => {
      const handleChange = () => {};
      const handleChangeCommitted = () => {};

      expect(() => {
        render(
          <EnhancedSlider
            value={50}
            onChange={handleChange}
            onChangeCommitted={handleChangeCommitted}
          />
        );
      }).not.to.throw();
    });
  });
});