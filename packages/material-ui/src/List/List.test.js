import * as React from 'react';
import { expect } from 'chai';
import { getClasses, createMount, describeConformance, createClientRender } from 'test/utils';
import ListSubheader from '../ListSubheader';
import List from './List';
import ListItem from '../ListItem';

describe('<List />', () => {
  const mount = createMount();
  const render = createClientRender();
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
    const { container } = render(<List className="woofList" />);
    const root = container.querySelector('ul');

    expect(root).to.have.class(classes.padding);
  });

  it('can disable the padding', () => {
    const { container } = render(<List disablePadding />);
    const root = container.querySelector('ul');

    expect(root).not.to.have.class(classes.padding);
  });

  describe('prop: subheader', () => {
    it('should render with subheader class', () => {
      const { container } = render(<List subheader={<ListSubheader>Title</ListSubheader>} />);
      const root = container.querySelector('ul');

      expect(root).to.have.class(classes.subheader);
    });

    it('should render ListSubheader', () => {
      const { container } = render(<List subheader={<ListSubheader>Title</ListSubheader>} />);
      const listSubheaderClasses = getClasses(<ListSubheader />);
      const item = container.querySelector('li');

      expect(item).to.have.class(listSubheaderClasses.root);
    });
  });

  describe('prop: dense', () => {
    it('is disabled by default', () => {
      const { container } = render(<List />);
      const root = container.querySelector('ul');

      expect(root).not.to.have.class(classes.dense);
    });

    it('adds a dense class', () => {
      const { container } = render(<List dense />);
      const root = container.querySelector('ul');

      expect(root).to.have.class(classes.dense);
    });

    it('sets dense on deep nested ListItem', () => {
      // mocking a tooltip
      const Tooltip = React.Fragment;

      const { container } = render(
        <List dense>
          <Tooltip>
            <ListItem>Inbox</ListItem>
          </Tooltip>
          <ListItem>Drafts</ListItem>
          <ListItem />
        </List>,
      );

      const listItemClasses = getClasses(<ListItem />);

      const liItems = container.querySelector('ul');
      for (let i = 0; i < liItems.length; i += 1) {
        expect(liItems.item(i)).to.have.class(listItemClasses.dense);
      }
    });
  });
});
