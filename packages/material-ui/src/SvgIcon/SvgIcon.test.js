import React from 'react';
import { assert } from 'chai';
import {
  createShallow,
  createMount,
  describeConformance,
  getClasses,
} from '@material-ui/core/test-utils';
import SvgIcon from './SvgIcon';

describe('<SvgIcon />', () => {
  let shallow;
  let mount;
  let classes;
  let path;

  before(() => {
    shallow = createShallow({ dive: true });
    mount = createMount({ strict: true });
    classes = getClasses(<SvgIcon>foo</SvgIcon>);
    path = <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />;
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(
    <SvgIcon>
      <path />
    </SvgIcon>,
    () => ({
      classes,
      inheritComponent: 'svg',
      mount,
      refInstanceof: window.SVGSVGElement,
      testComponentPropWith: props => (
        <svg {...props}>
          <defs>
            <linearGradient id="gradient1">
              <stop offset="20%" stopColor="#39F" />
              <stop offset="90%" stopColor="#F3F" />
            </linearGradient>
          </defs>
          {/* eslint-disable-next-line react/prop-types */}
          {props.children}
        </svg>
      ),
    }),
  );

  it('renders children by default', () => {
    const wrapper = shallow(<SvgIcon>{path}</SvgIcon>);
    assert.strictEqual(wrapper.contains(path), true);
    assert.strictEqual(wrapper.props()['aria-hidden'], 'true');
  });

  describe('prop: titleAccess', () => {
    it('should be able to make an icon accessible', () => {
      const wrapper = shallow(
        <SvgIcon title="Go to link" titleAccess="Network">
          {path}
        </SvgIcon>,
      );
      assert.strictEqual(wrapper.find('title').text(), 'Network');
      assert.strictEqual(wrapper.props()['aria-hidden'], 'false');
    });
  });

  describe('prop: color', () => {
    it('should render with the user and SvgIcon classes', () => {
      const wrapper = shallow(<SvgIcon className="meow">{path}</SvgIcon>);
      assert.strictEqual(wrapper.hasClass('meow'), true);
      assert.strictEqual(wrapper.hasClass(classes.root), true);
    });

    it('should render with the secondary color', () => {
      const wrapper = shallow(<SvgIcon color="secondary">{path}</SvgIcon>);
      assert.strictEqual(wrapper.hasClass(classes.colorSecondary), true);
    });

    it('should render with the action color', () => {
      const wrapper = shallow(<SvgIcon color="action">{path}</SvgIcon>);
      assert.strictEqual(wrapper.hasClass(classes.colorAction), true);
    });

    it('should render with the error color', () => {
      const wrapper = shallow(<SvgIcon color="error">{path}</SvgIcon>);
      assert.strictEqual(wrapper.hasClass(classes.colorError), true);
    });

    it('should render with the primary class', () => {
      const wrapper = shallow(<SvgIcon color="primary">{path}</SvgIcon>);
      assert.strictEqual(wrapper.hasClass(classes.colorPrimary), true);
    });
  });

  describe('prop: fontSize', () => {
    it('should be able to change the fontSize', () => {
      const wrapper = shallow(<SvgIcon fontSize="inherit">{path}</SvgIcon>);
      assert.strictEqual(wrapper.hasClass(classes.fontSizeInherit), true);
    });
  });
});
