import React from 'react';
import { expect } from 'chai';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '../test-utils/describeConformance';
import { cleanup, createClientRender } from 'test/utils/createClientRender';
import OutlinedInput from './OutlinedInput';
import InputBase from '../InputBase';
import { createMuiTheme, MuiThemeProvider } from '../styles';

describe('<OutlinedInput />', () => {
  let classes;
  let mount;
  const render = createClientRender({ strict: true });

  before(() => {
    classes = getClasses(<OutlinedInput />);
    mount = createMount({ strict: true });
  });

  afterEach(() => {
    cleanup();
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<OutlinedInput labelWidth={0} />, () => ({
    classes,
    inheritComponent: InputBase,
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));

  it('should render a NotchedOutline', () => {
    const { container } = render(
      <OutlinedInput classes={{ notchedOutline: 'notched-outlined' }} labelWidth={0} />,
    );

    expect(container.querySelector('.notched-outlined')).to.be.ok;
  });

  it('can use dense margin', () => {
    const { container } = render(<OutlinedInput margin="dense" />);

    expect(container.firstChild).to.have.class(classes.marginDense);
  });

  it('uses dense margin in a dense theme', () => {
    const { container } = render(
      <MuiThemeProvider theme={createMuiTheme({ dense: true })}>
        <OutlinedInput />
      </MuiThemeProvider>,
    );

    expect(container.firstChild).to.have.class(classes.marginDense);
  });

  it('can render undense in a dense theme', () => {
    const { container } = render(
      <MuiThemeProvider theme={createMuiTheme({ dense: true })}>
        <OutlinedInput margin="none" />
      </MuiThemeProvider>,
    );

    expect(container.firstChild).not.to.have.class(classes.marginDense);
  });
});
