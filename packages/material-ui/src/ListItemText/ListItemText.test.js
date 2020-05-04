import * as React from 'react';
import { expect } from 'chai';
import { getClasses, createMount, findOutermostIntrinsic } from '@material-ui/core/test-utils';
import describeConformance from '../test-utils/describeConformance';
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
    expect(listItemText.hasClass(classes.inset)).to.equal(true);
    expect(listItemText.hasClass(classes.root)).to.equal(true);
  });

  it('should render with no children', () => {
    const wrapper = mount(<ListItemText />);
    const listItemText = findOutermostIntrinsic(wrapper);
    // wrapper.find('div > *').exists()
    // https://github.com/airbnb/enzyme/issues/1154
    expect(listItemText.children().exists()).to.equal(false);
  });

  describe('prop: primary', () => {
    it('should render primary text', () => {
      const ref = React.createRef();
      const text = () => ref.current.textContent;
      const wrapper = mount(<ListItemText primary="This is the primary text" ref={ref} />);
      const listItemText = findOutermostIntrinsic(wrapper);
      const typography = listItemText.find(Typography);
      expect(typography.exists()).to.equal(true);
      expect(typography.props().variant).to.equal('body1');
      expect(text()).to.equal('This is the primary text');
    });

    it('should use the primary node', () => {
      const primary = <span />;
      const wrapper = mount(<ListItemText primary={primary} />);
      expect(wrapper.contains(primary)).to.equal(true);
    });

    it('should use the children prop as primary node', () => {
      const primary = <span />;
      const wrapper = mount(<ListItemText>{primary}</ListItemText>);
      expect(wrapper.contains(primary)).to.equal(true);
    });

    it('should read 0 as primary', () => {
      const wrapper = mount(<ListItemText primary={0} />);
      const listItemText = findOutermostIntrinsic(wrapper);
      expect(listItemText.find(Typography).exists()).to.equal(true);
    });
  });

  describe('prop: secondary', () => {
    it('should render secondary text', () => {
      const wrapper = mount(<ListItemText secondary="This is the secondary text" />);
      const listItemText = findOutermostIntrinsic(wrapper);
      const typography = listItemText.find(Typography);
      expect(typography.exists()).to.equal(true);
      expect(typography.props().color).to.equal('textSecondary');
      expect(listItemText.text()).to.equal('This is the secondary text');
    });

    it('should use the secondary node', () => {
      const secondary = <span />;
      const wrapper = mount(<ListItemText secondary={secondary} />);
      expect(wrapper.contains(secondary)).to.equal(true);
    });

    it('should read 0 as secondary', () => {
      const wrapper = mount(<ListItemText secondary={0} />);
      const listItemText = findOutermostIntrinsic(wrapper);
      expect(listItemText.find(Typography).exists()).to.equal(true);
    });
  });

  describe('prop: disableTypography', () => {
    it('should wrap children in `<Typography/>` by default', () => {
      const wrapper = mount(
        <ListItemText primary="This is the primary text" secondary="This is the secondary text" />,
      );
      const listItemText = findOutermostIntrinsic(wrapper);

      const texts = listItemText.find(Typography);
      expect(texts.length).to.equal(2);

      const primaryText = texts.first();
      expect(primaryText.props().variant).to.equal('body1');
      expect(primaryText.text()).to.equal('This is the primary text');

      const secondaryText = texts.last();
      expect(secondaryText.props().color).to.equal('textSecondary');
      expect(secondaryText.text()).to.equal('This is the secondary text');
    });

    it('should render JSX children', () => {
      const primaryChild = <p className="test">This is the primary text</p>;
      const secondaryChild = <p className="test">This is the secondary text</p>;
      const wrapper = mount(
        <ListItemText primary={primaryChild} secondary={secondaryChild} disableTypography />,
      );
      const texts = wrapper.find('div > p');
      expect(texts.first().equals(primaryChild)).to.equal(true);
      expect(texts.last().equals(secondaryChild)).to.equal(true);
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

    expect(texts.first().props().className.includes('GeneralText')).to.equal(true);
    expect(texts.last().props().className.includes('SecondaryText')).to.equal(true);
  });

  it('should not re-wrap the <Typography> element', () => {
    const primary = <Typography>This is the primary text</Typography>;
    const secondary = <Typography>This is the secondary text</Typography>;
    const wrapper = mount(<ListItemText primary={primary} secondary={secondary} />);
    const texts = findOutermostIntrinsic(wrapper).find(Typography);
    expect(texts.length).to.equal(2);
    expect(texts.first().props().children).to.equal(primary.props.children);
    expect(texts.last().props().children).to.equal(secondary.props.children);
  });

  it('should pass primaryTypographyProps to primary Typography component', () => {
    const wrapper = mount(
      <ListItemText
        primary="This is the primary text"
        primaryTypographyProps={{ color: 'inherit' }}
      />,
    );
    const listItemText = findOutermostIntrinsic(wrapper);
    expect(listItemText.find(Typography).props().color).to.equal('inherit');
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
    expect(listItemText.find(Typography).last().props().color).to.equal('inherit');
  });
});
