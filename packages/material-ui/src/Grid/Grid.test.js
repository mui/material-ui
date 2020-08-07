import * as React from 'react';
import { expect } from 'chai';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import { createMuiTheme } from '@material-ui/core/styles';
import describeConformance from '../test-utils/describeConformance';
import Grid, { styles } from './Grid';

describe('<Grid />', () => {
  const mount = createMount();
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<Grid />);
  });

  describeConformance(<Grid />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
  }));

  describe('prop: container', () => {
    it('should apply the container class', () => {
      const wrapper = shallow(<Grid container />);
      expect(wrapper.hasClass(classes.container)).to.equal(true);
    });
  });

  describe('prop: item', () => {
    it('should apply the item class', () => {
      const wrapper = shallow(<Grid item />);
      expect(wrapper.hasClass(classes.item)).to.equal(true);
    });
  });

  describe('prop: xs', () => {
    it('should apply the flex-grow class', () => {
      const wrapper = shallow(<Grid item xs />);
      expect(wrapper.hasClass(classes['grid-xs-true'])).to.equal(true);
    });

    it('should apply the flex size class', () => {
      const wrapper = shallow(<Grid item xs={3} />);
      expect(wrapper.hasClass(classes['grid-xs-3'])).to.equal(true);
    });

    it('should apply the flex auto class', () => {
      const wrapper = shallow(<Grid item xs="auto" />);
      expect(wrapper.hasClass(classes['grid-xs-auto'])).to.equal(true);
    });
  });

  describe('prop: spacing', () => {
    it('should have a spacing', () => {
      const wrapper = shallow(<Grid container spacing={1} />);
      expect(wrapper.hasClass(classes['spacing-xs-1'])).to.equal(true);
    });
  });

  describe('prop: alignItems', () => {
    it('should apply the align-item class', () => {
      const wrapper = shallow(<Grid alignItems="center" container />);
      expect(wrapper.hasClass(classes['align-items-xs-center'])).to.equal(true);
    });
  });

  describe('prop: alignContent', () => {
    it('should apply the align-content class', () => {
      const wrapper = shallow(<Grid alignContent="center" container />);
      expect(wrapper.hasClass(classes['align-content-xs-center'])).to.equal(true);
    });
  });

  describe('prop: justify', () => {
    it('should apply the justify class', () => {
      const wrapper = shallow(<Grid justify="space-evenly" container />);
      expect(wrapper.hasClass(classes['justify-xs-space-evenly'])).to.equal(true);
    });
  });

  describe('prop: other', () => {
    it('should spread the other props to the root element', () => {
      const handleClick = () => {};
      const wrapper = shallow(<Grid component="span" onClick={handleClick} />);
      expect(wrapper.props().onClick).to.equal(handleClick);
    });
  });

  describe('gutter', () => {
    it('should generate the right values', () => {
      const defaultTheme = createMuiTheme();
      const remTheme = createMuiTheme({
        spacing: (factor) => `${0.25 * factor}rem`,
      });

      expect(styles(remTheme)['spacing-xs-2']).to.deep.equal({
        margin: '-0.25rem',
        width: 'calc(100% + 0.5rem)',
        '& > $item': { padding: '0.25rem' },
      });
      expect(styles(defaultTheme)['spacing-xs-2']).to.deep.equal({
        margin: '-8px',
        width: 'calc(100% + 16px)',
        '& > $item': { padding: '8px' },
      });
    });
  });
});
