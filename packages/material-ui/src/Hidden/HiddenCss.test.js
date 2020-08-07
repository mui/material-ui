import * as React from 'react';
import { expect } from 'chai';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import HiddenCss from './HiddenCss';
import { createMuiTheme, MuiThemeProvider } from '../styles';
import consoleErrorMock from 'test/utils/consoleErrorMock';

const Foo = () => <div>bar</div>;

describe('<HiddenCss />', () => {
  /**
   * @type {ReturnType<typeof createMount>}
   */
  const mount = createMount();
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ untilSelector: 'div' });
    classes = getClasses(
      <HiddenCss>
        <div />
      </HiddenCss>,
    );
  });

  describe('the generated class names', () => {
    it('should be ok with only', () => {
      const wrapper = shallow(
        <HiddenCss only="sm">
          <div className="foo" />
        </HiddenCss>,
      );

      expect(wrapper.type()).to.equal('div');
      expect(wrapper.hasClass(classes.onlySm)).to.equal(true);

      const div = wrapper.childAt(0);
      expect(div.type()).to.equal('div');
      expect(div.props().className).to.equal('foo');
    });

    it('should be ok with only as an array', () => {
      const wrapper = shallow(
        <HiddenCss only={['xs', 'sm']}>
          <div className="foo" />
        </HiddenCss>,
      );

      expect(wrapper.type()).to.equal('div');
      expect(wrapper.props().className.split(' ')[0]).to.equal(classes.onlyXs);
      expect(wrapper.props().className.split(' ')[1]).to.equal(classes.onlySm);
    });

    it('should be ok with only as an empty array', () => {
      const wrapper = shallow(
        <HiddenCss only={[]}>
          <div className="foo" />
        </HiddenCss>,
      );

      expect(wrapper.type()).to.equal('div');
      expect(wrapper.props().className).to.equal('');
    });

    it('should be ok with mdDown', () => {
      const wrapper = shallow(
        <HiddenCss mdDown>
          <div className="foo" />
        </HiddenCss>,
      );
      expect(wrapper.hasClass(classes.mdDown)).to.equal(true);
    });

    it('should be ok with mdUp', () => {
      const wrapper = shallow(
        <HiddenCss mdUp>
          <div className="foo" />
        </HiddenCss>,
      );
      expect(wrapper.hasClass(classes.mdUp)).to.equal(true);
    });
    it('should handle provided className prop', () => {
      const wrapper = shallow(
        <HiddenCss mdUp className="custom">
          <div className="foo" />
        </HiddenCss>,
      );
      expect(wrapper.hasClass('custom')).to.equal(true);
    });

    it('allows custom breakpoints', () => {
      const theme = createMuiTheme({ breakpoints: { keys: ['xxl'] } });
      const wrapper = mount(
        <MuiThemeProvider theme={theme}>
          <HiddenCss xxlUp className="testid" classes={{ xxlUp: 'xxlUp' }}>
            <div />
          </HiddenCss>
        </MuiThemeProvider>,
      );

      expect(wrapper.find('div.testid').hasClass('xxlUp')).to.equal(true);
    });
  });

  describe('prop: children', () => {
    it('should work when text Node', () => {
      const wrapper = shallow(<HiddenCss mdUp>foo</HiddenCss>);
      expect(wrapper.type()).to.equal('div');
      expect(wrapper.hasClass(classes.mdUp)).to.equal(true);
      expect(wrapper.childAt(0).text()).to.equal('foo');
    });

    it('should work when Element', () => {
      const wrapper = shallow(
        <HiddenCss mdUp>
          <Foo />
        </HiddenCss>,
      );
      expect(wrapper.type()).to.equal('div');
      expect(wrapper.hasClass(classes.mdUp)).to.equal(true);
      expect(wrapper.childAt(0).is(Foo)).to.equal(true);
    });

    it('should work when mixed ChildrenArray', () => {
      const wrapper = shallow(
        <HiddenCss mdUp>
          <Foo />
          <Foo />
          foo
        </HiddenCss>,
      );

      expect(wrapper.type()).to.equal('div');
      expect(wrapper.hasClass(classes.mdUp)).to.equal(true);
      expect(wrapper.childAt(0).is(Foo)).to.equal(true);
      expect(wrapper.childAt(1).is(Foo)).to.equal(true);
      expect(wrapper.childAt(2).text()).to.equal('foo');
    });
  });

  describe('warnings', () => {
    beforeEach(() => {
      consoleErrorMock.spy();
    });

    afterEach(() => {
      consoleErrorMock.reset();
    });

    it('warns about excess props (potentially undeclared breakpoints)', () => {
      mount(
        <HiddenCss xxlUp>
          <div />
        </HiddenCss>,
      );

      expect(consoleErrorMock.callCount()).to.equal(1);
      expect(consoleErrorMock.messages()[0]).to.include(
        'Material-UI: Unsupported props received by `<Hidden implementation="css" />`: xxlUp.',
      );
    });
  });
});
