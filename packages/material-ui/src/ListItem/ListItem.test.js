import * as React from 'react';
import { expect } from 'chai';
import PropTypes from 'prop-types';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import { act, createClientRender, fireEvent, queries } from 'test/utils/createClientRender';
import ListItemText from '../ListItemText';
import ListItemSecondaryAction from '../ListItemSecondaryAction';
import ListItem from './ListItem';
import ListContext from '../List/ListContext';

const NoContent = React.forwardRef(() => {
  return null;
});

describe('<ListItem />', () => {
  const mount = createMount();
  const render = createClientRender();
  let classes;

  before(() => {
    classes = getClasses(<ListItem />);
  });

  describeConformance(<ListItem />, () => ({
    classes,
    inheritComponent: 'li',
    mount,
    refInstanceof: window.HTMLLIElement,
  }));

  it('should render with gutters classes', () => {
    const { getByRole } = render(<ListItem />);
    expect(getByRole('listitem')).to.have.class(classes.gutters);
  });

  it('should render with the selected class', () => {
    const { getByRole } = render(<ListItem selected />);
    expect(getByRole('listitem')).to.have.class(classes.selected);
  });

  it('should disable the gutters', () => {
    const { getByRole } = render(<ListItem disableGutters />);
    expect(getByRole('listitem')).not.to.have.class(classes.gutters);
  });

  describe('prop: button', () => {
    it('renders a div', () => {
      const { container } = render(<ListItem button />);
      expect(container.firstChild).to.have.property('nodeName', 'DIV');
    });
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

    it('should accept a button property', () => {
      const { getByRole } = render(
        <ListItem button>
          <ListItemText primary="primary" />
          <ListItemSecondaryAction />
        </ListItem>,
      );
      const listItem = getByRole('listitem');

      expect(listItem).to.have.class(classes.container);
      expect(queries.getByRole(listItem, 'button')).not.to.equal(null);
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

    it('can autofocus a custom ContainerComponent', () => {
      const { getByRole } = render(
        <ListItem
          autoFocus
          ContainerComponent="div"
          ContainerProps={{ role: 'listitem', tabIndex: -1 }}
        >
          <ListItemText primary="primary" />
          <ListItemSecondaryAction />
        </ListItem>,
      );

      expect(getByRole('listitem')).toHaveFocus();
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
        consoleErrorMock.spy();
        PropTypes.resetWarningCache();
      });

      afterEach(() => {
        consoleErrorMock.reset();
      });

      it('warns if it cant detect the secondary action properly', () => {
        PropTypes.checkPropTypes(
          ListItem.Naked.propTypes,
          {
            classes: {},
            children: [
              <ListItemSecondaryAction>I should have come last :(</ListItemSecondaryAction>,
              <ListItemText>My position doesn not matter.</ListItemText>,
            ],
          },
          'prop',
          'MockedName',
        );

        expect(consoleErrorMock.callCount()).to.equal(1);
        expect(consoleErrorMock.messages()[0]).to.include(
          'Warning: Failed prop type: Material-UI: You used an element',
        );
      });

      it('should warn (but not error) with autoFocus with a function component with no content', () => {
        render(<ListItem component={NoContent} autoFocus />);

        expect(consoleErrorMock.callCount()).to.equal(1);
        expect(consoleErrorMock.messages()[0]).to.include(
          'Material-UI: Unable to set focus to a ListItem whose component has not been rendered.',
        );
      });

      // StrictMode compatible usage is illustrated in "can autofocus a custom ContainerComponent"
      it('warns in StrictMode if the custom ContainerComponent is a class component', () => {
        // eslint-disable-next-line react/prefer-stateless-function
        class CustomListItemContainer extends React.Component {
          // React dedupes the findDOMNode deprecation warning by displayName
          // since we can't reset modules in watchmode we implement cache busting
          // by creating a random display name
          static displayName = `CustomListItemContainer-#${Math.random()}`;

          render() {
            return <div role="listitem" tabIndex={-1} {...this.props} />;
          }
        }
        const { getByRole } = render(
          <ListItem autoFocus ContainerComponent={CustomListItemContainer}>
            <ListItemText primary="primary" />
            <ListItemSecondaryAction />
          </ListItem>,
        );

        expect(getByRole('listitem')).toHaveFocus();
        expect(consoleErrorMock.callCount()).to.equal(1);
        expect(consoleErrorMock.messages()[0]).to.include(
          'findDOMNode is deprecated in StrictMode',
        );
      });
    });
  });

  describe('prop: focusVisibleClassName', () => {
    it('should merge the class names', () => {
      const { getByRole } = render(
        <ListItem button focusVisibleClassName="focusVisibleClassName" />,
      );
      const button = getByRole('button');

      act(() => {
        fireEvent.keyDown(document.activeElement || document.body, { key: 'Tab' });
        button.focus();
      });

      expect(button).to.have.class('focusVisibleClassName');
      expect(button).to.have.class(classes.focusVisible);
    });
  });
});
