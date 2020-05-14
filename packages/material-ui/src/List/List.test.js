import * as React from 'react';
import { expect } from 'chai';
import { findOutermostIntrinsic, getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import ListSubheader from '../ListSubheader';
import List from './List';
import ListItem from '../ListItem';

describe('<List />', () => {
  const mount = createMount();
  let classes;

  before(() => {
    classes = getClasses(<List />);
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
    expect(root.hasClass(classes.padding)).to.equal(true);
  });

  it('can disable the padding', () => {
    const wrapper = mount(<List disablePadding />);
    expect(wrapper.find('ul').hasClass(classes.padding)).to.equal(false);
  });

  describe('prop: subheader', () => {
    it('should render with subheader class', () => {
      const wrapper = mount(<List subheader={<ListSubheader>Title</ListSubheader>} />);
      expect(wrapper.find('ul').hasClass(classes.subheader)).to.equal(true);
    });

    it('should render ListSubheader', () => {
      const wrapper = mount(<List subheader={<ListSubheader>Title</ListSubheader>} />);
      expect(wrapper.find(ListSubheader).length).to.equal(1);
    });
  });

  describe('prop: dense', () => {
    it('is disabled by default', () => {
      const wrapper = mount(<List />);
      expect(findOutermostIntrinsic(wrapper).hasClass(classes.dense)).to.equal(false);
    });

    it('adds a dense class', () => {
      const wrapper = mount(<List dense />);
      expect(findOutermostIntrinsic(wrapper).hasClass(classes.dense)).to.equal(true);
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
      expect(wrapper.find('li').every(`.${listItemClasses.dense}`)).to.equal(true);
    });
  });
});
