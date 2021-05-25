import * as React from 'react';
import { expect } from 'chai';
import { createMount, describeConformanceV5, act, createClientRender, fireEvent } from 'test/utils';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemButton, { listItemButtonClasses as classes } from '@material-ui/core/ListItemButton';

describe('<ListItemButton />', () => {
  const render = createClientRender();
  const mount = createMount();

  describeConformanceV5(<ListItemButton />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    mount,
    refInstanceof: window.HTMLLIElement,
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

  describe('secondary action', () => {
    it('should accept a component property', () => {
      const { getByRole } = render(
        <ListItemButton component="span">
          <ListItemText primary="primary" />
          <ListItemSecondaryAction />
        </ListItemButton>,
      );
      const listItem = getByRole('button');

      expect(listItem).to.have.class(classes.container);
      expect(listItem.querySelector(`span.${classes.root}`)).not.to.equal(null);
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
});
