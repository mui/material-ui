import * as React from 'react';
import { expect } from 'chai';
import { createClientRender } from 'test/utils';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import NotchedOutline from './NotchedOutline';

describe('<NotchedOutline />', () => {
  const render = createClientRender();

  const defaultProps = {
    notched: true,
    label: 'My label',
  };

  it('should pass props', () => {
    const { container } = render(
      <NotchedOutline
        {...defaultProps}
        className="notched-outline"
        style={{
          width: 17,
        }}
      />,
    );

    expect(container.querySelector('fieldset')).to.have.class('notched-outline');
    expect(container.querySelector('fieldset').style.width).to.equal('17px');
  });

  it('should set alignment rtl', () => {
    const { container: container1 } = render(
      <ThemeProvider
        theme={createTheme({
          direction: 'ltr',
        })}
      >
        <NotchedOutline {...defaultProps} />
      </ThemeProvider>,
    );
    expect(container1.querySelector('fieldset')).toHaveComputedStyle({
      paddingLeft: '8px',
    });

    const { container: container2 } = render(
      <ThemeProvider
        theme={createTheme({
          direction: 'rtl',
        })}
      >
        <NotchedOutline {...defaultProps} />
      </ThemeProvider>,
    );
    expect(container2.querySelector('fieldset')).toHaveComputedStyle({
      paddingRight: '8px',
    });
  });
});
