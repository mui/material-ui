import React from 'react';
import { assert } from 'chai';
import { getClasses, createMount } from '../test-utils';
import Typography from '../Typography';
import ListItemText from './ListItemText';

describe('<ListItemText />', () => {
  let mount;
  let classes;

  before(() => {
    mount = createMount();
    classes = getClasses(<ListItemText />);
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render a div', () => {
    const wrapper = mount(<ListItemText />);
    const listItemText = wrapper.childAt(0).childAt(0);
    assert.strictEqual(listItemText.name(), 'div');
    assert.strictEqual(listItemText.hasClass(classes.root), true);
  });

  it('should render with the user and root classes', () => {
    const wrapper = mount(<ListItemText className="woofListItemText" />);
    const listItemText = wrapper.childAt(0).childAt(0);
    assert.strictEqual(listItemText.hasClass('woofListItemText'), true);
    assert.strictEqual(listItemText.hasClass(classes.root), true);
  });

  it('should render with inset class', () => {
    const wrapper = mount(<ListItemText inset />);
    const listItemText = wrapper.childAt(0).childAt(0);
    assert.strictEqual(listItemText.hasClass(classes.inset), true);
    assert.strictEqual(listItemText.hasClass(classes.root), true);
  });

  it('should render with no children', () => {
    const wrapper = mount(<ListItemText />);
    const listItemText = wrapper.childAt(0).childAt(0);
    assert.strictEqual(listItemText.children().length, 0);
  });

  describe('prop: primary', () => {
    it('should render primary text', () => {
      const wrapper = mount(<ListItemText primary="This is the primary text" />);
      const listItemText = wrapper.childAt(0).childAt(0);
      assert.strictEqual(listItemText.children().length, 1);
      assert.strictEqual(listItemText.childAt(0).type(), Typography);
      assert.strictEqual(listItemText.childAt(0).props().variant, 'subheading');
      assert.strictEqual(
        wrapper
          .childAt(0)
          .children()
          .text(),
        'This is the primary text',
      );
    });

    it('should use the primary node', () => {
      const primary = <span />;
      const wrapper = mount(<ListItemText primary={primary} />);
      assert.strictEqual(wrapper.contains(primary), true);
    });

    it('should use the children prop as primary node', () => {
      const primary = <span />;
      const wrapper = mount(<ListItemText>{primary}</ListItemText>);
      assert.strictEqual(wrapper.contains(primary), true);
    });

    it('should read 0 as primary', () => {
      const wrapper = mount(<ListItemText primary={0} />);
      const listItemText = wrapper.childAt(0).childAt(0);
      assert.strictEqual(listItemText.childAt(0).type(), Typography);
    });
  });

  describe('prop: secondary', () => {
    it('should render secondary text', () => {
      const wrapper = mount(<ListItemText secondary="This is the secondary text" />);
      const listItemText = wrapper.childAt(0).childAt(0);
      assert.strictEqual(listItemText.children().length, 1, 'should have 1 child');
      assert.strictEqual(listItemText.childAt(0).type(), Typography);
      assert.strictEqual(listItemText.childAt(0).props().color, 'textSecondary');
      assert.strictEqual(
        listItemText
          .childAt(0)
          .children()
          .text(),
        'This is the secondary text',
      );
    });

    it('should use the secondary node', () => {
      const secondary = <span />;
      const wrapper = mount(<ListItemText secondary={secondary} />);
      assert.strictEqual(wrapper.contains(secondary), true);
    });

    it('should read 0 as secondary', () => {
      const wrapper = mount(<ListItemText secondary={0} />);
      const listItemText = wrapper.childAt(0).childAt(0);
      assert.strictEqual(listItemText.childAt(0).type(), Typography);
    });
  });

  describe('prop: disableTypography', () => {
    it('should wrap children in `<Typography/>` by default', () => {
      const wrapper = mount(
        <ListItemText primary="This is the primary text" secondary="This is the secondary text" />,
      );
      const listItemText = wrapper.childAt(0).childAt(0);
      assert.strictEqual(listItemText.children().length, 2);
      assert.strictEqual(listItemText.childAt(0).type(), Typography);
      assert.strictEqual(listItemText.childAt(0).props().variant, 'subheading');
      assert.strictEqual(
        listItemText
          .childAt(0)
          .children()
          .text(),
        'This is the primary text',
      );

      assert.strictEqual(listItemText.childAt(1).type(), Typography);
      assert.strictEqual(listItemText.childAt(1).props().color, 'textSecondary');
      assert.strictEqual(
        listItemText
          .childAt(1)
          .children()
          .text(),
        'This is the secondary text',
      );
    });

    it('should render JSX children', () => {
      const primaryChild = <p className="test">This is the primary text</p>;
      const secondaryChild = <p className="test">This is the secondary text</p>;
      const wrapper = mount(
        <ListItemText primary={primaryChild} secondary={secondaryChild} disableTypography />,
      );
      const listItemText = wrapper.childAt(0).childAt(0);
      assert.strictEqual(listItemText.childAt(0).equals(primaryChild), true);
      assert.strictEqual(listItemText.childAt(1).equals(secondaryChild), true);
    });
  });

  it('should render primary and secondary text', () => {
    const wrapper = mount(
      <ListItemText primary="This is the primary text" secondary="This is the secondary text" />,
    );
    const listItemText = wrapper.childAt(0).childAt(0);
    assert.strictEqual(listItemText.children().length, 2);
    assert.strictEqual(listItemText.childAt(0).type(), Typography);
    assert.strictEqual(listItemText.childAt(0).props().variant, 'subheading');
    assert.strictEqual(
      listItemText
        .childAt(0)
        .children()
        .text(),
      'This is the primary text',
    );

    assert.strictEqual(listItemText.childAt(1).type(), Typography);
    assert.strictEqual(listItemText.childAt(1).props().color, 'textSecondary');
    assert.strictEqual(
      listItemText
        .childAt(1)
        .children()
        .text(),
      'This is the secondary text',
    );
  });

  it('should render primary and secondary text with customisable classes', () => {
    const textClasses = {
      primary: 'GeneralText',
      secondary: 'SecondaryText',
    };
    const wrapper = mount(
      <ListItemText
        primary="This is the primary text"
        secondary="This is the secondary text"
        classes={textClasses}
      />,
    );
    const listItemText = wrapper.childAt(0).childAt(0);

    assert.strictEqual(
      listItemText
        .childAt(0)
        .props()
        .className.includes('GeneralText'),
      true,
    );
    assert.strictEqual(
      listItemText
        .childAt(1)
        .props()
        .className.includes('SecondaryText'),
      true,
    );
  });

  it('should not re-wrap the <Typography> element', () => {
    const primary = <Typography>This is the primary text</Typography>;
    const secondary = <Typography>This is the secondary text</Typography>;
    const wrapper = mount(<ListItemText primary={primary} secondary={secondary} />);
    const listItemText = wrapper.childAt(0).childAt(0);
    assert.strictEqual(listItemText.childAt(0).props().children, primary.props.children);
    assert.strictEqual(listItemText.childAt(1).props().children, secondary.props.children);
  });

  it('should pass primaryTypographyProps to primary Typography component', () => {
    const wrapper = mount(
      <ListItemText
        primary="This is the primary text"
        primaryTypographyProps={{ color: 'inherit' }}
      />,
    );
    const listItemText = wrapper.childAt(0).childAt(0);
    assert.strictEqual(listItemText.childAt(0).props().color, 'inherit');
  });

  it('should pass secondaryTypographyProps to secondary Typography component', () => {
    const wrapper = mount(
      <ListItemText
        primary="This is the primary text"
        secondary="This is the secondary text"
        secondaryTypographyProps={{ color: 'inherit' }}
      />,
    );
    const listItemText = wrapper.childAt(0).childAt(0);
    assert.strictEqual(listItemText.childAt(1).props().color, 'inherit');
  });
});
