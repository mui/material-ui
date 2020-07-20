import * as React from 'react';
import { getClasses, createMount, describeConformance } from 'test/utils';
import ListItemIcon from './ListItemIcon';

describe('<ListItemIcon />', () => {
  const mount = createMount();
  let classes;

  before(() => {
    classes = getClasses(
      <ListItemIcon>
        <span />
      </ListItemIcon>,
    );
  });

  describeConformance(
    <ListItemIcon>
      <div />
    </ListItemIcon>,
    () => ({
      classes,
      inheritComponent: 'div',
      mount,
      refInstanceof: window.HTMLDivElement,
      skip: ['componentProp'],
    }),
  );
});
