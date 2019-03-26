import React from 'react';
import { assert } from 'chai';
import {
  createMount,
  createShallow,
  describeConformance,
  getClasses,
} from '@material-ui/core/test-utils';
import Badge from './Badge';

describe('<Badge />', () => {
  let mount;
  let shallow;
  let classes;

  before(() => {
    mount = createMount();
    shallow = createShallow({ dive: true });
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

  const testChildren = <div className="unique">Hello World</div>;

  it('renders children and badgeContent', () => {
    const wrapper = shallow(<Badge badgeContent={10}>{testChildren}</Badge>);

    assert.strictEqual(wrapper.contains(testChildren), true);
    assert.strictEqual(wrapper.find('span').length, 2);
  });

  it('renders children and overwrite badge class', () => {
    const badgeClassName = 'testBadgeClassName';

    const wrapper = shallow(
      <Badge badgeContent={10} classes={{ badge: badgeClassName }}>
        {testChildren}
      </Badge>,
    );

    assert.strictEqual(wrapper.contains(testChildren), true);
    assert.strictEqual(
      wrapper
        .find('span')
        .at(1)
        .hasClass('testBadgeClassName'),
      true,
    );
  });

  it('renders children by default', () => {
    const wrapper = shallow(<Badge badgeContent={10}>{testChildren}</Badge>);

    assert.strictEqual(wrapper.contains(testChildren), true);
  });

  it('renders children and className', () => {
    const wrapper = shallow(
      <Badge badgeContent={10} className="testClassName">
        {testChildren}
      </Badge>,
    );

    assert.strictEqual(wrapper.contains(testChildren), true);
    assert.strictEqual(wrapper.is('.testClassName'), true);
  });

  it('renders children and have primary styles', () => {
    const wrapper = shallow(
      <Badge badgeContent={10} color="primary">
        {testChildren}
      </Badge>,
    );

    assert.strictEqual(wrapper.contains(testChildren), true);
    assert.strictEqual(
      wrapper
        .find('span')
        .at(1)
        .hasClass(classes.colorPrimary),
      true,
    );
  });

  it('renders children and have secondary styles', () => {
    const wrapper = shallow(
      <Badge badgeContent={10} color="secondary">
        {testChildren}
      </Badge>,
    );

    assert.strictEqual(wrapper.contains(testChildren), true);
    assert.strictEqual(
      wrapper
        .find('span')
        .at(1)
        .hasClass(classes.colorSecondary),
      true,
    );
  });

  it('have error class', () => {
    const wrapper = shallow(
      <Badge badgeContent={10} color="error">
        <span />
      </Badge>,
    );

    assert.strictEqual(
      wrapper
        .find('span')
        .at(2)
        .hasClass(classes.colorError),
      true,
    );
  });

  it('renders children and overwrite root styles', () => {
    const style = { backgroundColor: 'red' };
    const wrapper = shallow(
      <Badge badgeContent={10} style={style}>
        {testChildren}
      </Badge>,
    );

    assert.strictEqual(wrapper.contains(testChildren), true);
    assert.strictEqual(wrapper.props().style.backgroundColor, style.backgroundColor);
  });

  describe('prop: invisible', () => {
    it('should default to false', () => {
      const wrapper = shallow(<Badge badgeContent={10}>{testChildren}</Badge>);
      assert.strictEqual(
        wrapper
          .find('span')
          .at(1)
          .hasClass(classes.invisible),
        false,
      );
    });

    it('should render without the invisible class when set to false', () => {
      const wrapper = shallow(
        <Badge badgeContent={10} invisible={false}>
          {testChildren}
        </Badge>,
      );

      assert.strictEqual(
        wrapper
          .find('span')
          .at(1)
          .hasClass(classes.invisible),
        false,
      );
    });

    it('should render with the invisible class when set to true', () => {
      const wrapper = shallow(
        <Badge badgeContent={10} invisible>
          {testChildren}
        </Badge>,
      );

      assert.strictEqual(
        wrapper
          .find('span')
          .at(1)
          .hasClass(classes.invisible),
        true,
      );
    });
  });

  describe('prop: showZero', () => {
    it('should default to false', () => {
      const wrapper = shallow(<Badge badgeContent={0}>{testChildren}</Badge>);
      assert.strictEqual(
        wrapper
          .find('span')
          .at(1)
          .hasClass(classes.invisible),
        true,
      );
    });

    it('should render without the invisible class when false and badgeContent is not 0', () => {
      const wrapper = shallow(
        <Badge badgeContent={10} showZero>
          {testChildren}
        </Badge>,
      );

      assert.strictEqual(
        wrapper
          .find('span')
          .at(1)
          .hasClass(classes.invisible),
        false,
      );
    });

    it('should render without the invisible class when true and badgeContent is 0', () => {
      const wrapper = shallow(
        <Badge badgeContent={0} showZero>
          {testChildren}
        </Badge>,
      );

      assert.strictEqual(
        wrapper
          .find('span')
          .at(1)
          .hasClass(classes.invisible),
        false,
      );
    });

    it('should render with the invisible class when false and badgeContent is 0', () => {
      const wrapper = shallow(
        <Badge badgeContent={0} showZero={false}>
          {testChildren}
        </Badge>,
      );

      assert.strictEqual(
        wrapper
          .find('span')
          .at(1)
          .hasClass(classes.invisible),
        true,
      );
    });
  });

  describe('prop: variant', () => {
    it('should default to standard', () => {
      const wrapper = shallow(<Badge badgeContent={10}>{testChildren}</Badge>);

      assert.strictEqual(
        wrapper
          .find('span')
          .at(1)
          .hasClass(classes.badge),
        true,
      );
      assert.strictEqual(
        wrapper
          .find('span')
          .at(1)
          .hasClass(classes.dot),
        false,
      );
    });

    it('should render without the standard class when variant="standard"', () => {
      const wrapper = shallow(
        <Badge badgeContent={10} variant="standard">
          {testChildren}
        </Badge>,
      );

      assert.strictEqual(
        wrapper
          .find('span')
          .at(1)
          .hasClass(classes.badge),
        true,
      );
      assert.strictEqual(
        wrapper
          .find('span')
          .at(1)
          .hasClass(classes.dot),
        false,
      );
    });

    it('should not render badgeContent', () => {
      const wrapper = shallow(
        <Badge badgeContent={10} variant="dot">
          {testChildren}
        </Badge>,
      );

      assert.strictEqual(
        wrapper
          .find('span')
          .at(1)
          .text(),
        '',
      );
    });

    it('should render with the dot class when variant="dot"', () => {
      const wrapper = shallow(
        <Badge badgeContent={10} variant="dot">
          {testChildren}
        </Badge>,
      );

      assert.strictEqual(
        wrapper
          .find('span')
          .at(1)
          .hasClass(classes.badge),
        true,
      );
      assert.strictEqual(
        wrapper
          .find('span')
          .at(1)
          .hasClass(classes.dot),
        true,
      );
    });
  });

  describe('prop: max', () => {
    it('should default to 99', () => {
      const wrapper = shallow(<Badge badgeContent={100}>{testChildren}</Badge>);

      assert.strictEqual(
        wrapper
          .find('span')
          .at(1)
          .text(),
        '99+',
      );
    });

    it('should cap badgeContent', () => {
      const wrapper = shallow(
        <Badge badgeContent={1000} max={999}>
          {testChildren}
        </Badge>,
      );

      assert.strictEqual(
        wrapper
          .find('span')
          .at(1)
          .text(),
        '999+',
      );
    });

    it('should not cap if badgeContent and max are equal', () => {
      const wrapper = shallow(
        <Badge badgeContent={1000} max={1000}>
          {testChildren}
        </Badge>,
      );

      assert.strictEqual(
        wrapper
          .find('span')
          .at(1)
          .text(),
        '1000',
      );
    });

    it('should not cap if badgeContent is lower than max', () => {
      const wrapper = shallow(
        <Badge badgeContent={50} max={1000}>
          {testChildren}
        </Badge>,
      );

      assert.strictEqual(
        wrapper
          .find('span')
          .at(1)
          .text(),
        '50',
      );
    });
  });
});
