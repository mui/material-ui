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
    const { getByRole } = render(
      <ListItem>
        <ListItemSecondaryAction />
      </ListItem>,
    );
    const listItem = getByRole('listitem');
    expect(listItem.querySelector(`div.${classes.disableGutters}`)).to.equal(null);
  });

  it('should disable the gutters', () => {
    const { getByRole } = render(
      <ListItem disableGutters>
        <ListItemSecondaryAction />
      </ListItem>,
    );
    const listItem = getByRole('listitem');
    expect(listItem.querySelector(`div.${classes.root}.${classes.disableGutters}`)).not.to.equal(
      null,
    );
  });
});
