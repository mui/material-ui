import React from 'react';
import { assert } from 'chai';
import {
  createMount,
  describeConformance,
  findOutermostIntrinsic,
  getClasses,
} from '@material-ui/core/test-utils';
import ListSubheader from '../ListSubheader';
import List from './List';
import ListItem from '../ListItem';

describe('<List />', () => {
  let mount;
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(<List />);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<List />, () => ({
    classes,
    inheritComponent: 'ul',
    mount,
    refInstanceof: window.HTMLUListElement,
  }));

  it('should render with padding classes', () => {
    const wrapper = mount(<List className="woofList" />);
    const root = wrapper.find('ul');
    assert.strictEqual(root.hasClass(classes.padding), true);
  });

  it('can disable the padding', () => {
    const wrapper = mount(<List disablePadding />);
    assert.strictEqual(wrapper.find('ul').hasClass(classes.padding), false);
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
