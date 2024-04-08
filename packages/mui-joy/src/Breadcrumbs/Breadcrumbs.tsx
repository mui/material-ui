'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { OverridableComponent } from '@mui/types';
import {
  unstable_capitalize as capitalize,
  unstable_isMuiElement as isMuiElement,
} from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import clsx from 'clsx';
import { useThemeProps } from '../styles';
import useSlot from '../utils/useSlot';
import styled from '../styles/styled';
import { getBreadcrumbsUtilityClass } from './breadcrumbsClasses';
import { BreadcrumbsProps, BreadcrumbsOwnerState, BreadcrumbsTypeMap } from './BreadcrumbsProps';
import { TypographyInheritContext } from '../Typography/Typography';

const useUtilityClasses = (ownerState: BreadcrumbsOwnerState) => {
  const { size } = ownerState;

  const slots = {
    root: ['root', size && `size${capitalize(size)}`],
    li: ['li'],
    ol: ['ol'],
    separator: ['separator'],
  };

  return composeClasses(slots, getBreadcrumbsUtilityClass, {});
};

const BreadcrumbsRoot = styled('nav', {
  name: 'JoyBreadcrumbs',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: BreadcrumbsOwnerState }>(({ theme, ownerState }) => ({
  ...(ownerState.size === 'sm' && {
    '--Icon-fontSize': theme.vars.fontSize.lg,
    gap: 'var(--Breadcrumbs-gap, 0.25rem)',
    padding: '0.5rem',
  }),
  ...(ownerState.size === 'md' && {
    '--Icon-fontSize': theme.vars.fontSize.xl,
    gap: 'var(--Breadcrumbs-gap, 0.375rem)',
    padding: '0.75rem',
  }),
  ...(ownerState.size === 'lg' && {
    '--Icon-fontSize': theme.vars.fontSize.xl2,
    gap: 'var(--Breadcrumbs-gap, 0.5rem)',
    padding: '1rem',
  }),
  ...theme.typography[`body-${ownerState.size!}`],
}));

const BreadcrumbsOl = styled('ol', {
  name: 'JoyBreadcrumbs',
  slot: 'Ol',
  overridesResolver: (props, styles) => styles.ol,
})<{ ownerState: BreadcrumbsOwnerState }>({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: 'inherit',
  // reset user-agent style
  padding: 0,
  margin: 0,
  listStyle: 'none',
});

const BreadcrumbsLi = styled('li', {
  name: 'JoyBreadcrumbs',
  slot: 'Li',
  overridesResolver: (props, styles) => styles.li,
})<{ ownerState: BreadcrumbsOwnerState }>({
  display: 'flex',
  alignItems: 'center',
});

const BreadcrumbsSeparator = styled('li', {
  name: 'JoyBreadcrumbs',
  slot: 'Separator',
  overridesResolver: (props, styles) => styles.separator,
})<{ ownerState: BreadcrumbsOwnerState }>({
  display: 'flex',
  userSelect: 'none',
});
/**
 *
 * Demos:
 *
 * - [Breadcrumbs](https://mui.com/joy-ui/react-breadcrumbs/)
 *
 * API:
 *
 * - [Breadcrumbs API](https://mui.com/joy-ui/api/breadcrumbs/)
 */
const Breadcrumbs = React.forwardRef(function Breadcrumbs(inProps, ref) {
  const props = useThemeProps<typeof inProps & BreadcrumbsProps>({
    props: inProps,
    name: 'JoyBreadcrumbs',
  });

  const {
    children,
    className,
    size = 'md',
    separator = '/',
    component,
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const ownerState = {
    ...props,
    separator,
    size,
  };

  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = { ...other, component, slots, slotProps };

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    className: clsx(classes.root, className),
    elementType: BreadcrumbsRoot,
    externalForwardedProps,
    ownerState,
  });

  const [SlotOl, olProps] = useSlot('ol', {
    className: classes.ol,
    elementType: BreadcrumbsOl,
    externalForwardedProps,
    ownerState,
  });

  const [SlotLi, liProps] = useSlot('li', {
    className: classes.li,
    elementType: BreadcrumbsLi,
    externalForwardedProps,
    ownerState,
  });

  const [SlotSeparator, separatorProps] = useSlot('separator', {
    additionalProps: {
      'aria-hidden': true,
    },
    className: classes.separator,
    elementType: BreadcrumbsSeparator,
    externalForwardedProps,
    ownerState,
  });

  const allItems = (
    React.Children.toArray(children).filter((child) => {
      return React.isValidElement(child);
    }) as Array<React.ReactElement>
  ).map((child, index) => (
    <SlotLi key={`child-${index}`} {...liProps}>
      {isMuiElement(child, ['Typography'])
        ? React.cloneElement(child, { component: child.props.component ?? 'span' })
        : child}
    </SlotLi>
  ));

  return (
    <TypographyInheritContext.Provider value>
      <SlotRoot {...rootProps}>
        <SlotOl {...olProps}>
          {allItems.reduce((acc: React.ReactNode[], current: React.ReactNode, index: number) => {
            if (index < allItems.length - 1) {
              acc = acc.concat(
                current,
                <SlotSeparator key={`separator-${index}`} {...separatorProps}>
                  {separator}
                </SlotSeparator>,
              );
            } else {
              acc.push(current);
            }
            return acc;
          }, [])}
        </SlotOl>
      </SlotRoot>
    </TypographyInheritContext.Provider>
  );
}) as OverridableComponent<BreadcrumbsTypeMap>;

