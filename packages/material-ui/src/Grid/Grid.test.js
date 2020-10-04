import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import {
  getClasses,
  createMount,
  describeConformance,
  createClientRender,
  fireEvent,
} from 'test/utils';
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

      expect(container.firstChild).to.not.equal(null);
    });
  });

  describe('prop: xs', () => {
    it('should apply the flex-grow class', () => {
      const { container } = render(<Grid item xs />);

      expect(container.firstChild).to.not.equal(null);
    });

    it('should apply the flex size class', () => {
      const { container } = render(<Grid item xs={3} />);

      expect(container.firstChild).to.not.equal(null);
    });

    it('should apply the flex auto class', () => {
      const { container } = render(<Grid item xs="auto" />);

      expect(container.firstChild).to.not.equal(null);
    });
  });

  describe('prop: spacing', () => {
    it('should have a spacing', () => {
      const { container } = render(<Grid container spacing={1} />);

      expect(container.firstChild).to.not.equal(null);
    });
  });

  describe('prop: alignItems', () => {
    it('should apply the align-item class', () => {
      const { container } = render(<Grid alignItems="center" container />);

      expect(container.firstChild).to.not.equal(null);
    });
  });

  describe('prop: alignContent', () => {
    it('should apply the align-content class', () => {
      const { container } = render(<Grid alignContent="center" container />);

      expect(container.firstChild).to.not.equal(null);
    });
  });

  describe('prop: justifyContent', () => {
    it('should apply the justify-content class', () => {
      const { container } = render(<Grid justifyContent="space-evenly" container />);

      expect(container.firstChild).to.not.equal(null);
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
