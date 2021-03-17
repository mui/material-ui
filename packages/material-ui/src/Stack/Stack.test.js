import * as React from 'react';
import { expect } from 'chai';
import { createMount, createClientRender, describeConformanceV5 } from 'test/utils';
import Stack from '@material-ui/core/Stack';
import { createMuiTheme } from '@material-ui/core/styles';
import { style } from './Stack';

describe('<Stack />', () => {
  const render = createClientRender();
  const mount = createMount();

  describeConformanceV5(<Stack />, () => ({
    render,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiStack',
    skip: ['componentProp', 'componentsProp', 'rootClass', 'themeVariants', 'themeStyleOverrides'],
  }));

  it('should handle breakpoints correctly', () => {
    const theme = createMuiTheme();

    expect(
      style({
        styleProps: {
          direction: { xs: 'column', sm: 'row', md: 'row' },
          spacing: { xs: 1, sm: 2, md: 4 },
        },
        theme,
      }),
    ).to.deep.equal({
      '@media (min-width:0px)': {
        '& > :not(styles) + :not(styles)': {
          margin: 0,
          marginTop: '8px',
        },
        flexDirection: 'column',
      },
      '@media (min-width:600px)': {
        '& > :not(styles) + :not(styles)': {
          margin: 0,
          marginLeft: '16px',
        },
        flexDirection: 'row',
      },
      '@media (min-width:960px)': {
        '& > :not(styles) + :not(styles)': {
          margin: 0,
          marginLeft: '32px',
        },
        flexDirection: 'row',
      },
      display: 'flex',
    });
  });
});
