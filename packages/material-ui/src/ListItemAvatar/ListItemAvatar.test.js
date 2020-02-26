import * as React from 'react';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import ListItemAvatar from './ListItemAvatar';

describe('<ListItemAvatar />', () => {
  let mount;
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(
      <ListItemAvatar>
        <div />
      </ListItemAvatar>,
    );
  });

  after(() => {
    mount.cleanUp();
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
