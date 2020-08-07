import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createClientRender } from 'test/utils/createClientRender';
import createServerRender from 'test/utils/createServerRender';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import ButtonBase from '@material-ui/core/ButtonBase';
import ToggleButton from './ToggleButton';

describe('<ToggleButton />', () => {
  const mount = createMount();
  let classes;
  const render = createClientRender();

  before(() => {
    classes = getClasses(<ToggleButton value="classes">Hello World</ToggleButton>);
  });

  describeConformance(<ToggleButton value="X">Hello, World!</ToggleButton>, () => ({
    classes,
    inheritComponent: ButtonBase,
    mount,
    refInstanceof: window.HTMLButtonElement,
    testComponentPropWith: 'div',
  }));

  it('adds the `selected` class to the root element if selected={true}', () => {
    const { getByTestId } = render(
      <ToggleButton data-testid="root" selected value="hello">
        Hello World
      </ToggleButton>,
    );

    expect(getByTestId('root')).to.have.class(classes.selected);
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

  describe('server-side', () => {
    // Only run the test on node.
    if (!/jsdom/.test(window.navigator.userAgent)) {
      return;
    }

    const serverRender = createServerRender({ expectUseLayoutEffectWarning: true });

    it('should server-side render', () => {
      const markup = serverRender(<ToggleButton value="hello">Hello World</ToggleButton>);
      expect(markup.text()).to.equal('Hello World');
    });
  });
});
