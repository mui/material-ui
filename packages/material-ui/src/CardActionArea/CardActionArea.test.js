import React from 'react';
import { createMount, describeConformance, getClasses } from '@material-ui/core/test-utils';
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
