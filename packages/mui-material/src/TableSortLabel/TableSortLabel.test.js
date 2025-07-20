import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import TableSortLabel, { tableSortLabelClasses as classes } from '@mui/material/TableSortLabel';
import ButtonBase from '@mui/material/ButtonBase';
import { createSvgIcon } from '@mui/material/utils';
import describeConformance from '../../test/describeConformance';

const SortIcon = createSvgIcon(<path d="M3 3h18v18H3z" />, 'Sort');

describe('<TableSortLabel />', () => {
  const { render } = createRenderer();

  describeConformance(<TableSortLabel />, () => ({
    classes,
    inheritComponent: ButtonBase,
    render,
    muiName: 'MuiTableSortLabel',
    testVariantProps: { variant: 'foo' },
    testDeepOverrides: { slotName: 'icon', slotClassName: classes.icon },
    refInstanceof: window.HTMLSpanElement,
    skip: ['componentProp', 'componentsProp'],
    slots: {
      icon: {
        expectedClassName: classes.icon,
      },
    },
  }));

  it('should set the active class when active', () => {
    const activeFlag = true;
    const { container } = render(<TableSortLabel active={activeFlag} />);
    expect(container.firstChild).to.have.class(classes.active);
  });

  it('should not set the active class when not active', () => {
    const activeFlag = false;
    const { container } = render(<TableSortLabel active={activeFlag} />);
    expect(container.firstChild).not.to.have.class(classes.active);
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
      expect(icon).not.to.have.class(classes.iconDirectionAsc);
      expect(icon).to.have.class(classes.iconDirectionDesc);
      expect(container.firstChild).to.have.class(classes.directionDesc);
      expect(container.querySelector(`.${classes.directionDesc} > .${classes.icon}`)).not.equal(
        null,
      );
    });

    it('when given direction asc should have asc direction class', () => {
      const { container } = render(<TableSortLabel direction="asc" />);
      const icon = container.querySelector(`.${classes.icon}`);
      expect(icon).not.to.have.class(classes.iconDirectionDesc);
      expect(icon).to.have.class(classes.iconDirectionAsc);
      expect(container.firstChild).to.have.class(classes.directionAsc);
      expect(container.querySelector(`.${classes.directionAsc} > .${classes.icon}`)).not.equal(
        null,
      );
    });

    it('should accept a custom icon for the sort icon', () => {
      const { getAllByTestId } = render(<TableSortLabel IconComponent={SortIcon} />);
      expect(getAllByTestId('SortIcon')).not.to.equal(null);
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
