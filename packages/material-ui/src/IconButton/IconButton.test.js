import * as React from 'react';
import { expect } from 'chai';
import PropTypes from 'prop-types';
import {
  getClasses,
  createMount,
  createClientRender,
  describeConformance,
  act,
  fireEvent,
} from 'test/utils';
import { stub } from 'sinon';
import Icon from '../Icon';
import ButtonBase from '../ButtonBase';
import IconButton from './IconButton';

describe('<IconButton />', () => {
  let classes;
  const mount = createMount();
  const render = createClientRender({ strict: false });

  before(() => {
    classes = getClasses(<IconButton />);
  });

  describeConformance(<IconButton>book</IconButton>, () => ({
    classes,
    inheritComponent: ButtonBase,
    mount,
    refInstanceof: window.HTMLButtonElement,
    skip: ['componentProp'],
  }));

  it('should render an inner label span (bloody safari)', () => {
    const { getByText } = render(<IconButton>book</IconButton>);
    const label = getByText('book');
    expect(label).to.have.class(classes.label);
    expect(label).to.have.property('nodeName', 'SPAN');
  });

  it('should render the child normally inside the label span', () => {
    const child = <p id="child">H</p>;
    const { container } = render(<IconButton>{child}</IconButton>);
    const label = container.querySelector(`.${classes.label}`);
    const icon = label.firstChild;
    expect(icon).to.equal(container.querySelector('#child'));
  });

  it('should render Icon children with right classes', () => {
    const childClassName = 'child-woof';
    const iconChild = <Icon data-testid="icon" className={childClassName} />;
    const { getByTestId } = render(<IconButton>{iconChild}</IconButton>);

    expect(getByTestId('icon')).to.have.class(childClassName);
  });

  it('should have a ripple by default', () => {
    const { container } = render(
      <IconButton TouchRippleProps={{ className: 'touch-ripple' }}>book</IconButton>,
    );
    expect(container.querySelector('.touch-ripple')).not.to.equal(null);
  });

  it('can disable the ripple', () => {
    const { container } = render(
      <IconButton disableRipple TouchRippleProps={{ className: 'touch-ripple' }}>
        book
      </IconButton>,
    );
    expect(container.querySelector('.touch-ripple')).to.equal(null);
  });

  it('should pass centerRipple={true} to ButtonBase', () => {
    const { container, getByRole } = render(
      <IconButton
        TouchRippleProps={{ classes: { root: 'touch-ripple', ripple: 'touch-ripple-ripple' } }}
      >
        book
      </IconButton>,
    );

    stub(container.querySelector('.touch-ripple'), 'getBoundingClientRect').callsFake(() => ({
      width: 100,
      height: 100,
      bottom: 10,
      left: 20,
      top: 20,
    }));

    fireEvent.mouseDown(getByRole('button'), { clientX: 10, clientY: 10 });
    expect(container.querySelector('.touch-ripple-ripple').style).to.have.property(
      'height',
      '101px',
    );
    expect(container.querySelector('.touch-ripple-ripple').style).to.have.property(
      'width',
      '101px',
    );
  });

  it('should have a focusRipple by default', async () => {
    const { getByRole } = render(
      <IconButton
        TouchRippleProps={{
          classes: { ripplePulsate: 'pulsate-focus-visible' },
        }}
      >
        Book
      </IconButton>,
    );
    const button = getByRole('button');

    act(() => {
      fireEvent.keyDown(document.body, { key: 'TAB' });
      button.focus();
    });
    expect(button.querySelector('.pulsate-focus-visible')).not.to.equal(null);
  });

  it('should pass disableFocusRipple to ButtonBase', async () => {
    const { getByRole } = render(
      <IconButton
        TouchRippleProps={{
          classes: { ripplePulsate: 'pulsate-focus-visible' },
        }}
        disableFocusRipple
      >
        book
      </IconButton>,
    );
    const button = getByRole('button');

    act(() => {
      fireEvent.keyDown(document.body, { key: 'TAB' });
      button.focus();
    });
    expect(button.querySelector('.pulsate-focus-visible')).to.equal(null);
  });

  describe('prop: size', () => {
    it('should render the right class', () => {
      let root;
      root = render(<IconButton size="small">book</IconButton>).container.firstChild;
      expect(root).to.have.class(classes.sizeSmall);

      root = render(<IconButton size="medium">book</IconButton>).container.firstChild;
      expect(root).not.to.have.class(classes.sizeSmall);

      root = render(<IconButton>book</IconButton>).container.firstChild;
      expect(root).not.to.have.class(classes.sizeSmall);
    });
  });

  describe('prop: edge', () => {
    it('edge="start" should render the right class', () => {
      const { container } = render(<IconButton edge="start">book</IconButton>);

      expect(container.firstChild).to.have.class(classes.edgeStart);
    });
    it('edge="end" should render the right class', () => {
      const { container } = render(<IconButton edge="end">book</IconButton>);

      expect(container.firstChild).to.have.class(classes.edgeEnd);
    });
    it('no edge should render the right class', () => {
      const { container } = render(<IconButton>book</IconButton>);

      expect(container.firstChild).not.to.have.class(classes.edgeStart);
      expect(container.firstChild).not.to.have.class(classes.edgeEnd);
    });
  });

  describe('prop: disabled', () => {
    it('should disable the component', () => {
      const { getByRole } = render(<IconButton disabled>book</IconButton>);
      const button = getByRole('button');

      expect(button).to.have.property('disabled', true);
      expect(button).to.have.class(classes.disabled);
    });
  });

  it('should raise a warning about onClick in children because of Firefox', () => {
    expect(() => {
      PropTypes.checkPropTypes(
        IconButton.Naked.propTypes,
        { classes: {}, children: <svg onClick={() => {}} /> },
        'prop',
        'MockedName',
      );
    }).toErrorDev(['Material-UI: You are providing an onClick event listener']);
  });
});
