import * as React from 'react';
import { expect } from 'chai';
import { getClasses, createMount, describeConformance, createClientRender } from 'test/utils';
import { createMuiTheme } from '@material-ui/core/styles';
import Grid, { styles } from './Grid';

describe('<Grid />', () => {
  const mount = createMount();
  const render = createClientRender();
  let classes;

  before(() => {
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
      const { container } = render(<Grid container />);

      expect(container.firstChild).to.have.class(classes.container);
    });
  });

  describe('prop: item', () => {
    it('should apply the item class', () => {
      const { container } = render(<Grid item />);

      expect(container.firstChild).to.have.class(classes.item);
    });
  });

  describe('prop: xs', () => {
    it('should apply the flex-grow class', () => {
      const { container } = render(<Grid item xs />);

      expect(container.firstChild).to.have.class(classes['grid-xs-true']);
    });

    it('should apply the flex size class', () => {
      const { container } = render(<Grid item xs={3} />);

      expect(container.firstChild).to.have.class(classes['grid-xs-3']);
    });

    it('should apply the flex auto class', () => {
      const { container } = render(<Grid item xs="auto" />);

      expect(container.firstChild).to.have.class(classes['grid-xs-auto']);
    });
  });

  describe('prop: spacing', () => {
    it('should have a spacing', () => {
      const { container } = render(<Grid container spacing={1} />);

      expect(container.firstChild).to.have.class(classes['spacing-xs-1']);
    });
  });

  describe('prop: alignItems', () => {
    it('should apply the align-item class', () => {
      const { container } = render(<Grid alignItems="center" container />);

      expect(container.firstChild).to.have.class(classes['align-items-xs-center']);
    });
  });

  describe('prop: alignContent', () => {
    it('should apply the align-content class', () => {
      const { container } = render(<Grid alignContent="center" container />);

      expect(container.firstChild).to.have.class(classes['align-content-xs-center']);
    });
  });

  describe('prop: justifyContent', () => {
    it('should apply the justify-content class', () => {
      const { container } = render(<Grid justifyContent="space-evenly" container />);

      expect(container.firstChild).to.have.class(classes['justify-content-xs-space-evenly']);
    });
  });

  describe('prop: other', () => {
    it('should spread the other props to the root element', () => {
      const handleClick = () => {};
      const wrapper = mount(<Grid component="span" onClick={handleClick} />);
      const modal = wrapper.find(Grid);

      expect(modal.props().onClick).to.equal(handleClick);
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
