import * as React from 'react';
import PropTypes from 'prop-types';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { useSlotProps } from '@mui/base/utils';
import clsx from 'clsx';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import { getBreadcrumbsUtilityClass } from './breadcrumbsClasses';
import { BreadcrumbsProps, BreadcrumbsOwnerState, BreadcrumbsTypeMap } from './BreadcrumbsProps';

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
    '--Breadcrumbs-gap': '0.25rem',
    fontSize: theme.vars.fontSize.sm,
    padding: '0.5rem',
  }),
  ...(ownerState.size === 'md' && {
    '--Breadcrumbs-gap': '0.375rem',
    fontSize: theme.vars.fontSize.md,
    padding: '0.75rem',
  }),
  ...(ownerState.size === 'lg' && {
    '--Breadcrumbs-gap': '0.5rem',
    fontSize: theme.vars.fontSize.lg,
    padding: '1rem',
  }),
  lineHeight: 1,
}));

const BreadcrumbsOl = styled('ol', {
  name: 'JoyBreadcrumbs',
  slot: 'Ol',
  overridesResolver: (props, styles) => styles.ol,
})<{ ownerState: BreadcrumbsOwnerState }>({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  // reset user-agent style
  padding: 0,
  margin: 0,
  listStyle: 'none',
});

const BreadcrumbsLi = styled('li', {
  name: 'JoyBreadcrumbs',
  slot: 'Ol',
  overridesResolver: (props, styles) => styles.ol,
})<{ ownerState: BreadcrumbsOwnerState }>({});

const BreadcrumbsSeparator = styled('li', {
  name: 'JoyBreadcrumbs',
  slot: 'Separator',
  overridesResolver: (props, styles) => styles.separator,
})<{ ownerState: BreadcrumbsOwnerState }>({
  display: 'flex',
  userSelect: 'none',
  marginInline: 'var(--Breadcrumbs-gap)',
});

const Breadcrumbs = React.forwardRef(function Breadcrumbs(inProps, ref) {
  const props = useThemeProps<typeof inProps & BreadcrumbsProps>({
    props: inProps,
    name: 'JoyBreadcrumbs',
  });

  const {
    children,
    className,
    component = 'nav',
    componentsProps = {},
    size = 'md',
    separator = '/',
    ...other
  } = props;

  const ownerState = {
    ...props,
    component,
    separator,
    size,
  };

  const classes = useUtilityClasses(ownerState);

  const rootProps = useSlotProps({
    elementType: BreadcrumbsRoot,
    externalSlotProps: componentsProps.root,
    externalForwardedProps: other,
    ownerState,
    additionalProps: {
      ref,
      as: component,
    },
    className: clsx(classes.root, className),
  });

  const olProps = useSlotProps({
    elementType: BreadcrumbsOl,
    externalSlotProps: componentsProps.ol,
    ownerState,
    className: classes.ol,
  });

  const liProps = useSlotProps({
    elementType: BreadcrumbsLi,
    externalSlotProps: componentsProps.li,
    ownerState,
    className: classes.li,
  });

  const separatorProps = useSlotProps({
    elementType: BreadcrumbsSeparator,
    externalSlotProps: componentsProps.separator,
    ownerState,
    additionalProps: {
      'aria-hidden': true,
    },
    className: classes.separator,
  });

  const allItems = React.Children.toArray(children)
    .filter((child) => {
      return React.isValidElement(child);
    })
    .map((child, index) => (
      <BreadcrumbsLi key={`child-${index}`} {...liProps}>
        {child}
      </BreadcrumbsLi>
    ));

  return (
    <BreadcrumbsRoot {...rootProps}>
      <BreadcrumbsOl {...olProps}>
        {allItems.reduce((acc: React.ReactNode[], current: React.ReactNode, index: number) => {
          if (index < allItems.length - 1) {
            acc = acc.concat(
              current,
              <BreadcrumbsSeparator key={`separator-${index}`} {...separatorProps}>
                {separator}
              </BreadcrumbsSeparator>,
            );
          } else {
            acc.push(current);
          }
          return acc;
        }, [])}
      </BreadcrumbsOl>
    </BreadcrumbsRoot>
  );
}) as OverridableComponent<BreadcrumbsTypeMap>;

Breadcrumbs.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
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
   * The props used for each slot inside the Breadcrumbs.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    li: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    ol: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    separator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
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
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;

export default Breadcrumbs;
