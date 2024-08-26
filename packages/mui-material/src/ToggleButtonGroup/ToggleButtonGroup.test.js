import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer, screen } from '@mui/internal-test-utils';
import ToggleButtonGroup, {
  toggleButtonGroupClasses as classes,
} from '@mui/material/ToggleButtonGroup';
import ToggleButton, { toggleButtonClasses } from '@mui/material/ToggleButton';
import Tooltip from '@mui/material/Tooltip';
import describeConformance from '../../test/describeConformance';

describe('<ToggleButtonGroup />', () => {
  const { render } = createRenderer();

  describeConformance(<ToggleButtonGroup />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    muiName: 'MuiToggleButtonGroup',
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp', 'componentsProp'],
    testVariantProps: { size: 'small' },
    testStateOverrides: { prop: 'orientation', value: 'vertical', styleKey: 'vertical' },
  }));

  it('renders a `group`', () => {
    const { queryByRole } = render(<ToggleButtonGroup aria-label="my group" />);

    expect(queryByRole('group', { name: 'my group' })).not.to.equal(null);
  });

  it('can render group orientation vertically', () => {
    const { getByRole } = render(
      <ToggleButtonGroup orientation="vertical">
        <ToggleButton value="one">1</ToggleButton>
      </ToggleButtonGroup>,
    );
    expect(getByRole('group')).to.have.class('MuiToggleButtonGroup-vertical');
    expect(getByRole('button')).to.have.class('MuiToggleButtonGroup-groupedVertical');
  });

  it('should have horizontal class', () => {
    const { getByRole } = render(
      <ToggleButtonGroup>
        <ToggleButton value="one">1</ToggleButton>
      </ToggleButtonGroup>,
    );
    expect(getByRole('group')).to.have.class(classes.horizontal);
  });

  it('should disable all ToggleButton if disabled prop is passed', () => {
    render(
      <ToggleButtonGroup disabled>
        <ToggleButton value="one">1</ToggleButton>
        <ToggleButton value="two">2</ToggleButton>
      </ToggleButtonGroup>,
    );
    const [firstButton, secondButton] = screen.getAllByRole('button');
    expect(firstButton).to.have.property('disabled', true);
    expect(secondButton).to.have.property('disabled', true);
  });

  describe('exclusive', () => {
    it('should render a selected ToggleButton if value is selected', () => {
      const { getByRole } = render(
        <ToggleButtonGroup exclusive value="one">
          <ToggleButton value="one">1</ToggleButton>
        </ToggleButtonGroup>,
      );

      expect(getByRole('button')).to.have.attribute('aria-pressed', 'true');
    });

    it('should not render a selected ToggleButton when its value is not selected', () => {
      const { getAllByRole } = render(
        <ToggleButtonGroup exclusive value="one">
          <ToggleButton value="one">1</ToggleButton>
          <ToggleButton value="two">2</ToggleButton>
        </ToggleButtonGroup>,
      );

      expect(getAllByRole('button')[1]).to.have.attribute('aria-pressed', 'false');
    });
  });

  describe('non exclusive', () => {
    it('should render a selected ToggleButton if value is selected', () => {
      const { getAllByRole } = render(
        <ToggleButtonGroup value={['one']}>
          <ToggleButton value="one">1</ToggleButton>
          <ToggleButton value="two">2</ToggleButton>
        </ToggleButtonGroup>,
      );

      const buttons = getAllByRole('button');
      expect(buttons[0]).to.have.attribute('aria-pressed', 'true');
      expect(buttons[1]).to.have.attribute('aria-pressed', 'false');
    });
  });

  describe('prop: onChange', () => {
    describe('exclusive', () => {
      it('passed value should be null when current value is toggled off', () => {
        const handleChange = spy();
        const { getAllByRole } = render(
          <ToggleButtonGroup value="one" exclusive onChange={handleChange}>
            <ToggleButton value="one">One</ToggleButton>
            <ToggleButton value="two">Two</ToggleButton>
          </ToggleButtonGroup>,
        );

        getAllByRole('button')[0].click();

        expect(handleChange.callCount).to.equal(1);
        expect(handleChange.args[0][1]).to.equal(null);
      });

      it('should be a single value when value is toggled on', () => {
        const handleChange = spy();
        const { getAllByRole } = render(
          <ToggleButtonGroup exclusive onChange={handleChange}>
            <ToggleButton value="one">One</ToggleButton>
            <ToggleButton value="two">Two</ToggleButton>
          </ToggleButtonGroup>,
        );

        getAllByRole('button')[0].click();

        expect(handleChange.callCount).to.equal(1);
        expect(handleChange.args[0][1]).to.equal('one');
      });

      it('should be a single value when a new value is toggled on', () => {
        const handleChange = spy();
        const { getAllByRole } = render(
          <ToggleButtonGroup exclusive value="one" onChange={handleChange}>
            <ToggleButton value="one">One</ToggleButton>
            <ToggleButton value="two">Two</ToggleButton>
          </ToggleButtonGroup>,
        );

        getAllByRole('button')[1].click();

        expect(handleChange.callCount).to.equal(1);
        expect(handleChange.args[0][1]).to.equal('two');
      });
    });

    describe('non exclusive', () => {
      it('should be an empty array when current value is toggled off', () => {
        const handleChange = spy();
        const { getAllByRole } = render(
          <ToggleButtonGroup value={['one']} onChange={handleChange}>
            <ToggleButton value="one">One</ToggleButton>
            <ToggleButton value="two">Two</ToggleButton>
          </ToggleButtonGroup>,
        );

        getAllByRole('button')[0].click();

        expect(handleChange.callCount).to.equal(1);
        expect(handleChange.args[0][1]).to.deep.equal([]);
      });

      it('should be an array with a single value when value is toggled on', () => {
        const handleChange = spy();
        const { getAllByRole } = render(
          <ToggleButtonGroup onChange={handleChange}>
            <ToggleButton value="one">One</ToggleButton>
            <ToggleButton value="two">Two</ToggleButton>
          </ToggleButtonGroup>,
        );

        getAllByRole('button')[0].click();

        expect(handleChange.callCount).to.equal(1);
        expect(handleChange.args[0][1]).to.have.members(['one']);
      });

      it('should be an array with a single value when a secondary value is toggled off', () => {
        const handleChange = spy();
        const { getAllByRole } = render(
          <ToggleButtonGroup value={['one', 'two']} onChange={handleChange}>
            <ToggleButton value="one">One</ToggleButton>
            <ToggleButton value="two">Two</ToggleButton>
          </ToggleButtonGroup>,
        );

        getAllByRole('button')[0].click();

        expect(handleChange.callCount).to.equal(1);
        expect(handleChange.args[0][1]).to.have.members(['two']);
      });

      it('should be an array of all selected values when a second value is toggled on', () => {
        const handleChange = spy();
        const { getAllByRole } = render(
          <ToggleButtonGroup value={['one']} onChange={handleChange}>
            <ToggleButton value="one">One</ToggleButton>
            <ToggleButton value="two">Two</ToggleButton>
          </ToggleButtonGroup>,
        );

        getAllByRole('button')[1].click();

        expect(handleChange.callCount).to.equal(1);
        expect(handleChange.args[0][1]).to.have.members(['one', 'two']);
      });
    });
  });

  it('should not be fullWidth by default', () => {
    const { container, getAllByRole } = render(
      <ToggleButtonGroup>
        <ToggleButton value="one">1</ToggleButton>
        <ToggleButton value="two">2</ToggleButton>
      </ToggleButtonGroup>,
    );
    const button = getAllByRole('button')[1];
    const buttonGroup = container.firstChild;
    expect(buttonGroup).not.to.have.class(classes.fullWidth);
    expect(button).not.to.have.class(toggleButtonClasses.fullWidth);
  });

  it('can pass fullWidth to Button', () => {
    const { container, getAllByRole } = render(
      <ToggleButtonGroup fullWidth>
        <ToggleButton value="one">1</ToggleButton>
        <ToggleButton value="two">2</ToggleButton>
      </ToggleButtonGroup>,
    );
    const buttonGroup = container.firstChild;
    const button = getAllByRole('button')[1];
    expect(buttonGroup).to.have.class(classes.fullWidth);
    expect(button).to.have.class(toggleButtonClasses.fullWidth);
  });

  describe('position classes', () => {
    it('correctly applies position classes to buttons', () => {
      render(
        <ToggleButtonGroup value="one">
          <Tooltip title="tooltip">
            <ToggleButton value="one">One</ToggleButton>
          </Tooltip>
          <Tooltip title="tooltip">
            <span>
              <ToggleButton value="two" disabled>
                Two
              </ToggleButton>
            </span>
          </Tooltip>
          <Tooltip title="tooltip">
            <span>
              <ToggleButton value="three" disabled>
                Three
              </ToggleButton>
            </span>
          </Tooltip>
        </ToggleButtonGroup>,
      );

      const firstButton = screen.getAllByRole('button')[0];
      const middleButton = screen.getAllByRole('button')[1];
      const lastButton = screen.getAllByRole('button')[2];

      expect(firstButton).to.have.class(classes.firstButton);
      expect(firstButton).not.to.have.class(classes.middleButton);
      expect(firstButton).not.to.have.class(classes.lastButton);

      expect(middleButton).to.have.class(classes.middleButton);
      expect(middleButton).not.to.have.class(classes.firstButton);
      expect(middleButton).not.to.have.class(classes.lastButton);

      expect(lastButton).to.have.class(classes.lastButton);
      expect(lastButton).not.to.have.class(classes.middleButton);
      expect(lastButton).not.to.have.class(classes.firstButton);
    });

    it('does not apply any position classes to a single button', () => {
      render(
        <ToggleButtonGroup>
          <ToggleButton value="one">One</ToggleButton>
        </ToggleButtonGroup>,
      );

      const button = screen.getByRole('button');

      expect(button).not.to.have.class(classes.firstButton);
      expect(button).not.to.have.class(classes.middleButton);
      expect(button).not.to.have.class(classes.lastButton);
    });
  });
});
