import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PaginationItem, { paginationItemClasses as classes } from '@mui/material/PaginationItem';
import RtlProvider from '@mui/system/RtlProvider';
import describeConformance from '../../test/describeConformance';

describe('<PaginationItem />', () => {
  const { render } = createRenderer();

  describeConformance(<PaginationItem />, () => ({
    classes,
    inheritComponent: 'button',
    render,
    muiName: 'MuiPaginationItem',
    refInstanceof: window.HTMLButtonElement,
    testVariantProps: { variant: 'foo' },
    testStateOverrides: { prop: 'variant', value: 'outlined', styleKey: 'outlined' },
    testLegacyComponentsProp: true,
    slots: {
      first: {},
      last: {},
      previous: {},
      next: {},
    },
    skip: [
      'componentProp',
      'componentsProp',
      // uses non-standard camel-case fields in `components`
      'slotsProp',
      'slotPropsProp',
      'slotPropsCallback', // not supported yet
    ],
  }));

  it('should render', () => {
    const { container } = render(<PaginationItem />);
    expect(container.firstChild).to.have.class(classes.root);
  });

  it('should add the `selected` class to the root element if `selected={true}`', () => {
    const { getByRole } = render(<PaginationItem selected />);

    expect(getByRole('button')).to.have.class(classes.selected);
  });

  it('should add the `colorPrimary` class to the root element if `color="primary"`', () => {
    const { getByRole } = render(<PaginationItem color="primary" />);

    expect(getByRole('button')).to.have.class(classes.colorPrimary);
  });

  it('should add the `colorSecondary` class to the root element if `color="secondary"`', () => {
    const { getByRole } = render(<PaginationItem color="secondary" />);

    expect(getByRole('button')).to.have.class(classes.colorSecondary);
  });

  describe('prop: disabled', () => {
    it('should add the `disabled` class to the root element if `disabled={true}`', () => {
      const { getByRole } = render(<PaginationItem disabled />);

      expect(getByRole('button')).to.have.class(classes.disabled);
    });

    it('should render a disabled button if `disabled={true}`', () => {
      const { getByRole } = render(<PaginationItem disabled />);

      expect(getByRole('button')).to.have.property('disabled', true);
    });
  });

  it('should render a small button', () => {
    const { getByTestId } = render(
      <PaginationItem data-testid="root" size="small" page={1}>
        Hello World
      </PaginationItem>,
    );

    const root = getByTestId('root');
    expect(root).to.have.class(classes.root);
    expect(root).to.have.class(classes.sizeSmall);
    expect(root).not.to.have.class(classes.sizeLarge);
  });

  it('should render a large button', () => {
    const { getByTestId } = render(
      <PaginationItem data-testid="root" size="large" page={1}>
        Hello World
      </PaginationItem>,
    );

    const root = getByTestId('root');
    expect(root).to.have.class(classes.root);
    expect(root).not.to.have.class(classes.sizeSmall);
    expect(root).to.have.class(classes.sizeLarge);
  });

  it('should render a first-last button', () => {
    const { getByRole } = render(
      <PaginationItem data-testid="root" page={1} type={'first'}>
        Hello World
      </PaginationItem>,
    );

    expect(getByRole('button')).to.have.class(classes.firstLast);
  });

  it('should render a previous-next button', () => {
    const { getByRole } = render(
      <PaginationItem data-testid="root" page={1} type={'previous'}>
        Hello World
      </PaginationItem>,
    );

    expect(getByRole('button')).to.have.class(classes.previousNext);
  });

  // describeConformance in it's current form is not able to test slots prop when slots are rendered conditionally. Hence below tests are added in this file.
  describe('prop: slots, slotProps, components', () => {
    function CustomPreviousIcon(props) {
      return <ArrowBackIcon data-testid={props['data-testid'] ?? 'custom-previous'} />;
    }

    function CustomNextIcon(props) {
      return <ArrowForwardIcon data-testid={props['data-testid'] ?? 'custom-next'} />;
    }

    function CustomFirstIcon(props) {
      return <KeyboardDoubleArrowLeftIcon data-testid={props['data-testid'] ?? 'custom-first'} />;
    }

    function CustomLastIcon(props) {
      return <KeyboardDoubleArrowRightIcon data-testid={props['data-testid'] ?? 'custom-last'} />;
    }

    it('icons passed in slots prop should override defualt icons', () => {
      const slots = {
        previous: CustomPreviousIcon,
        next: CustomNextIcon,
        first: CustomFirstIcon,
        last: CustomLastIcon,
      };

      ['first', 'previous', 'next', 'last'].forEach((slot) => {
        const { getByTestId } = render(<PaginationItem page={1} slots={slots} type={slot} />);

        expect(getByTestId(`custom-${slot}`)).not.to.equal(null);
      });
    });

    it('slotProps should be applied to icons passed in slots prop', () => {
      const slots = {
        previous: CustomPreviousIcon,
        next: CustomNextIcon,
        first: CustomFirstIcon,
        last: CustomLastIcon,
      };

      const slotProps = {
        previous: { 'data-testid': 'slot-previous' },
        next: { 'data-testid': 'slot-next' },
        first: { 'data-testid': 'slot-first' },
        last: { 'data-testid': 'slot-last' },
      };

      ['first', 'previous', 'next', 'last'].forEach((slot) => {
        const { getByTestId } = render(
          <PaginationItem page={1} slotProps={slotProps} slots={slots} type={slot} />,
        );

        expect(getByTestId(`slot-${slot}`)).not.to.equal(null);
      });
    });

    it('icons passed in slots should overide icons passed in components prop ', () => {
      const slots = {
        previous: CustomPreviousIcon,
        next: CustomNextIcon,
        first: CustomFirstIcon,
        last: CustomLastIcon,
      };

      const slotProps = {
        previous: { 'data-testid': 'slot-previous' },
        next: { 'data-testid': 'slot-next' },
        first: { 'data-testid': 'slot-first' },
        last: { 'data-testid': 'slot-last' },
      };

      const components = {
        previous: CustomPreviousIcon,
        next: CustomNextIcon,
        first: CustomFirstIcon,
        last: CustomLastIcon,
      };

      ['first', 'previous', 'next', 'last'].forEach((slot) => {
        const { getByTestId, queryByTestId } = render(
          <PaginationItem
            page={1}
            slotProps={slotProps}
            components={components}
            slots={slots}
            type={slot}
          />,
        );

        expect(getByTestId(`slot-${slot}`)).not.to.equal(null);
        expect(queryByTestId(`custom-${slot}`)).to.equal(null);
      });
    });

    it('should apply slotProps to icons passed in slots prop', () => {
      const slotProps = {
        previous: { 'data-testid': 'component-previous' },
        next: { 'data-testid': 'component-next' },
        first: { 'data-testid': 'component-first' },
        last: { 'data-testid': 'component-last' },
      };

      const components = {
        previous: CustomPreviousIcon,
        next: CustomNextIcon,
        first: CustomFirstIcon,
        last: CustomLastIcon,
      };

      ['first', 'previous', 'next', 'last'].forEach((slot) => {
        const { getByTestId, queryByTestId } = render(
          <PaginationItem page={1} slotProps={slotProps} components={components} type={slot} />,
        );

        expect(getByTestId(`component-${slot}`)).not.to.equal(null);
        expect(queryByTestId(`custom-${slot}`)).to.equal(null);
      });
    });

    it('slotProps should override internal props', () => {
      const slotProps = {
        previous: { 'data-testid': 'component-previous' },
        next: { 'data-testid': 'component-next' },
        first: { 'data-testid': 'component-first' },
        last: { 'data-testid': 'component-last' },
      };

      ['first', 'previous', 'next', 'last'].forEach((slot) => {
        const { getByTestId } = render(
          <PaginationItem page={1} slotProps={slotProps} type={slot} />,
        );

        expect(getByTestId(`component-${slot}`)).not.to.equal(null);
      });
    });

    it('should take RtlProvider into account when provided and apply slotProps to slots accordingly', () => {
      const slots = {
        previous: CustomPreviousIcon,
        next: CustomNextIcon,
        first: CustomFirstIcon,
        last: CustomLastIcon,
      };

      const slotProps = {
        previous: { 'data-testid': 'slot-previous' },
        next: { 'data-testid': 'slot-next' },
        first: { 'data-testid': 'slot-first' },
        last: { 'data-testid': 'slot-last' },
      };

      const { queryByTestId } = render(
        <RtlProvider>
          <PaginationItem page={1} slotProps={slotProps} slots={slots} type={'previous'} />
          <PaginationItem page={1} slotProps={slotProps} slots={slots} type={'first'} />
        </RtlProvider>,
      );

      expect(queryByTestId('slot-next')).not.to.equal(null);
      expect(queryByTestId('slot-previous')).to.equal(null);
      expect(queryByTestId('slot-last')).not.to.equal(null);
      expect(queryByTestId('slot-first')).to.equal(null);
    });
  });
});
