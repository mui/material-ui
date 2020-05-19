import * as React from 'react';
import { expect } from 'chai';
import { createClientRender } from 'test/utils/createClientRender';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import TableSortLabel from './TableSortLabel';
import ButtonBase from '../ButtonBase';
import Sort from '@material-ui/icons/Sort';

describe('<TableSortLabel />', () => {
  const mount = createMount();
  let classes;
  const render = createClientRender();

  before(() => {
    classes = getClasses(<TableSortLabel />);
  });

  describeConformance(<TableSortLabel />, () => ({
    classes,
    inheritComponent: ButtonBase,
    mount,

    refInstanceof: window.HTMLSpanElement,
    skip: ['componentProp'],
  }));

  it('should set the active class when active', () => {
    const activeFlag = true;
    const { container } = render(<TableSortLabel active={activeFlag} />);
    expect(container.firstChild).to.have.class(classes.active);
  });

  it('should not set the active class when not active', () => {
    const activeFlag = false;
    const { container } = render(<TableSortLabel active={activeFlag} />);
    expect(container.firstChild).to.not.have.class(classes.active);
  });

  describe('has an icon', () => {
    it('should have one child with the icon class', () => {
      const { container } = render(<TableSortLabel />);
      const iconChildren = container.querySelectorAll(`.${classes.icon}`);
      expect(iconChildren.length).to.equal(1);
    });

    it('when given direction desc should have desc direction class', () => {
      const { container } = render(<TableSortLabel direction="desc" />);
      const icon = container.querySelector(`.${classes.icon}`);
      expect(icon).to.not.have.class(classes.iconDirectionAsc);
      expect(icon).to.have.class(classes.iconDirectionDesc);
    });

    it('when given direction asc should have asc direction class', () => {
      const { container } = render(<TableSortLabel direction="asc" />);
      const icon = container.querySelector(`.${classes.icon}`);
      expect(icon).to.not.have.class(classes.iconDirectionDesc);
      expect(icon).to.have.class(classes.iconDirectionAsc);
    });

    it('should accept a custom icon for the sort icon', () => {
      const { container } = render(<TableSortLabel IconComponent={Sort} />);
      const icon = container.querySelector(`svg.${classes.icon}[data-mui-test="SortIcon"]`);
      expect(icon).to.not.equal(null);
    });
  });

  describe('prop: hideSortIcon', () => {
    it('can hide icon when not active', () => {
      const { container } = render(<TableSortLabel active={false} hideSortIcon />);
      const iconChildren = container.querySelectorAll(`.${classes.icon}`);
      expect(iconChildren.length).to.equal(0);
    });

    it('does not hide icon by default when not active', () => {
      const { container } = render(<TableSortLabel active={false} />);
      const iconChildren = container.querySelectorAll(`.${classes.icon}`);
      expect(iconChildren.length).to.equal(1);
    });

    it('does not hide icon when active', () => {
      const { container } = render(<TableSortLabel active hideSortIcon />);
      const iconChildren = container.querySelectorAll(`.${classes.icon}`);
      expect(iconChildren.length).to.equal(1);
    });
  });
});
