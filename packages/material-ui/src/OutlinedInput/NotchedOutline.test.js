import React from 'react';
import { expect } from 'chai';
import { getClasses } from '@material-ui/core/test-utils';
import { createClientRender } from 'test/utils/createClientRender';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import NotchedOutline from './NotchedOutline';

describe('<NotchedOutline />', () => {
  const render = createClientRender({ strict: true });

  let classes;
  const defaultProps = {
    labelWidth: 36,
    notched: true,
  };

  before(() => {
    classes = getClasses(<NotchedOutline {...defaultProps} />);
  });

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
    expect(container.querySelector('legend')).to.have.class(classes.legend);
  });

  it('should set alignment rtl', () => {
    const { container: container1 } = render(
      <MuiThemeProvider
        theme={createMuiTheme({
          direction: 'ltr',
        })}
      >
        <NotchedOutline {...defaultProps} />
      </MuiThemeProvider>,
    );
    expect(container1.querySelector('fieldset').style.paddingLeft).to.equal('8px');
    expect(container1.querySelector('legend').style.width).to.equal('35px');

    const { container: container2 } = render(
      <MuiThemeProvider
        theme={createMuiTheme({
          direction: 'rtl',
        })}
      >
        <NotchedOutline {...defaultProps} />
      </MuiThemeProvider>,
    );
    expect(container2.querySelector('fieldset').style.paddingRight).to.equal('8px');
    expect(container2.querySelector('legend').style.width).to.equal('35px');
  });
});
