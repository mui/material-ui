import React from 'react';
import { assert } from 'chai';
import { createMount, describeConformance, getClasses } from '@material-ui/core/test-utils';
import Badge from './Badge';

function findBadge(wrapper) {
  return wrapper.find('span').at(1);
}

describe('<Badge />', () => {
  let mount;
  let classes;
  const defaultProps = {
    children: <div className="unique">Hello World</div>,
  };

  before(() => {
    mount = createMount();
    classes = getClasses(<Badge badgeContent={1}>Hello World</Badge>);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(
    <Badge>
      <div />
    </Badge>,
    () => ({
      classes,
      inheritComponent: 'span',
      mount,
      refInstanceof: window.HTMLSpanElement,
      testComponentPropWith: 'div',
    }),
  );

  it('renders children and badgeContent', () => {
    const wrapper = mount(<Badge {...defaultProps} badgeContent={10} />);
    assert.strictEqual(wrapper.contains(defaultProps.children), true);
    assert.strictEqual(wrapper.find('span').length, 2);
  });

  it('renders children and overwrite badge class', () => {
    const badgeClassName = 'testBadgeClassName';
    const wrapper = mount(
      <Badge {...defaultProps} badgeContent={10} classes={{ badge: badgeClassName }} />,
    );
    assert.strictEqual(wrapper.contains(defaultProps.children), true);
    assert.strictEqual(findBadge(wrapper).hasClass(badgeClassName), true);
  });

  it('renders children and className', () => {
    const wrapper = mount(<Badge badgeContent={10} className="testClassName" {...defaultProps} />);
    assert.strictEqual(wrapper.contains(defaultProps.children), true);
    assert.strictEqual(wrapper.hasClass('testClassName'), true);
  });

  describe('prop: color', () => {
    it('renders children and have primary styles', () => {
      const wrapper = mount(<Badge {...defaultProps} badgeContent={10} color="primary" />);
      assert.strictEqual(wrapper.contains(defaultProps.children), true);
      assert.strictEqual(findBadge(wrapper).hasClass(classes.colorPrimary), true);
    });

    it('renders children and have secondary styles', () => {
      const wrapper = mount(<Badge {...defaultProps} badgeContent={10} color="secondary" />);
      assert.strictEqual(wrapper.contains(defaultProps.children), true);
      assert.strictEqual(findBadge(wrapper).hasClass(classes.colorSecondary), true);
    });

    it('have error class', () => {
      const wrapper = mount(<Badge {...defaultProps} badgeContent={10} color="error" />);
      assert.strictEqual(findBadge(wrapper).hasClass(classes.colorError), true);
    });
  });

  describe('prop: invisible', () => {
    it('should default to false', () => {
      const wrapper = mount(<Badge {...defaultProps} badgeContent={10} />);
      assert.strictEqual(findBadge(wrapper).hasClass(classes.invisible), false);
    });

    it('should render without the invisible class when set to false', () => {
      const wrapper = mount(<Badge {...defaultProps} badgeContent={10} invisible={false} />);
      assert.strictEqual(findBadge(wrapper).hasClass(classes.invisible), false);
    });

    it('should render with the invisible class when set to true', () => {
      const wrapper = mount(<Badge {...defaultProps} badgeContent={10} invisible />);
      assert.strictEqual(findBadge(wrapper).hasClass(classes.invisible), true);
    });

    it('should render with the invisible class when empty and not dot', () => {
      let wrapper;
      wrapper = mount(<Badge {...defaultProps} badgeContent={null} />);
      assert.strictEqual(findBadge(wrapper).hasClass(classes.invisible), true);
      wrapper = mount(<Badge {...defaultProps} badgeContent={undefined} />);
      assert.strictEqual(findBadge(wrapper).hasClass(classes.invisible), true);
      wrapper = mount(<Badge {...defaultProps} badgeContent={undefined} variant="dot" />);
      assert.strictEqual(findBadge(wrapper).hasClass(classes.invisible), false);
    });
  });

  describe('prop: showZero', () => {
    it('should default to false', () => {
      const wrapper = mount(<Badge {...defaultProps} badgeContent={0} />);
      assert.strictEqual(findBadge(wrapper).hasClass(classes.invisible), true);
    });

    it('should render without the invisible class when false and badgeContent is not 0', () => {
      const wrapper = mount(<Badge {...defaultProps} badgeContent={10} showZero />);
      assert.strictEqual(findBadge(wrapper).hasClass(classes.invisible), false);
    });

    it('should render without the invisible class when true and badgeContent is 0', () => {
      const wrapper = mount(<Badge {...defaultProps} badgeContent={0} showZero />);
      assert.strictEqual(findBadge(wrapper).hasClass(classes.invisible), false);
    });

    it('should render with the invisible class when false and badgeContent is 0', () => {
      const wrapper = mount(<Badge {...defaultProps} badgeContent={0} showZero={false} />);

      assert.strictEqual(findBadge(wrapper).hasClass(classes.invisible), true);
    });
  });

  describe('prop: variant', () => {
    it('should default to standard', () => {
      const wrapper = mount(<Badge {...defaultProps} badgeContent={10} />);
      assert.strictEqual(findBadge(wrapper).hasClass(classes.badge), true);
      assert.strictEqual(findBadge(wrapper).hasClass(classes.dot), false);
    });

    it('should render without the standard class when variant="standard"', () => {
      const wrapper = mount(<Badge {...defaultProps} badgeContent={10} variant="standard" />);
      assert.strictEqual(findBadge(wrapper).hasClass(classes.badge), true);
      assert.strictEqual(findBadge(wrapper).hasClass(classes.dot), false);
    });

    it('should not render badgeContent', () => {
      const wrapper = mount(<Badge {...defaultProps} badgeContent={10} variant="dot" />);
      assert.strictEqual(findBadge(wrapper).text(), '');
    });

    it('should render with the dot class when variant="dot"', () => {
      const wrapper = mount(<Badge {...defaultProps} badgeContent={10} variant="dot" />);
      assert.strictEqual(findBadge(wrapper).hasClass(classes.badge), true);
      assert.strictEqual(findBadge(wrapper).hasClass(classes.dot), true);
    });
  });

  describe('prop: max', () => {
    it('should default to 99', () => {
      const wrapper = mount(<Badge {...defaultProps} badgeContent={100} />);
      assert.strictEqual(findBadge(wrapper).text(), '99+');
    });

    it('should cap badgeContent', () => {
      const wrapper = mount(<Badge {...defaultProps} badgeContent={1000} max={999} />);
      assert.strictEqual(findBadge(wrapper).text(), '999+');
    });

    it('should not cap if badgeContent and max are equal', () => {
      const wrapper = mount(<Badge {...defaultProps} badgeContent={1000} max={1000} />);
      assert.strictEqual(findBadge(wrapper).text(), '1000');
    });

    it('should not cap if badgeContent is lower than max', () => {
      const wrapper = mount(<Badge {...defaultProps} badgeContent={50} max={1000} />);
      assert.strictEqual(findBadge(wrapper).text(), '50');
    });
  });
});
