import React from 'react';
import { assert } from 'chai';
import {
  createMount,
  findOutermostIntrinsic,
  getClasses,
  testRef,
} from '@material-ui/core/test-utils';
import ListSubheader from '../ListSubheader';
import List from './List';
import ListItem from '../ListItem';

describe('<List />', () => {
  let mount;
  let classes;

  before(() => {
    mount = createMount();
    classes = getClasses(<List />);
  });

  after(() => {
    mount.cleanUp();
  });

  it('renders a ul by default', () => {
    const wrapper = mount(<List />);
    assert.strictEqual(findOutermostIntrinsic(wrapper).type(), 'ul');
  });

  it('can render a div', () => {
    const wrapper = mount(<List component="div" />);
    assert.strictEqual(findOutermostIntrinsic(wrapper).type(), 'div');
  });

  it('should render with the user, root and padding classes', () => {
    const wrapper = mount(<List className="woofList" />);
    const root = wrapper.find('ul');
    assert.strictEqual(root.hasClass('woofList'), true);
    assert.strictEqual(root.hasClass(classes.root), true);
    assert.strictEqual(root.hasClass(classes.padding), true);
  });

  it('can disable the padding', () => {
    const wrapper = mount(<List disablePadding />);
    assert.strictEqual(wrapper.find('ul').hasClass(classes.padding), false);
  });

  it('does forward refs', () => {
    testRef(<List />, mount);
  });

  describe('prop: subheader', () => {
    it('should render with subheader class', () => {
      const wrapper = mount(<List subheader={<ListSubheader>Title</ListSubheader>} />);
      assert.strictEqual(wrapper.find('ul').hasClass(classes.subheader), true);
    });

    it('should render ListSubheader', () => {
      const wrapper = mount(<List subheader={<ListSubheader>Title</ListSubheader>} />);
      assert.strictEqual(wrapper.find(ListSubheader).length, 1);
    });
  });

  describe('prop: dense', () => {
    it('is disabled by default', () => {
      const wrapper = mount(<List />);
      assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.dense), false);
    });

    it('adds a dense class', () => {
      const wrapper = mount(<List dense />);
      assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.dense), true);
    });

    it('sets dense on deep nested ListItem', () => {
      // mocking a tooltip
      const Tooltip = React.Fragment;

      const wrapper = mount(
        <List dense>
          <Tooltip>
            <ListItem>Inbox</ListItem>
          </Tooltip>
          <ListItem>Drafts</ListItem>
          <ListItem />
        </List>,
      );

      const listItemClasses = getClasses(<ListItem />);
      assert.strictEqual(wrapper.find('li').every(`.${listItemClasses.dense}`), true);
    });
  });
});
