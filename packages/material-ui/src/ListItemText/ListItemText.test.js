import React from 'react';
import { assert } from 'chai';
import {
  getClasses,
  createMount,
  describeConformance,
  findOutermostIntrinsic,
} from '@material-ui/core/test-utils';
import Typography from '../Typography';
import ListItemText from './ListItemText';

describe('<ListItemText />', () => {
  let mount;
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(<ListItemText />);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<ListItemText />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));

  it('should render with inset class', () => {
    const wrapper = mount(<ListItemText inset />);
    const listItemText = findOutermostIntrinsic(wrapper);
    assert.strictEqual(listItemText.hasClass(classes.inset), true);
    assert.strictEqual(listItemText.hasClass(classes.root), true);
  });

  it('should render with no children', () => {
    const wrapper = mount(<ListItemText />);
    const listItemText = findOutermostIntrinsic(wrapper);
    // wrapper.find('div > *').exists()
    // https://github.com/airbnb/enzyme/issues/1154
    assert.strictEqual(listItemText.children().exists(), false);
  });

  describe('prop: primary', () => {
    it('should render primary text', () => {
      const ref = React.createRef();
      const text = () => ref.current.textContent;
      const wrapper = mount(<ListItemText primary="This is the primary text" ref={ref} />);
      const listItemText = findOutermostIntrinsic(wrapper);
      const typography = listItemText.find(Typography);
      assert.strictEqual(typography.exists(), true);
      assert.strictEqual(typography.props().variant, 'body1');
      assert.strictEqual(text(), 'This is the primary text');
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
      const listItemText = findOutermostIntrinsic(wrapper);
      assert.strictEqual(listItemText.find(Typography).exists(), true);
    });
  });

  describe('prop: secondary', () => {
    it('should render secondary text', () => {
      const wrapper = mount(<ListItemText secondary="This is the secondary text" />);
      const listItemText = findOutermostIntrinsic(wrapper);
      const typography = listItemText.find(Typography);
      assert.strictEqual(typography.exists(), true);
      assert.strictEqual(typography.props().color, 'textSecondary');
      assert.strictEqual(listItemText.text(), 'This is the secondary text');
    });

    it('should use the secondary node', () => {
      const secondary = <span />;
      const wrapper = mount(<ListItemText secondary={secondary} />);
      assert.strictEqual(wrapper.contains(secondary), true);
    });

    it('should read 0 as secondary', () => {
      const wrapper = mount(<ListItemText secondary={0} />);
      const listItemText = findOutermostIntrinsic(wrapper);
      assert.strictEqual(listItemText.find(Typography).exists(), true);
    });
  });

  describe('prop: disableTypography', () => {
    it('should wrap children in `<Typography/>` by default', () => {
      const wrapper = mount(
        <ListItemText primary="This is the primary text" secondary="This is the secondary text" />,
      );
      const listItemText = findOutermostIntrinsic(wrapper);

      const texts = listItemText.find(Typography);
      assert.strictEqual(texts.length, 2);

      const primaryText = texts.first();
      assert.strictEqual(primaryText.props().variant, 'body1');
      assert.strictEqual(primaryText.text(), 'This is the primary text');

      const secondaryText = texts.last();
      assert.strictEqual(secondaryText.props().color, 'textSecondary');
      assert.strictEqual(secondaryText.text(), 'This is the secondary text');
    });

    it('should render JSX children', () => {
      const primaryChild = <p className="test">This is the primary text</p>;
      const secondaryChild = <p className="test">This is the secondary text</p>;
      const wrapper = mount(
        <ListItemText primary={primaryChild} secondary={secondaryChild} disableTypography />,
      );
      const texts = wrapper.find('div > p');
      assert.strictEqual(texts.first().equals(primaryChild), true);
      assert.strictEqual(texts.last().equals(secondaryChild), true);
    });
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
    const texts = wrapper.find(Typography);

    assert.strictEqual(
      texts
        .first()
        .props()
        .className.includes('GeneralText'),
      true,
    );
    assert.strictEqual(
      texts
        .last()
        .props()
        .className.includes('SecondaryText'),
      true,
    );
  });

  it('should not re-wrap the <Typography> element', () => {
    const primary = <Typography>This is the primary text</Typography>;
    const secondary = <Typography>This is the secondary text</Typography>;
    const wrapper = mount(<ListItemText primary={primary} secondary={secondary} />);
    const texts = findOutermostIntrinsic(wrapper).find(Typography);
    assert.strictEqual(texts.length, 2);
    assert.strictEqual(texts.first().props().children, primary.props.children);
    assert.strictEqual(texts.last().props().children, secondary.props.children);
  });

  it('should pass primaryTypographyProps to primary Typography component', () => {
    const wrapper = mount(
      <ListItemText
        primary="This is the primary text"
        primaryTypographyProps={{ color: 'inherit' }}
      />,
    );
    const listItemText = findOutermostIntrinsic(wrapper);
    assert.strictEqual(listItemText.find(Typography).props().color, 'inherit');
  });

  it('should pass secondaryTypographyProps to secondary Typography component', () => {
    const wrapper = mount(
      <ListItemText
        primary="This is the primary text"
        secondary="This is the secondary text"
        secondaryTypographyProps={{ color: 'inherit' }}
      />,
    );
    const listItemText = findOutermostIntrinsic(wrapper);
    assert.strictEqual(
      listItemText
        .find(Typography)
        .last()
        .props().color,
      'inherit',
    );
  });
});
