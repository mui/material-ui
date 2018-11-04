import React from 'react';
import { assert } from 'chai';
import { getClasses, createMount } from '../test-utils';
import ListItemText from '../ListItemText';
import ListItemSecondaryAction from '../ListItemSecondaryAction';
import ListItem from './ListItem';
import ListItemAvatar from '../ListItemAvatar';
import Avatar from '../Avatar';
import ButtonBase from '../ButtonBase';
import ListContext from '../List/ListContext';
import MergeListContext from './MergeListContext';

describe('<ListItem />', () => {
  let mount;
  let classes;

  before(() => {
    classes = getClasses(<ListItem />);
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render a div', () => {
    const wrapper = mount(<ListItem component="div" />);
    const listItem = wrapper.find(MergeListContext).childAt(0);
    assert.strictEqual(listItem.name(), 'div');
  });

  it('should render a li', () => {
    const wrapper = mount(<ListItem />);
    const listItem = wrapper.find(MergeListContext).childAt(0);
    assert.strictEqual(listItem.name(), 'li');
  });

  it('should render with the user, root and gutters classes', () => {
    const wrapper = mount(<ListItem className="woofListItem" />);
    const listItem = wrapper.find(MergeListContext).childAt(0);
    assert.strictEqual(listItem.hasClass('woofListItem'), true);
    assert.strictEqual(listItem.hasClass(classes.root), true);
    assert.strictEqual(listItem.hasClass(classes.gutters), true);
  });

  it('should render with the selected class', () => {
    const wrapper = mount(<ListItem selected />);
    const listItem = wrapper.find(MergeListContext).childAt(0);
    assert.strictEqual(listItem.hasClass(classes.selected), true);
  });

  it('should disable the gutters', () => {
    const wrapper = mount(<ListItem disableGutters />);
    const listItem = wrapper.find(MergeListContext).childAt(0);
    assert.strictEqual(listItem.hasClass(classes.root), true);
    assert.strictEqual(listItem.hasClass(classes.gutters), false);
  });

  it('should use dense class when ListItemAvatar is present', () => {
    const wrapper = mount(
      <ListContext.Provider value={{ dense: false }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
        </ListItem>
      </ListContext.Provider>,
    );
    const listItem = wrapper.find(MergeListContext).childAt(0);
    assert.strictEqual(listItem.hasClass(classes.dense), true);
  });

  describe('prop: button', () => {
    it('should render a div', () => {
      const wrapper = mount(<ListItem button />);
      const listItem = wrapper.find(MergeListContext).childAt(0);
      assert.strictEqual(listItem.props().component, 'div');
    });
  });

  describe('prop: component', () => {
    it('should change the component', () => {
      const wrapper = mount(<ListItem button component="a" />);
      const listItem = wrapper.find(MergeListContext).childAt(0);
      assert.strictEqual(listItem.props().component, 'a');
    });

    it('should change the component', () => {
      const wrapper = mount(<ListItem button component="li" />);
      const listItem = wrapper.find(MergeListContext).childAt(0);
      assert.strictEqual(listItem.props().component, 'li');
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
      const listItem = wrapper.find(MergeListContext).childAt(0);
      assert.strictEqual(listItem.hasClass(classes.container), true);
      assert.strictEqual(listItem.type(), 'li');
      assert.strictEqual(listItem.childAt(0).type(), 'div');
    });

    it('should accept a component property', () => {
      const wrapper = mount(
        <ListItem component="span">
          <ListItemText primary="primary" />
          <ListItemSecondaryAction />
        </ListItem>,
      );
      const listItem = wrapper.find(MergeListContext).childAt(0);
      assert.strictEqual(listItem.hasClass(classes.container), true);
      assert.strictEqual(listItem.type(), 'li');
      assert.strictEqual(listItem.childAt(0).type(), 'span');
    });

    it('should accet a button property', () => {
      const wrapper = mount(
        <ListItem button>
          <ListItemText primary="primary" />
          <ListItemSecondaryAction />
        </ListItem>,
      );
      const listItem = wrapper.find(MergeListContext).childAt(0);
      assert.strictEqual(listItem.hasClass(classes.container), true);
      assert.strictEqual(listItem.type(), 'li');
      assert.strictEqual(listItem.childAt(0).type(), ButtonBase);
    });

    it('should accept a ContainerComponent property', () => {
      const wrapper = mount(
        <ListItem ContainerComponent="div">
          <ListItemText primary="primary" />
          <ListItemSecondaryAction />
        </ListItem>,
      );
      const listItem = wrapper.find(MergeListContext).childAt(0);
      assert.strictEqual(listItem.hasClass(classes.container), true);
      assert.strictEqual(listItem.type(), 'div');
      assert.strictEqual(listItem.childAt(0).type(), 'div');
    });

    it('should allow customization of the wrapper', () => {
      const wrapper = mount(
        <ListItem ContainerProps={{ className: 'bubu' }}>
          <ListItemText primary="primary" />
          <ListItemSecondaryAction />
        </ListItem>,
      );
      const listItem = wrapper.find(MergeListContext).childAt(0);
      assert.strictEqual(listItem.hasClass(classes.container), true);
      assert.strictEqual(listItem.hasClass('bubu'), true);
    });
  });

  describe('prop: focusVisibleClassName', () => {
    it('should merge the class names', () => {
      const wrapper = mount(<ListItem button focusVisibleClassName="focusVisibleClassName" />);
      const listItem = wrapper.find(MergeListContext).childAt(0);
      assert.strictEqual(listItem.props().component, 'div');
      assert.strictEqual(
        listItem.props().focusVisibleClassName,
        `${classes.focusVisible} focusVisibleClassName`,
      );
    });
  });
});
