import * as React from 'react';
import { expect } from 'chai';
import ThemeProvider from '@mui/private-theming/ThemeProvider';
import { createRenderer } from '@mui/internal-test-utils';
import makeStyles from '../makeStyles';

describe('ThemeProvider', () => {
  const { render } = createRenderer();

  it('does not allow setting mui.nested manually', () => {
    const useStyles = makeStyles({ root: {} }, { name: 'MuiTest' });
    function Component(props) {
      const classes = useStyles();

      return (
        <div {...props} className={classes.root}>
          Component
        </div>
      );
    }

    const { getByTestId } = render(
      <ThemeProvider theme={{ [Symbol.for('mui.nested')]: true }}>
        <Component data-testid="global" />
        <ThemeProvider theme={{}}>
          <Component data-testid="nested" />
        </ThemeProvider>
      </ThemeProvider>,
    );

    expect(getByTestId('global')).to.have.class('MuiTest-root');
    expect(getByTestId('nested')).not.to.have.class('MuiTest-root');
  });
});
