import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer } from '@mui/internal-test-utils';
import describeSkipIf from '@mui/internal-test-utils/describeSkipIf';
import ToggleButton, { toggleButtonClasses as classes } from '@mui/material/ToggleButton';
import ButtonBase from '@mui/material/ButtonBase';
import describeConformance from '../../test/describeConformance';

describe('<ToggleButton />', () => {
  const { render, renderToString } = createRenderer();

  describeConformance(<ToggleButton value="X">Hello, World!</ToggleButton>, () => ({
    classes,
    inheritComponent: ButtonBase,
    render,
    muiName: 'MuiToggleButton',
    testVariantProps: { variant: 'foo' },
    testStateOverrides: { prop: 'size', value: 'large', styleKey: 'sizeLarge' },
    refInstanceof: window.HTMLButtonElement,
    testComponentPropWith: 'div',
    skip: ['componentProp', 'componentsProp'],
  }));

  it('adds the `selected` class to the root element if selected={true}', () => {
    const { getByTestId } = render(
      <ToggleButton data-testid="root" selected value="hello">
        Hello World
      </ToggleButton>,
    );

    expect(getByTestId('root')).to.have.class(classes.selected);
  });

  describe('prop: color', () => {
    it('adds the class if color="primary"', () => {
      const { getByTestId } = render(
        <ToggleButton data-testid="root" color="primary" value="hello">
          Hello World
        </ToggleButton>,
      );

      expect(getByTestId('root')).to.have.class(classes.primary);
    });
  });

  it('should render a disabled button if `disabled={true}`', () => {
    const { getByRole } = render(
      <ToggleButton disabled value="hello">
        Hello World
      </ToggleButton>,
    );

    expect(getByRole('button')).to.have.property('disabled', true);
  });

  it('can render a small button', () => {
    const { getByTestId } = render(
      <ToggleButton data-testid="root" size="small" value="hello">
        Hello World
      </ToggleButton>,
    );

    const root = getByTestId('root');
    expect(root).to.have.class(classes.root);
    expect(root).to.have.class(classes.sizeSmall);
    expect(root).not.to.have.class(classes.sizeLarge);
  });

  it('should render a large button', () => {
    const { getByTestId } = render(
      <ToggleButton data-testid="root" size="large" value="hello">
        Hello World
      </ToggleButton>,
    );

    const root = getByTestId('root');
    expect(root).to.have.class(classes.root);
    expect(root).not.to.have.class(classes.sizeSmall);
    expect(root).to.have.class(classes.sizeLarge);
  });

  describe('prop: onChange', () => {
    it('should be called when clicked', () => {
      const handleChange = spy();
      const { getByRole } = render(
        <ToggleButton value="1" onChange={handleChange}>
          Hello
        </ToggleButton>,
      );

      getByRole('button').click();

      expect(handleChange.callCount).to.equal(1);
    });

    it('should be called with the button value', () => {
      const handleChange = spy();
      const { getByRole } = render(
        <ToggleButton value="1" onChange={handleChange}>
          Hello
        </ToggleButton>,
      );

      getByRole('button').click();

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.equal('1');
    });

    it('should not be called if the click is prevented', () => {
      const handleChange = spy();
      const { getByRole } = render(
        <ToggleButton
          value="one"
          onChange={handleChange}
          onClick={(event) => event.preventDefault()}
        >
          Hello
        </ToggleButton>,
      );

      getByRole('button').click();

      expect(handleChange.callCount).to.equal(0);
    });
  });

  describeSkipIf(!window.navigator.userAgent.includes('jsdom'))('server-side', () => {
    it('should server-side render', () => {
      const { container } = renderToString(<ToggleButton value="hello">Hello World</ToggleButton>);
      expect(container.firstChild).to.have.text('Hello World');
    });
  });
});
