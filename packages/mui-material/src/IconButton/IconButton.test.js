import * as React from 'react';
import { expect } from 'chai';
import PropTypes from 'prop-types';
import { createRenderer, describeConformance } from 'test/utils';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import IconButton, { iconButtonClasses as classes } from '@mui/material/IconButton';
import { unstable_capitalize as capitalize } from '@mui/utils';
import Icon from '@mui/material/Icon';
import ButtonBase from '@mui/material/ButtonBase';

describe('<IconButton />', () => {
  const { render } = createRenderer();

  describeConformance(<IconButton>book</IconButton>, () => ({
    classes,
    inheritComponent: ButtonBase,
    render,
    refInstanceof: window.HTMLButtonElement,
    muiName: 'MuiIconButton',
    testVariantProps: { edge: 'end', disabled: true },
    skip: ['componentProp', 'componentsProp'],
  }));

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

  it('can disable the ripple and hover effect', () => {
    const { container } = render(
      <IconButton disableRipple TouchRippleProps={{ className: 'touch-ripple' }}>
        book
      </IconButton>,
    );
    expect(container.querySelector('.touch-ripple')).to.equal(null);
  });

  describe('prop: size', () => {
    it('should render the right class', () => {
      let root;
      root = render(<IconButton size="small">book</IconButton>).container.firstChild;
      expect(root).to.have.class(classes.sizeSmall);

      root = render(<IconButton size="medium">book</IconButton>).container.firstChild;
      expect(root).not.to.have.class(classes.sizeSmall);

      root = render(<IconButton size="large">book</IconButton>).container.firstChild;
      expect(root).to.have.class(classes.sizeLarge);

      root = render(<IconButton>book</IconButton>).container.firstChild;
      expect(root).not.to.have.class(classes.sizeSmall);
      expect(root).not.to.have.class(classes.sizeLarge);
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

  describe('prop: color', () => {
    ['primary', 'secondary', 'error', 'info', 'success', 'warning'].forEach((color) => {
      it(`should render the ${color} class`, () => {
        const { getByRole } = render(<IconButton color={color}>Hello World</IconButton>);
        const button = getByRole('button');
        expect(button).to.have.class(classes[`color${capitalize(color)}`]);
      });
    });
  });

  it('should raise a warning about onClick in children because of Firefox', () => {
    expect(() => {
      PropTypes.checkPropTypes(
        IconButton.propTypes,
        { classes: {}, children: <svg onClick={() => {}} /> },
        'prop',
        'MockedName',
      );
    }).toErrorDev(['MUI: You are providing an onClick event listener']);
  });

  it('should not throw error for a custom color', () => {
    expect(() => (
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiIconButton: {
              defaultProps: {
                color: 'custom',
              },
            },
          },
        })}
      >
        <IconButton />
      </ThemeProvider>
    )).not.to.throw();
  });
});
