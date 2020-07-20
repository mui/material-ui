import * as React from 'react';
import { getClasses, createMount, describeConformance } from 'test/utils';
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
