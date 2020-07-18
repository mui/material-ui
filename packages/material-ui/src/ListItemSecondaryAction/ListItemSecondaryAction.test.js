import * as React from 'react';
import { expect } from 'chai';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import { createClientRender } from 'test/utils/createClientRender';
import describeConformance from '../test-utils/describeConformance';
import ListItemSecondaryAction from './ListItemSecondaryAction';
import ListItem from '../ListItem';

describe('<ListItemSecondaryAction />', () => {
  const mount = createMount();
  const render = createClientRender();
  let classes;

  before(() => {
    classes = getClasses(<ListItemSecondaryAction />);
  });

  describeConformance(<ListItemSecondaryAction />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
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
