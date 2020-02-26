import * as React from 'react';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '../test-utils/describeConformance';
import ButtonBase from '../ButtonBase';
import CardActionArea from './CardActionArea';

describe('<CardActionArea />', () => {
  let mount;
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(<CardActionArea />);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<CardActionArea />, () => ({
    classes,
    inheritComponent: ButtonBase,
    mount,
    refInstanceof: window.HTMLButtonElement,
    skip: ['componentProp'],
  }));
});
