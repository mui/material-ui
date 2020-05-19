import * as React from 'react';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
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
