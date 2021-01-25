import * as React from 'react';
import { expect } from 'chai';
import { createMount, createClientRender, describeConformanceV5 } from 'test/utils';
import ListItemSecondaryAction from './ListItemSecondaryAction';
import ListItem from '../ListItem';
import classes from './listItemSecondaryActionClasses';

describe('<ListItemSecondaryAction />', () => {
  const mount = createMount();
  const render = createClientRender();

  describeConformanceV5(<ListItemSecondaryAction />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiListItemSecondaryAction',
    skip: ['componentProp', 'componentsProp', 'themeVariants'],
  }));

  it('should render without classes that disable gutters', () => {
    const { getByTestId } = render(
      <ListItem>
        <ListItemSecondaryAction data-testid="secondary-action" />
      </ListItem>,
    );
    expect(getByTestId('secondary-action')).not.to.have.class(classes.disableGutters);
  });

  it('should disable the gutters', () => {
    const { getByTestId } = render(
      <ListItem disableGutters>
        <ListItemSecondaryAction data-testid="secondary-action" />
      </ListItem>,
    );
    expect(getByTestId('secondary-action')).to.have.class(classes.disableGutters);
  });
});
