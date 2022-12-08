import * as React from 'react';
import { expect } from 'chai';
import { describeConformance, act, createRenderer, fireEvent } from 'test/utils';
import ListItemButton, { listItemButtonClasses as classes } from '@mui/material/ListItemButton';
import ButtonBase from '@mui/material/ButtonBase';
import ListContext from '../List/ListContext';

describe('<ListItemButton />', () => {
  const { render } = createRenderer();

  describeConformance(<ListItemButton />, () => ({
    classes,
    inheritComponent: ButtonBase,
    render,
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'a',
    muiName: 'MuiListItemButton',
    testVariantProps: { dense: true },
    skip: ['componentsProp'],
  }));

  it('should render with gutters classes', () => {
    const { getByRole } = render(<ListItemButton />);
    expect(getByRole('button')).to.have.class(classes.gutters);
  });

  it('should render with the selected class', () => {
    const { getByRole } = render(<ListItemButton selected />);
    expect(getByRole('button')).to.have.class(classes.selected);
  });

  it('should disable the gutters', () => {
    const { getByRole } = render(<ListItemButton disableGutters />);
    expect(getByRole('button')).not.to.have.class(classes.gutters);
  });

  describe('context: dense', () => {
    it('should forward the context', () => {
      let context = null;
      const { setProps } = render(
        <ListItemButton>
          <ListContext.Consumer>
            {(options) => {
              context = options;
            }}
          </ListContext.Consumer>
        </ListItemButton>,
      );
      expect(context).to.have.property('dense', false);
      setProps({ dense: true });
      expect(context).to.have.property('dense', true);
    });
  });

  describe('prop: focusVisibleClassName', () => {
    it('should merge the class names', () => {
      const { getByRole } = render(
        <ListItemButton focusVisibleClassName="focusVisibleClassName" />,
      );
      const button = getByRole('button');

      act(() => {
        fireEvent.keyDown(document.activeElement || document.body, { key: 'Tab' });
        button.focus();
      });

      expect(button).to.have.class('focusVisibleClassName');
      expect(button).to.have.class(classes.focusVisible);
    });
  });

  describe('prop: href', () => {
    const href = 'example.com';

    it('should rendered as link without specifying component="a"', () => {
      const { getByRole } = render(<ListItemButton href={href} />);

      const link = getByRole('link');

      expect(!!link).to.equal(true);
    });

    it('should rendered as link when specifying component="div"', () => {
      const { getByRole } = render(<ListItemButton href={href} component="div" />);

      const link = getByRole('link');

      expect(!!link).to.equal(true);
    });

    it('should rendered as link when specifying component="a"', () => {
      const { getByRole } = render(<ListItemButton href={href} component="a" />);

      const link = getByRole('link');

      expect(!!link).to.equal(true);
    });

    it('should rendered as specifying component', () => {
      const { getByRole } = render(<ListItemButton href={href} component="h1" />);

      const heading = getByRole('heading');

      expect(!!heading).to.equal(true);
    });
  });

  describe('prop: to', () => {
    const to = 'example.com';

    it('should rendered as link without specifying component="a"', () => {
      const { getByRole } = render(<ListItemButton to={to} />);

      const link = getByRole('link');

      expect(!!link).to.equal(true);
    });

    it('should rendered as link when specifying component="div"', () => {
      const { getByRole } = render(<ListItemButton to={to} component="div" />);

      const link = getByRole('link');

      expect(!!link).to.equal(true);
    });

    it('should rendered as link when specifying component="a"', () => {
      const { getByRole } = render(<ListItemButton to={to} component="a" />);

      const link = getByRole('link');

      expect(!!link).to.equal(true);
    });

    it('should rendered as specifying component', () => {
      const { getByRole } = render(<ListItemButton to={to} component="h1" />);

      const heading = getByRole('heading');

      expect(!!heading).to.equal(true);
    });
  });
});