Breadcrumbs.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Custom separator node.
   * @default '/'
   */
  separator: PropTypes.node,
  /**
   * The size of the component.
   * It accepts theme values between 'sm' and 'lg'.
   * @default 'md'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['sm', 'md', 'lg']),
    PropTypes.string,
  ]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    li: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    ol: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    separator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    li: PropTypes.elementType,
    ol: PropTypes.elementType,
    root: PropTypes.elementType,
    separator: PropTypes.elementType,
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.shape({
      '--LinearProgress-circulation': PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      '--LinearProgress-percent': PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      '--LinearProgress-progressMaxWidth': PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      '--LinearProgress-progressMinWidth': PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      '--LinearProgress-progressRadius': PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      '--LinearProgress-progressThickness': PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      '--LinearProgress-radius': PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      '--LinearProgress-thickness': PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
    PropTypes.shape({
      '__@iterator@86359': PropTypes.func.isRequired,
      '__@unscopables@86607': PropTypes.shape({
        '__@iterator@86359': PropTypes.bool,
        '__@unscopables@86607': PropTypes.bool,
        at: PropTypes.bool,
        concat: PropTypes.bool,
        entries: PropTypes.bool,
        every: PropTypes.bool,
        filter: PropTypes.bool,
        find: PropTypes.bool,
        findIndex: PropTypes.bool,
        flat: PropTypes.bool,
        flatMap: PropTypes.bool,
        forEach: PropTypes.bool,
        includes: PropTypes.bool,
        indexOf: PropTypes.bool,
        join: PropTypes.bool,
        keys: PropTypes.bool,
        lastIndexOf: PropTypes.bool,
        length: PropTypes.bool,
        map: PropTypes.bool,
        reduce: PropTypes.bool,
        reduceRight: PropTypes.bool,
        slice: PropTypes.bool,
        some: PropTypes.bool,
        toLocaleString: PropTypes.bool,
        toString: PropTypes.bool,
        values: PropTypes.bool,
      }).isRequired,
      '--LinearProgress-circulation': PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      '--LinearProgress-percent': PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      '--LinearProgress-progressMaxWidth': PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      '--LinearProgress-progressMinWidth': PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      '--LinearProgress-progressRadius': PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      '--LinearProgress-progressThickness': PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      '--LinearProgress-radius': PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      '--LinearProgress-thickness': PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      at: PropTypes.func.isRequired,
      concat: PropTypes.func.isRequired,
      entries: PropTypes.func.isRequired,
      every: PropTypes.func.isRequired,
      filter: PropTypes.func.isRequired,
      find: PropTypes.func.isRequired,
      findIndex: PropTypes.func.isRequired,
      flat: PropTypes.func.isRequired,
      flatMap: PropTypes.func.isRequired,
      forEach: PropTypes.func.isRequired,
      includes: PropTypes.func.isRequired,
      indexOf: PropTypes.func.isRequired,
      join: PropTypes.func.isRequired,
      keys: PropTypes.func.isRequired,
      lastIndexOf: PropTypes.func.isRequired,
      length: PropTypes.number.isRequired,
      map: PropTypes.func.isRequired,
      reduce: PropTypes.func.isRequired,
      reduceRight: PropTypes.func.isRequired,
      slice: PropTypes.func.isRequired,
      some: PropTypes.func.isRequired,
      toLocaleString: PropTypes.func.isRequired,
      toString: PropTypes.func.isRequired,
      values: PropTypes.func.isRequired,
    }),
  ]),
} as any;

export default Breadcrumbs;
