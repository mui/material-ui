import React from 'react';
import { assert } from 'chai';
import PropTypes from 'prop-types';
import {
  getClasses,
  createMount,
  describeConformance,
  findOutermostIntrinsic,
} from '@material-ui/core/test-utils';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import ListItemText from '../ListItemText';
import ListItemSecondaryAction from '../ListItemSecondaryAction';
import ListItem from './ListItem';
import ButtonBase from '../ButtonBase';
import ListContext from '../List/ListContext';

const NoContent = React.forwardRef(() => {
  return null;
});

describe('<ListItem />', () => {
  let mount;
  let classes;

  before(() => {
    classes = getClasses(<ListItem />);
    // StrictModeViolation: uses ButtonBase
    mount = createMount({ strict: false });
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<ListItem />, () => ({
    classes,
    inheritComponent: 'li',
    mount,
    refInstanceof: window.HTMLLIElement,
  }));

  it('should render with gutters classes', () => {
    const wrapper = mount(<ListItem className="woofListItem" />);
    const listItem = wrapper.find('li');
    assert.strictEqual(listItem.hasClass(classes.gutters), true);
  });

  it('should render with the selected class', () => {
    const wrapper = mount(<ListItem selected />);
    const listItem = wrapper.find('li');
    assert.strictEqual(listItem.hasClass(classes.selected), true);
  });

  it('should disable the gutters', () => {
    const wrapper = mount(<ListItem disableGutters />);
    const listItem = wrapper.find('li');
    assert.strictEqual(listItem.hasClass(classes.gutters), false);
  });

  describe('prop: button', () => {
    it('renders a div', () => {
      const wrapper = mount(<ListItem button />);
      assert.strictEqual(findOutermostIntrinsic(wrapper).type(), 'div');
    });
  });

  describe('context: dense', () => {
    it('should forward the context', () => {
      let context = null;
      const wrapper = mount(
        <ListItem>
          <ListContext.Consumer>
            {options => {
              context = options;
            }}
          </ListContext.Consumer>
        </ListItem>,
      );
      assert.strictEqual(context.dense, false);
      wrapper.setProps({ dense: true });
      assert.strictEqual(context.dense, true);
    });
  });

  describe('secondary action', () => {
    it('should wrap with a container', () => {
      const wrapper = mount(
        <ListItem>
          <ListItemText primary="primary" />
          <ListItemSecondaryAction />
        </ListItem>,
      );
      const listItem = findOutermostIntrinsic(wrapper);
      assert.strictEqual(listItem.hasClass(classes.container), true);
      assert.strictEqual(wrapper.find('li > div').exists(), true);
    });

    it('should accept a component property', () => {
      const wrapper = mount(
        <ListItem component="span">
          <ListItemText primary="primary" />
          <ListItemSecondaryAction />
        </ListItem>,
      );
      const listItem = findOutermostIntrinsic(wrapper);
      assert.strictEqual(listItem.hasClass(classes.container), true);
      assert.strictEqual(wrapper.find('li > span').exists(), true);
    });

    it('should accept a button property', () => {
      const wrapper = mount(
        <ListItem button>
          <ListItemText primary="primary" />
          <ListItemSecondaryAction />
        </ListItem>,
      );
      const listItem = findOutermostIntrinsic(wrapper);
      assert.strictEqual(listItem.hasClass(classes.container), true);
      assert.strictEqual(listItem.childAt(0).type(), ButtonBase);
    });

    it('should accept a ContainerComponent property', () => {
      const wrapper = mount(
        <ListItem ContainerComponent="div">
          <ListItemText primary="primary" />
          <ListItemSecondaryAction />
        </ListItem>,
      );
      const listItem = wrapper.find('div').first();
      assert.strictEqual(listItem.hasClass(classes.container), true);
      assert.strictEqual(wrapper.find('div > div').exists(), true);
    });

    it('should allow customization of the wrapper', () => {
      const wrapper = mount(
        <ListItem ContainerProps={{ className: 'bubu' }}>
          <ListItemText primary="primary" />
          <ListItemSecondaryAction />
        </ListItem>,
      );
      const listItem = findOutermostIntrinsic(wrapper);
      assert.strictEqual(listItem.hasClass(classes.container), true);
      assert.strictEqual(listItem.hasClass('bubu'), true);
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
        mount(
          <ListItem>
            <ListItemSecondaryAction>I should have come last :(</ListItemSecondaryAction>
            <ListItemText>My position doesn not matter.</ListItemText>
          </ListItem>,
        );

        assert.strictEqual(consoleErrorMock.callCount(), 1);
        assert.include(
          consoleErrorMock.args()[0][0],
          'Warning: Failed prop type: Material-UI: you used an element',
        );
      });

      it('should warn (but not error) with autoFocus with a function component with no content', () => {
        mount(<ListItem component={NoContent} autoFocus />);
        assert.strictEqual(consoleErrorMock.callCount(), 1);
        assert.include(
          consoleErrorMock.args()[0][0],
          'Warning: Material-UI: unable to set focus to a ListItem whose component has not been rendered.',
        );
      });
    });
  });

  describe('prop: focusVisibleClassName', () => {
    it('should merge the class names', () => {
      const wrapper = mount(<ListItem button focusVisibleClassName="focusVisibleClassName" />);
      const listItem = wrapper.find(ButtonBase);
      assert.strictEqual(listItem.props().component, 'div');
      assert.strictEqual(
        listItem.props().focusVisibleClassName,
        `${classes.focusVisible} focusVisibleClassName`,
      );
    });
  });
});
