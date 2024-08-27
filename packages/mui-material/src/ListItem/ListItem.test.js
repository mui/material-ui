import * as React from 'react';
import { expect } from 'chai';
import PropTypes from 'prop-types';
import { createRenderer, reactMajor } from '@mui/internal-test-utils';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItem, { listItemClasses as classes } from '@mui/material/ListItem';
import ListContext from '../List/ListContext';
import describeConformance from '../../test/describeConformance';

describe('<ListItem />', () => {
  const { render } = createRenderer();

  describeConformance(<ListItem />, () => ({
    classes,
    inheritComponent: 'li',
    render,
    refInstanceof: window.HTMLLIElement,
    muiName: 'MuiListItem',
    testVariantProps: { dense: true },
    testLegacyComponentsProp: true,
    slots: {
      root: {},
    },
    skip: [
      'componentsProp',
      'slotPropsCallback', // not supported yet
    ],
  }));

  it('should render with gutters classes', () => {
    const { getByRole } = render(<ListItem />);
    expect(getByRole('listitem')).to.have.class(classes.gutters);
  });

  it('should disable the gutters', () => {
    const { getByRole } = render(<ListItem disableGutters />);
    expect(getByRole('listitem')).not.to.have.class(classes.gutters);
  });

  describe('context: dense', () => {
    it('should forward the context', () => {
      let context = null;
      const { setProps } = render(
        <ListItem>
          <ListContext.Consumer>
            {(options) => {
              context = options;
            }}
          </ListContext.Consumer>
        </ListItem>,
      );
      expect(context).to.have.property('dense', false);
      setProps({ dense: true });
      expect(context).to.have.property('dense', true);
    });
  });

  describe('action', () => {
    it('should show action if provided', () => {
      const { getByText } = render(<ListItem secondaryAction="foo" />);
      expect(getByText('foo')).toBeVisible();
    });
  });

  // TODO remove in v6 in favor of ListItemButton
  describe('secondary action', () => {
    it('should wrap with a container', () => {
      const { getByRole } = render(
        <ListItem>
          <ListItemText primary="primary" />
          <ListItemSecondaryAction />
        </ListItem>,
      );
      const listItem = getByRole('listitem');

      expect(listItem).to.have.class(classes.container);
      expect(listItem.querySelector(`div.${classes.root}`)).not.to.equal(null);
    });

    it('should accept a component property', () => {
      const { getByRole } = render(
        <ListItem component="span">
          <ListItemText primary="primary" />
          <ListItemSecondaryAction />
        </ListItem>,
      );
      const listItem = getByRole('listitem');

      expect(listItem).to.have.class(classes.container);
      expect(listItem.querySelector(`span.${classes.root}`)).not.to.equal(null);
    });

    it('should accept a ContainerComponent property', () => {
      const { getByRole } = render(
        <ListItem ContainerComponent="div" ContainerProps={{ role: 'listitem' }}>
          <ListItemText primary="primary" />
          <ListItemSecondaryAction />
        </ListItem>,
      );
      const listItem = getByRole('listitem');

      expect(listItem).to.have.property('nodeName', 'DIV');
      expect(listItem).to.have.class(classes.container);
      expect(listItem.querySelector(`div.${classes.root}`)).not.to.equal(null);
    });

    it('should allow customization of the wrapper', () => {
      const { getByRole } = render(
        <ListItem ContainerProps={{ className: 'bubu', role: 'listitem' }}>
          <ListItemText primary="primary" />
          <ListItemSecondaryAction />
        </ListItem>,
      );
      const listItem = getByRole('listitem');

      expect(listItem).to.have.class(classes.container);
      expect(listItem).to.have.class('bubu');
    });

    describe('warnings', () => {
      beforeEach(() => {
        PropTypes.resetWarningCache();
      });

      it('warns if it cant detect the secondary action properly', function test() {
        if (reactMajor >= 19) {
          // React 19 removed prop types support
          this.skip();
        }

        expect(() => {
          PropTypes.checkPropTypes(
            ListItem.propTypes,
            {
              classes: {},
              children: [
                <ListItemSecondaryAction>I should have come last :(</ListItemSecondaryAction>,
                <ListItemText>My position does not matter.</ListItemText>,
              ],
            },
            'prop',
            'MockedName',
          );
        }).toErrorDev('Warning: Failed prop type: MUI: You used an element');
      });
    });
  });

  it('container overrides should work', function test() {
    if (/jsdom/.test(window.navigator.userAgent)) {
      this.skip();
    }

    const testStyle = {
      marginTop: '13px',
    };

    const theme = createTheme({
      components: {
        MuiListItem: {
          styleOverrides: {
            container: testStyle,
          },
        },
      },
    });

    const { container } = render(
      <ThemeProvider theme={theme}>
        <ListItem>
          Test<ListItemSecondaryAction>SecondaryAction</ListItemSecondaryAction>
        </ListItem>
      </ThemeProvider>,
    );

    const listItemContainer = container.getElementsByClassName(classes.container)[0];
    expect(listItemContainer).to.toHaveComputedStyle(testStyle);
  });
});
