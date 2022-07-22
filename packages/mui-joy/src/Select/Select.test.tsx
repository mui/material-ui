import * as React from 'react';
import { expect } from 'chai';
import { spy, stub } from 'sinon';
import {
  describeConformance,
  ErrorBoundary,
  act,
  createRenderer,
  fireEvent,
  screen,
} from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import Select, { selectClasses as classes } from '@mui/joy/Select';

describe('Joy <Select />', () => {
  const { clock, render } = createRenderer({ clock: 'fake' });

  describeConformance(<Select value="" />, () => ({
    render,
    classes,
    ThemeProvider,
    refInstanceof: window.HTMLDivElement,
    muiName: 'JoySelect',
    skip: ['classesRoot', 'propsSpread', 'componentProp', 'componentsProp'],
  }));
});
