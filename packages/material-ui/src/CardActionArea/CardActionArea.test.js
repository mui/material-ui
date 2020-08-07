import * as React from 'react';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import ButtonBase from '../ButtonBase';
import CardActionArea from './CardActionArea';

describe('<CardActionArea />', () => {
  const mount = createMount();
  let classes;

  before(() => {
    classes = getClasses(<CardActionArea />);
  });

  describeConformance(<CardActionArea />, () => ({
    classes,
    inheritComponent: ButtonBase,
    mount,
    refInstanceof: window.HTMLButtonElement,
    skip: ['componentProp'],
  }));
});
