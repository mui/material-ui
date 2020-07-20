import * as React from 'react';
import { getClasses, createMount, describeConformance } from 'test/utils';
import ListItemAvatar from './ListItemAvatar';

describe('<ListItemAvatar />', () => {
  const mount = createMount();
  let classes;

  before(() => {
    classes = getClasses(
      <ListItemAvatar>
        <div />
      </ListItemAvatar>,
    );
  });

  describeConformance(
    <ListItemAvatar>
      <div />
    </ListItemAvatar>,
    () => ({
      classes,
      inheritComponent: 'div',
      mount,
      refInstanceof: window.HTMLDivElement,
      skip: ['componentProp'],
    }),
  );
});
