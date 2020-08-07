import * as React from 'react';
import { expect } from 'chai';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import SvgIcon from './SvgIcon';

describe('<SvgIcon />', () => {
  let shallow;
  const mount = createMount();
  let classes;
  let path;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<SvgIcon>foo</SvgIcon>);
    path = <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />;
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
      testComponentPropWith: (props) => (
        <svg {...props}>
          <defs>
            <linearGradient id="gradient1">
              <stop offset="20%" stopColor="#39F" />
              <stop offset="90%" stopColor="#F3F" />
            </linearGradient>
          </defs>
          {props.children}
        </svg>
      ),
    }),
  );

  it('renders children by default', () => {
    const wrapper = shallow(<SvgIcon>{path}</SvgIcon>);
    expect(wrapper.contains(path)).to.equal(true);
    expect(wrapper.props()['aria-hidden']).to.equal(true);
  });

  describe('prop: titleAccess', () => {
    it('should be able to make an icon accessible', () => {
      const wrapper = shallow(
        <SvgIcon title="Go to link" titleAccess="Network">
          {path}
        </SvgIcon>,
      );
      expect(wrapper.find('title').text()).to.equal('Network');
      expect(wrapper.props()['aria-hidden']).to.equal(undefined);
    });
  });

  describe('prop: color', () => {
    it('should render with the user and SvgIcon classes', () => {
      const wrapper = shallow(<SvgIcon className="meow">{path}</SvgIcon>);
      expect(wrapper.hasClass('meow')).to.equal(true);
      expect(wrapper.hasClass(classes.root)).to.equal(true);
    });

    it('should render with the secondary color', () => {
      const wrapper = shallow(<SvgIcon color="secondary">{path}</SvgIcon>);
      expect(wrapper.hasClass(classes.colorSecondary)).to.equal(true);
    });

    it('should render with the action color', () => {
      const wrapper = shallow(<SvgIcon color="action">{path}</SvgIcon>);
      expect(wrapper.hasClass(classes.colorAction)).to.equal(true);
    });

    it('should render with the error color', () => {
      const wrapper = shallow(<SvgIcon color="error">{path}</SvgIcon>);
      expect(wrapper.hasClass(classes.colorError)).to.equal(true);
    });

    it('should render with the primary class', () => {
      const wrapper = shallow(<SvgIcon color="primary">{path}</SvgIcon>);
      expect(wrapper.hasClass(classes.colorPrimary)).to.equal(true);
    });
  });

  describe('prop: fontSize', () => {
    it('should be able to change the fontSize', () => {
      const wrapper = shallow(<SvgIcon fontSize="inherit">{path}</SvgIcon>);
      expect(wrapper.hasClass(classes.fontSizeInherit)).to.equal(true);
    });
  });
});
