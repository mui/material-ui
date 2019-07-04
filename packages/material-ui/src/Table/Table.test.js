import React from 'react';
import { expect } from 'chai';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '../test-utils/describeConformance';
import { cleanup, createClientRender } from 'test/utils/createClientRender';
import Table from './Table';
import TableBody from '../TableBody';
import TableRow from '../TableRow';
import TableCell from '../TableCell';
import TableContext from './TableContext';
import { createMuiTheme, MuiThemeProvider } from '../styles';

describe('<Table />', () => {
  let mount;
  const render = createClientRender({ strict: true });
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(<Table>foo</Table>);
  });

  afterEach(() => {
    cleanup();
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(
    <Table>
      <tbody />
    </Table>,
    () => ({
      classes,
      inheritComponent: 'table',
      mount,
      refInstanceof: window.HTMLTableElement,
      // can't test another component with tbody as a child
      testComponentPropWith: 'table',
    }),
  );

  describe('prop: component', () => {
    it('can render a different component', () => {
      const { container } = render(<Table component="div">foo</Table>);
      expect(container.firstChild).to.have.property('nodeName', 'DIV');
    });
  });

  it('should render children', () => {
    const { getByTestId } = render(
      <Table>
        <tbody data-testid="children" />
      </Table>,
    );

    expect(getByTestId('children')).to.be.ok;
  });

  it('should define table in the child context', () => {
    let context;

    // TODO test integration with TableCell
    render(
      <Table>
        <TableContext.Consumer>
          {value => {
            context = value;
            return <tbody />;
          }}
        </TableContext.Consumer>
      </Table>,
    );

    expect(context).to.deep.equal({
      size: 'medium',
      padding: 'default',
    });
  });

  it('applies small size table cells in a dense theme', () => {
    const { getByRole } = render(
      <MuiThemeProvider theme={createMuiTheme({ dense: true })}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell classes={{ sizeSmall: 'small' }}>cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </MuiThemeProvider>,
    );

    expect(getByRole('cell')).to.have.class('small');
  });

  it('prefers size props over theme density', () => {
    const { getByRole } = render(
      <MuiThemeProvider theme={createMuiTheme({ dense: true })}>
        <Table size="medium">
          <TableBody>
            <TableRow>
              <TableCell classes={{ sizeSmall: 'small' }}>cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </MuiThemeProvider>,
    );

    expect(getByRole('cell')).not.to.have.class('small');
  });
});
