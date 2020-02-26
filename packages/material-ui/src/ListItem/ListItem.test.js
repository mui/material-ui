import * as React from 'react';
import { expect } from 'chai';
import PropTypes from 'prop-types';
import { getClasses, createMount } from '@material-ui/core/test-utils';
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
  let mount;
  const render = createClientRender({ strict: false });
  let classes;

  before(() => {
    classes = getClasses(<ListItem />);
    mount = createMount({ strict: true });
  });

  describeConformance(<ListItem />, () => ({
    classes,
    inheritComponent: 'li',
    mount,
    refInstanceof: window.HTMLLIElement,
    after: () => mount.cleanUp(),
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
            {options => {
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
      expect(listItem.querySelector(`div.${classes.root}`)).to.be.ok;
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
      expect(listItem.querySelector(`span.${classes.root}`)).to.be.ok;
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
      expect(queries.getByRole(listItem, 'button')).to.be.ok;
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
      expect(listItem.querySelector(`div.${classes.root}`)).to.be.ok;
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
      });

      afterEach(() => {
        consoleErrorMock.reset();
        PropTypes.resetWarningCache();
      });

      it('warns if it cant detect the secondary action properly', () => {
        render(
          <ListItem>
            <ListItemSecondaryAction>I should have come last :(</ListItemSecondaryAction>
            <ListItemText>My position doesn not matter.</ListItemText>
          </ListItem>,
        );

        expect(consoleErrorMock.callCount()).to.equal(1);
        expect(consoleErrorMock.args()[0][0]).to.include(
          'Warning: Failed prop type: Material-UI: you used an element',
        );
      });

      it('should warn (but not error) with autoFocus with a function component with no content', () => {
        render(<ListItem component={NoContent} autoFocus />);

        expect(consoleErrorMock.callCount()).to.equal(1);
        expect(consoleErrorMock.args()[0][0]).to.include(
          'Material-UI: unable to set focus to a ListItem whose component has not been rendered.',
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
